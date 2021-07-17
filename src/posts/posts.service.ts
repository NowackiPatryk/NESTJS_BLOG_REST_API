import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
  ) {}

  async getBySearchTerm(searchTerm: string) {
    return this.postsRepository
      .createQueryBuilder('post')
      .leftJoin('post.user', 'user')
      .addSelect(['user.id', 'user.username'])
      .where(`post.title like '%${searchTerm}%'`)
      .getMany();
  }

  async getById(id) {
    return this.postsRepository
      .createQueryBuilder('post')
      .leftJoin('post.user', 'user')
      .addSelect(['user.id', 'user.username'])
      .where('post.id = :id', { id })
      .getOne();
  }

  async getByUser(userId, limit = 10) {
    return this.postsRepository
      .createQueryBuilder('post')
      .limit(limit)
      .leftJoin('post.user', 'user')
      .addSelect(['user.id', 'user.username'])
      .where('post.userId = :userId', { userId })
      .getMany();
  }

  async getLatest(limit = 10) {
    return this.postsRepository
      .createQueryBuilder('post')
      .limit(limit)
      .leftJoin('post.user', 'user')
      .addSelect(['user.id', 'user.username'])
      .getMany();
  }

  async create(createBlogDto) {
    return this.postsRepository.save(createBlogDto);
  }

  async update(id, updateData) {
    return this.postsRepository.update(id, updateData);
  }

  async delete(id) {
    return this.postsRepository.delete(id);
  }
}
