import { Controller, Get, Param } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('account')
export class AuthorController {
  constructor(private authorService: AuthorService) {}
  @Get('confirmation/:token')
  async validate(@Param('token') token: string) {
    return this.authorService.validateEmailToken(token);
  }
}
