import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities';
import { RegisterDto } from 'src/auth/auth.dto';
import { UpdateUserDto } from './users.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(user: RegisterDto): Promise<User> {
    if (
      await this.userRepository.exists({
        where: [
          {
            email: user.email,
          },
          {
            phone: user.phone,
          },
        ],
      })
    ) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
  async findOne(filter: FindOptionsWhere<User>): Promise<User> {
    return this.userRepository.findOneBy(filter);
  }
  async update(
    filter: FindOptionsWhere<User>,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    if (!(await this.userRepository.existsBy(filter))) {
      throw new HttpException("User doesn't not exists", HttpStatus.CONFLICT);
    }
    return this.userRepository.update(filter, updateUserDto);
  }
}
