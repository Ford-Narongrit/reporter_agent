import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SummarizeService } from './summarize.service';
import { SummarizeController } from './summarize.controller';

@Module({
  imports: [HttpModule],
  providers: [SummarizeService],
  controllers: [SummarizeController],
})
export class SummarizeModule {}
