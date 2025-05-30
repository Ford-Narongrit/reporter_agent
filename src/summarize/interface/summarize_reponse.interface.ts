export interface SummarizeResponse {
  response: string;
  model: string;
  done: boolean;
  message: {
    role: string;
    content: string;
  };
}
