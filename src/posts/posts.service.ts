import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
  ) {}

  async getById(id) {
    return await this.postsRepository.findOne(id);
  }

  async getByUser(userId, limit) {
    return this.postsRepository.find({
      relations: ['user'],
      loadRelationIds: true,
      take: limit,
      where: `userId=${userId}`,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async getLatest(limit) {
    return this.postsRepository.find({
      relations: ['user'],
      loadRelationIds: true,
      order: {
        created_at: 'DESC',
      },
      take: limit,
    });
  }

  async findOne(id) {
    return this.postsRepository.findOne(id);
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
