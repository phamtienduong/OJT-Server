import { IsEmail, IsInt, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class SignUpDto{
    @IsString()
  @MaxLength(155)
  @IsNotEmpty()
  user_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;

  @IsString()
  role?: string;

  @IsInt()
  status?: number;

  @IsNotEmpty()
  @Matches(/((09|03|07|08|05)+([0-9]{8})\b)/, {
    message: 'Please enter valid phone number (Việt Nam)',
  })
  phone: string;
}