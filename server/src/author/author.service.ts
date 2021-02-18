import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async register(data): Promise<Author> {
    const author = await this.authorRepository.save({ ...data });
    if (author) {
      // Configure Nodemailer to send mail to the paticular author after being saved

      return author;
    }
  }
}
