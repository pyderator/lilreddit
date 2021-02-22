import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorService, AuthorResolver],
  exports: [AuthorService],
})
export class AuthorModule {}
