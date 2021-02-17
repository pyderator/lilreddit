import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  firstName: string;

  @Column()
  @Field({ nullable: false })
  lastName: string;

  @Column({ unique: true })
  @Field({ nullable: false })
  username: string;

  @Column()
  @Field({ nullable: false })
  password: string;

  @Column()
  @Field({ nullable: false })
  email: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
