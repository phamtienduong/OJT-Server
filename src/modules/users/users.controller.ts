import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const result = await this.usersService.createUser(user);
    return {
      message: 'User was created successfully',
      data: result,
    }
  }

  @Get("list")
  async getAllUser () {
    const result = await this.usersService.getAllUser();
    return {
      message: 'Get all user successfully',
      data: result
    }
  }

  


  
}
