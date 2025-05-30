import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { SearchResponse } from './interface/search_response.interface';

@Injectable()
export class SearchService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async search(query: string): Promise<SearchResponse> {
    try {
      const apiKey = this.configService.get<string>('GOOGLE_API_KEY');
      const cx = this.configService.get<string>('GOOGLE_SEARCH_ENGINE_CX');

      const url = 'https://www.googleapis.com/customsearch/v1';

      const excludeSites = '-site:youtube.com -site:vimeo.com';

      const { data }: { data: SearchResponse } = await firstValueFrom(
        this.httpService.get<SearchResponse>(url, {
          params: { key: apiKey, cx, q: `${query} ${excludeSites}` },
        }),
      );

      return data;
    } catch (error) {
      console.error('Error fetching search results:', error);
      throw new Error('Failed to fetch search results');
    }
  }
}
