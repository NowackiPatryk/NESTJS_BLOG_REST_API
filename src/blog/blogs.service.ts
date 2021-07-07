import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blogs } from './blogs.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blogs) private blogsRepository: Repository<Blogs>,
  ) {}

  async getById(id) {
    return await this.blogsRepository.findOne(id);
  }

  async getByUser(userId, limit) {
    return this.blogsRepository.find({
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
    return this.blogsRepository.find({
      relations: ['user'],
      loadRelationIds: true,
      order: {
        created_at: 'DESC',
      },
      take: limit,
    });
  }

  async findOne(id) {
    return this.blogsRepository.findOne(id);
  }

  async create(createBlogDto) {
    return this.blogsRepository.save(createBlogDto);
  }

  async update(id, updateData) {
    return this.blogsRepository.update(id, updateData);
  }

  async delete(id) {
    return this.blogsRepository.delete(id);
  }
}
