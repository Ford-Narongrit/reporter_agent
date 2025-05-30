import { Controller, Get, Query } from '@nestjs/common';
import { SummarizeService } from './summarize.service';

@Controller('summarize')
export class SummarizeController {
  constructor(private readonly summarizeService: SummarizeService) {}

  @Get()
  async summerize(@Query('urls') urls: string[]) {
    return this.summarizeService.summarize(urls);
  }
}
