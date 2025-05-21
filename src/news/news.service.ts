import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News, NewsDocument } from './schemas/news.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) {}

  async create(CreateNewsDto: CreateNewsDto): Promise<News> {
    try {
      const createdNews = new this.newsModel(CreateNewsDto);
      return createdNews.save();
    } catch (error) {
      throw new InternalServerErrorException(`Error creating news: ${error}`);
    }
  }

  async findAll(): Promise<News[]> {
    try {
      return this.newsModel.find().lean();
    } catch (error) {
      throw new InternalServerErrorException(`Error fetching news: ${error}`);
    }
  }

  async findOne(id: string): Promise<News> {
    try {
      const news = await this.newsModel.findById(id).lean();
      if (!news) {
        throw new NotFoundException(`News with id ${id} not found`);
      }
      return news;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching news (id: ${id}): ${error}`,
      );
    }
  }

  async update(id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
    try {
      const news = await this.newsModel
        .findByIdAndUpdate(id, updateNewsDto, { new: true })
        .lean();
      if (!news) {
        throw new NotFoundException(`News with id ${id} not found`);
      }
      return news;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating news (id: ${id}): ${error}`,
      );
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const result = await this.newsModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`News with id ${id} not found`);
      }
      return { message: `News with id ${id} deleted successfully` };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error deleting news (id: ${id}): ${error}`,
      );
    }
  }
}
