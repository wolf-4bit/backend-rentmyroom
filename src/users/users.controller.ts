import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.findOne({
      id: id,
    });
  }

  @UseGuards(AuthGuard)
  @Post()
  async updateUser(@Param('id') id: string, @Body() userDto: CreateUserDto) {
    return await this.usersService.update(
      {
        id: id,
      },
      userDto,
    );
  }
}
