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
  ConflictException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreateBlogDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('search')
  getBySearchTerm(@Query() query): Promise<any> {
    const { search } = query;
    return this.postsService.getBySearchTerm(search);
  }

  @Get()
  getLatest(@Query() query): string | Promise<any> {
    const limit = query.limit || 15;
    return this.postsService.getLatest(limit);
  }

  @Get(':id')
  getById(@Param() params): Promise<any> {
    const { id } = params;
    return this.postsService.getById(id);
  }

  @Get('user/:userId')
  getByUser(@Query() query, @Param() params): Promise<any> {
    const { userId } = params;
    const limit = query.limit || 10;

    return this.postsService.getByUser(userId, limit);
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

    return this.postsService.create(createBlogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(@Param() params, @Body() body, @Request() req) {
    const { id } = params;
    const { updateData } = body;
    const { userId } = req.user;
    const post = await this.postsService.getById(id);

    if (post && post.user.id === userId) {
      return this.postsService.update(id, updateData);
    } else {
      throw new ConflictException('This user have no permissions');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param() params) {
    const { id } = params;

    return this.postsService.delete(id);
  }
}
