import {
  Controller, Get, Post, Put, Delete,
  Body, Param, UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() body) {
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.usersService.remove(+id);
    return { message: 'User deleted' };
  }
}
