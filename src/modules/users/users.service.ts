import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRespository: Repository<UserEntity>,
  ) {}
  async createUser(dataUser: any) {
    try {
      const user = this.userRespository.create(dataUser);
      return await this.userRespository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUser() {
    try {
      const result = await this.userRespository.find({
        where: { role: 'user' },
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const check = await this.userRespository.findOne({ where: { email } });
    return check;

  }

  async getById(id: number) {
    return await this.userRespository.findOne({ where: { user_id: id } });
  }

  async updateUser(id: string, data: any) {
    const result = await this.userRespository.update(id, data);
    const resultAccount = await this.userRespository.findOne({
      where: { user_id: parseInt(id) },
    });
    delete resultAccount.password;
    if (result.affected == 0) {
      return {
        message: 'User not found',
      };
    }
    return {
      message: 'Update successfully',
      data: resultAccount,
    };
  }

  async updateStatus(id: number) {
    const user = await this.userRespository.findOne({ where: { user_id: id } });
    if (user.status == 0) {
      const updateActive = await this.userRespository
        .createQueryBuilder()
        .update(UserEntity)
        .set({ status: 1 })
        .where('user_id=:id', { id })
        .execute();
      return updateActive;
    } else {
      const updateActive1 = await this.userRespository
        .createQueryBuilder()
        .update(UserEntity)
        .set({ status: 0 })
        .where('user_id=:id', { id })
        .execute();
      return updateActive1;
    }
  }

  async changePassword(id: number, newPassword: string) {
    const hashPassword = await argon2.hash(newPassword);
    return this.userRespository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        password: hashPassword,
      })
      .where('user_id = :id', { id })
      .execute();
  }
}
