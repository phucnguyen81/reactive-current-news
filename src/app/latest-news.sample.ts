import { LatestNews } from './current-news.interface';

export const LATEST_NEWS_SAMPLE = {
  status: ok,
  rateLimitRemaining: 300,
  rateLimit: 600,
  news: [
    {
      author: "MEAWW",
      category: ["entertainment"],
      description: "In the royal family picture, the six-year-old can be seen smiling as he poses alongside his great-grandmother Queen Elizabeth II, 93, grandfather Prince Charles, 71, and father Prince William, 37.",
      id: "161e996e-2091-4683-bdf9-41e11f956143",
      image: "https://cheesecake.articleassets.meaww.com/400202/uploads/b1ba9670-2ec2-11ea-a667-b1f4feb40ae9_800_420.jpeg",
      language: "en",
      published: "2020-01-04 10:54:00 +0000",
      title: "Prince George stands tall alongside Queen in royal portrait featuring all heirs to British Throne",
      url: "https://meaww.com/prince-george-queen-heirs-british-throne-royal-portrait-instagram-family-picture",
    },
    {
      author: '@indiatoday',
      category: ['world'],
      description: "Ananya Panday was recently spotted during a casual day out in Bandra, Mumbai. For her look, the Student Of The Year 2 actress opted for comfy clothing.",
      id: 'e9d2b9b9-7493-42d8-8dee-7944ec7a7356',
      image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/photogallery/202001/IMG_9782_IT_1578117647691.jpg?hz8MoIDiQ7Up3p7roygIOLO.31TeGcaj',
      language: '',
      published: '2020-1-02 10:23:51 +0000',
      title: 'Ananya Panday pairs baggy hoodie and mini shorts with Rs 20k slippers on day out. See pics',
      url: 'https://www.indiatoday.in/lifestyle/photo/ananya-panday-pairs-baggy-hoodie-and-mini-shorts-with-rs-20k-slippers-on-day-out-see-pics-1633870-2020-01-04',
    },
  ]
};
