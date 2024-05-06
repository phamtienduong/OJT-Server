import { IsEmail, IsNotEmpty } from 'class-validator';

export class resetPasswordDto {
  @IsNotEmpty()
  email: string;
}
