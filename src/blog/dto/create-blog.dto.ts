import { IsInt, IsNotEmpty, Length } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @Length(3)
  title: string;

  @IsNotEmpty()
  @Length(3)
  content: string;

  @IsInt()
  @IsNotEmpty()
  user: string;
}
