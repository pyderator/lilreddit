import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import * as session from 'express-session';

import { Author } from './entities/author.entity';
import { v4 as uuidv4 } from 'uuid';
import { sendMail } from './utils/nodemailer';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async register(data): Promise<Author> {
    const author: Author = await this.authorRepository.save({ ...data });
    if (author) {
      const emailId = uuidv4();
      // Configure Nodemailer to send mail to the paticular author after being saved
      this.redis.set(`${emailId}`, `${author.id}`);
      await sendMail(
        author.username,
        author.email,
        `http://localhost:3000/account/confirmation/${emailId}`,
      );
      return author;
    }
  }

  async validateEmailToken(token) {
    if (!(await this.redis.get(token))) {
      return { result: 'Error !!!' };
    }
    const userId = await this.redis.get(token);
    const user = await this.authorRepository.findOne({
      id: parseInt(userId),
    });
    if (user.isVerified) {
      return { result: 'You are already verified' };
    } else {
      user.isVerified = true;
      await this.authorRepository.save(user);
      await this.redis.del(token);
      return { result: 'You are verified now' };
    }
  }

  async login({ username, password }) {
    const user = await this.authorRepository.findOne({ username: username });
    if (!user) {
      return {
        status: false,
        field: 'username',
        message: "User doesn't exist",
      };
    } else {
      if (!(await argon2.verify(user.password, password))) {
        return {
          status: false,
          field: 'password',
          message: "Password doesn't match",
        };
      } else {
        return {
          status: true,
          user,
        };
      }
    }
  }
}
