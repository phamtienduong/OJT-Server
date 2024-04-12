import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRespository : Repository<UserEntity>
  ){}
  async createUser(dataUser:any) {
    try {
      const user = this.userRespository.create(dataUser);
      return await this.userRespository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUser() {
    try {
      const result = await this.userRespository.find({where: {role:"user"}});
      return result
    } catch (error) {
      console.log(error);
    }
  }

  async getByEmail(email:string):Promise<UserEntity>{
    return await this.userRespository.findOne({where:{email}});
 }

}
