import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ChangePasswordDto, LoginDto, RegisterDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);
    const payload = { id: user.id, email: user.email, role: user.userRole };
    const jwt = await this.sign(payload);
    return {
      access_token: jwt,
    };
  }
  private async sign(payload: any) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
  async login(loginDto: LoginDto) {
    const user = await this.userService.findOne({ email: loginDto.email });
    const isUserValid = await this.validateUser(loginDto.password, user);
    if (isUserValid) {
      const payload = { id: user.id, email: user.email, role: user.userRole };
      const jwt = await this.sign(payload);
      return {
        access_token: jwt,
      };
    }
    throw new UnauthorizedException();
  }

  async changePassword(changePasswordDto: ChangePasswordDto, id: string) {
    if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
      throw new UnauthorizedException('Password do not match');
    }
    const user = await this.userService.findOne({ id });
    const isUserValid = await this.validateUser(
      changePasswordDto.oldPassword,
      user,
    );
    if (isUserValid) {
      const password = await bcrypt.hash(changePasswordDto.newPassword, 10);
      await this.userService.update({ id }, { password });
      return {
        message: 'Password updated successfully',
      };
    }
  }
  private async validateUser(password: string, user: User): Promise<boolean> {
    return user && (await bcrypt.compare(password, user.password));
  }
}
