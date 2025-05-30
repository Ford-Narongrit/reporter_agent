import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { SummarizeResponse } from './interface/summarize_reponse.interface';

@Injectable()
export class SummarizeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async summarize(urls: string[]): Promise<string> {
    try {
      const summarizeApi = this.configService.get<string>('SUMMARIZE_API_URL');
      const model = this.configService.get<string>('SUMMARIZE_MODEL');
      const all_urls = urls.map((url) => url.trim()).join(',');

      const system_prompts =
        'You are a helpful assistant that summarizes pages into clean structured markdown format with headings and bullet points.';

      const response: { data: SummarizeResponse } = await firstValueFrom(
        this.httpService.post<SummarizeResponse>(summarizeApi!, {
          model: model,
          messages: [
            {
              role: 'system',
              content: system_prompts,
            },
            {
              role: 'user',
              content: `Summarize all ${all_urls.length} web pages: ${all_urls}`,
            },
          ],
          stream: false,
        }),
      );

      return response.data.message.content;
    } catch (error) {
      console.error('Error summarizing text:', error);
      throw new Error('Failed to summarize text');
    }
  }
}
