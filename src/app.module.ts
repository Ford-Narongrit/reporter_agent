import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { SearchModule } from './search/search.module';
import { SummarizeModule } from './summarize/summarize.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    NewsModule,
    SearchModule,
    SummarizeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
