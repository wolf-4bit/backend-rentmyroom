import {
  IsNotEmpty,
  IsStrongPassword,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('IN')
  phone: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsStrongPassword()
  oldPassword: string;

  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;

  @IsNotEmpty()
  @IsStrongPassword()
  confirmPassword: string;
}
