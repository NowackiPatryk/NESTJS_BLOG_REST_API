import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findOne(username: string): Promise<any> {
    return this.usersRepository.findOne({ username });
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { username, password } = createUserDto;
    const hashedPass = await bcrypt.hash(password, 10);

    return this.usersRepository.save({ username, password: hashedPass });
  }
}
