import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './schemas/news.schema';
import { SearchService } from 'src/search/search.service';
import { HttpModule } from '@nestjs/axios';
import { SummarizeService } from 'src/summarize/summarize.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
    HttpModule,
  ],
  controllers: [NewsController],
  providers: [NewsService, SearchService, SummarizeService],
})
export class NewsModule {}
