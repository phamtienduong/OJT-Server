import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  @HttpCode(201)
  async register(@Body() user: any) {
    const result = await this.authService.register(user);
    return {
      message: 'Register successfully',
      data: result,
    };
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() user: { email: string; password: string }) {
    const result = await this.authService.login(user);
    return {
      message: 'Login successfully',
      data: result,
    };
  }

  @Post('/login-google')
  @HttpCode(200)
  async loginByGoogle(@Body() body: any) {
    // console.log('body====>', body);
    const user = await this.authService.loginByGoogle(body);

    console.log(user);
    return {
      message: 'Login successfully',
      data: user,
    };
  }

  @Post('/login-facebook')
  @HttpCode(200)
  async loginByFaceBook(@Body() body: any) {
    const user = await this.authService.loginByFaceBook(body);
    // console.log(user);
    return {
      message: 'Login successfully',
      data: user,
    };
  }

  @Post('/send-mail')
  @HttpCode(201)
  async emailResetPassword(@Body('email') email: string) {
    let id = await this.authService.emailResetPassword(email);
    return {
      message: 'Sent successfully, check email',
      id,
    };
  }

  @Post('/reset-password')
  @HttpCode(201)
  async resetPassword(@Body() data: any) {
    await this.authService.resetPassword(data);
    return {
      message: 'Change password successfully',
    };
  }
}
