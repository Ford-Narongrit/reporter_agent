import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  imports: [HttpModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
