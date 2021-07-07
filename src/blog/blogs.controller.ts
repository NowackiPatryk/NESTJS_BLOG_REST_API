import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  getLatest(@Query() query): string | Promise<any> {
    console.log(process.env.MSG);
    const limit = query.limit || 15;
    return this.blogsService.getLatest(limit);
  }

  @Get(':id')
  getById(@Param() params): Promise<any> {
    const { id } = params;
    return this.blogsService.getById(id);
  }

  @Get('user/:userId')
  getByUser(@Query() query, @Param() params): Promise<any> {
    const { userId } = params;
    const limit = query.limit || 10;

    return this.blogsService.getByUser(userId, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body, @Request() req): Promise<any> {
    const { title, content } = body;
    const { userId } = req.user;
    const createBlogDto: CreateBlogDto = {
      title,
      content,
      user: userId,
    };

    return this.blogsService.create(createBlogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  update(@Param() params, @Body() body) {
    const { id } = params;
    const { updateData } = body;

    return this.blogsService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param() params) {
    const { id } = params;

    return this.blogsService.delete(id);
  }
}
