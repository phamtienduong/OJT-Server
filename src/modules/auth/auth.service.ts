import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as argon2 from 'argon2';
import { join } from 'path';
import { LoginDto } from './dto/login.dto';
import { log } from 'console';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
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
    };
    return await this.usersService.createUser(newUser);
  }

  async loginByGoogle(body: any) {
    const check = await this.usersService.getByEmail(body.email);
    if (!check) {
      const newUser = {
        ...body,
      };
      await this.usersService.createUser(newUser);
      return {
        token: await this.generateAccessToken({
          user_name: newUser.user_name,
          email: newUser.email,
          id: newUser.user_id,
          role: newUser.role,
          avatar: newUser.avatar,
        }),
        user: newUser,
        access_token: await this.generateAccessToken({
          email: newUser.email,
          id: newUser.user_id,
          role: newUser.role,
          avatar: newUser.avatar,
        }),
      };
    }
    return {
      token: await this.generateAccessToken({
        user_name: check.user_name,
        email: check.email,
        id: check.user_id,
        role: check.role,
        avatar: check.avatar,
      }),
      user: check,
      access_token: await this.generateAccessToken({
        email: check.email,
        id: check.user_id,
        role: check.role,
        avatar: check.avatar,
      }),
    };
  }
  async loginByFaceBook(body: any) {
    // Trước tiên kiểm tra xem người dùng đã tồn tại chưa
    const user = await this.usersService.getByEmail(body.email);

    // Nếu người dùng tồn tại, kiểm tra trạng thái của tài khoản
    if (user) {
      if (user.status == 1) {
        throw new HttpException(
          'Account has been locked',
          HttpStatus.FORBIDDEN,
        );
      }
      return {
        token: await this.generateAccessToken({
          user_name: user.user_name,
          email: user.email,
          id: user.user_id,
          role: user.role,
          avatar: user.avatar,
        }),
        user: user,
        access_token: await this.generateAccessToken({
          email: user.email,
          id: user.user_id,
          role: user.role,
          avatar: user.avatar,
        }),
      };
    }
  }
  async login(user: LoginDto): Promise<any> {
    const check = await this.usersService.getByEmail(user.email);

    if (!check) {
      throw new HttpException('Email does not exist', HttpStatus.BAD_REQUEST);
    }
    const checkPassword = await argon2.verify(check.password, user.password);

    if (!checkPassword) {
      throw new HttpException('Password is incorrect', HttpStatus.BAD_REQUEST);
    }
    if (check.status == 1) {
      throw new HttpException('Account has been locked', HttpStatus.FORBIDDEN);
    }
    return {
      token: await this.generateAccessToken({
        user_name: check.user_name,
        email: check.email,
        id: check.user_id,
        role: check.role,
        avatar: check.avatar,
      }),
      user: check,
      access_token: await this.generateAccessToken({
        email: check.email,
        id: check.user_id,
        role: check.role,
        avatar: check.avatar,
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

  async emailResetPassword(email: string) {
    const check = await this.usersService.getByEmail(email);
    const pathTemplate = join(__dirname, 'templates', 'reset-password.ejs');

    if (!check) {
      throw new HttpException(
        'Email does not exist in the system',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.mailerService.sendMail({
      to: check.email,
      subject: 'Reset Password',
      template: pathTemplate,
      context: {
        username: check.user_name,
      },
    });
    return check.user_id;
  }

  async resetPassword(data: any) {
    const { id, password } = data;
    const check = await this.usersService.getById(+id);
    if (!check) {
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);
    }
    return await this.usersService.changePassword(+id, password);
  }
}
