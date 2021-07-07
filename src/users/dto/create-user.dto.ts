import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(8, 16)
  username: string;

  @IsNotEmpty()
  @Length(8, 32)
  password: string;
}
