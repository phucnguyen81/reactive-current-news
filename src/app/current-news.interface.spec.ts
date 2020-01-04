import {
  LATEST_NEWS_EXAMPLE, LatestNews
} from './current-news.interface';

describe('LATEST_NEWS_EXAMPLE', () => {
  it('should has status ok', () => {
    const example: LatestNews = LATEST_NEWS_EXAMPLE;
    expect(example.status).toEqual('ok');
  });

  it('should has non-empty news', () => {
    const example: LatestNews = LATEST_NEWS_EXAMPLE;
    expect(example.news).toBeTruthy();
    expect(example.news.length).toBeGreaterThan(0);
  });
});
