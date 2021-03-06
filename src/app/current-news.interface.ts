export const LATEST_NEWS_EXAMPLE: LatestNews = {
  status: 'ok',
  rateLimitRemaining: 300,
  rateLimit: 600,
  news: [
    {
      author: '@indiatoday',
      category: ['general'],
      description: "India's health infrastructure",
      id: '1',
      image: 'https://image.com/roads.pnb',
      language: '',
      published: '2020-1-02 10:23:51 +0000',
      title: 'The bill of health',
      url: 'https://www.indiatoday.in/the-bill-of-health',
    },
    {
      author: '@indiatoday',
      category: ['general'],
      description: 'Tackle climate change',
      id: '2',
      image: 'https://image.com/water.pnb',
      language: 'en',
      published: '2020-01-03 17:23:51 +0000',
      title: 'Water shortage',
      url: 'https://www.indiatoday.in/water',
    }
  ],
};

export interface LatestNews {
  news: News[];
  status?: string;
  rateLimitRemaining?: number;  // Remaining calls of API keys
  rateLimit?: number;   // Daily limit of API keys
}

export const EMPTY_LATEST_NEWS: LatestNews = {
  news: [],
};

export interface News {
  author: string;
  category: string[];
  description: string;
  id: string;
  image?: string;
  language: string;
  published: string;
  title: string;
  url: string;
}
