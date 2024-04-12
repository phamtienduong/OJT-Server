import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: any): Promise<any> {
    const check = await this.usersService.getByEmail(user.email);
    if (check) {
      throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
    }
    const hasdPassword = await argon2.hash(user.password);
    const newUser = {
      ...user,
      password: hasdPassword,
    }
    return await this.usersService.createUser(newUser);
  }

  async loginByGoogle(body: any) {
    const check = await this.usersService.getByEmail(body.email);
    console.log("check",!check);
    
    if (!check==false) {
      const newUser = {
        ...body,
        password: '',
    };
    console.log("newUser",newUser);
      
      await this.usersService.createUser(newUser);
      return {
        token: await this.generateAccessToken({
            user_name: check.user_name,
            email: check.email,
            id: check.user_id,
            role:check.role,
            avatar:check.avatar
          }),
          user: check,
          access_token: await this.generateAccessToken({
              email: check.email,
              id: check.user_id,
              role:check.role,
              avatar:check.avatar
            }),
      };
    }
}
async loginByFaceBook(body:any) {
    const check = await this.usersService.getByEmail(body.email);
    if (!check==false) {
      const newUser = {
        ...body,
        password: '',
      };
      await this.usersService.createUser(newUser);
      return {
        token: await this.generateAccessToken({
            user_name: check.user_name,
            email: check.email,
            id: check.user_id,
            role:check.role,
            avatar:check.avatar
          }),
          user: check,
          access_token: await this.generateAccessToken({
              email: check.email,
              id: check.user_id,
              role:check.role,
              avatar:check.avatar
            }),
      }
    }
  }

  async login(user: any): Promise<any> {
    const check = await this.usersService.getByEmail(user.email);
    if (!check) {
      throw new HttpException('Email does not exist', HttpStatus.BAD_REQUEST);
    }
    const checkPassword = await argon2.verify(check.password, user.password);
    if (!checkPassword) {
      throw new HttpException('Password is incorrect', HttpStatus.BAD_REQUEST);
    }
    if (check.status == 1) {
        throw new HttpException('Account has been locked', HttpStatus.BAD_REQUEST);
      }
      return {
        token: await this.generateAccessToken({
          user_name: check.user_name,
          email: check.email,
          id: check.user_id,
          role:check.role,
          avatar:check.avatar
        }),
        user: check,
        access_token: await this.generateAccessToken({
            email: check.email,
            id: check.user_id,
            role:check.role,
            avatar:check.avatar
          }),
      };
    }
  
    async generateAccessToken(payload) {
      return this.jwtService.sign(payload, {
        expiresIn: '10d',
        secret: 'token',
      });
    }
  
    async verifyAccessToken(token) {
      return this.jwtService.verify(token, {
        secret: 'token',
      });
    
  }
}
