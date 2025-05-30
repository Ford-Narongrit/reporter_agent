export interface SearchItem {
  title: string;
  link: string;
  snippet: string;
}

export interface SearchResponse {
  items: SearchItem[];
}
