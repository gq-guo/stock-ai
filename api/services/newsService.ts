import { News } from '../types';

export class NewsService {
  private mockNews: News[] = [
    {
      id: '1',
      title: '国务院颁发补贴光伏设备相关文件，多行业"反内卷"持续推进中',
      content: '国务院发布关于促进光伏产业高质量发展的指导意见，将对光伏设备制造企业给予税收优惠和资金补贴，预计将推动整个新能源产业链的快速发展...',
      publishTime: '2025-01-15 08:30:00',
      source: '财经新闻网',
      relatedStocks: [
        { code: '601012', name: '隆基绿能', relevance: 99 },
        { code: '300750', name: '宁德时代', relevance: 85 },
        { code: '002594', name: '比亚迪', relevance: 78 },
        { code: '688981', name: '中芯国际', relevance: 76 }
      ],
      aiAnalysis: '利好光伏行业，政策支持力度加大，相关龙头企业有望受益。隆基绿能作为光伏组件龙头，相关性最高达99%，建议重点关注。',
      sentiment: 'positive',
      impact: 'high'
    },
    {
      id: '2',
      title: 'ChatGPT-5即将发布，AI算力需求激增',
      content: 'OpenAI宣布ChatGPT-5将在年内发布，预计算力需求将比现有版本增加10倍，这将带动GPU、数据中心等相关产业链的爆发式增长...',
      publishTime: '2025-01-15 09:15:00',
      source: '科技日报',
      relatedStocks: [
        { code: '002415', name: '海康威视', relevance: 92 },
        { code: '688981', name: '中芯国际', relevance: 89 },
        { code: '300059', name: '东方财富', relevance: 75 },
        { code: '603259', name: '药明康德', relevance: 68 }
      ],
      aiAnalysis: '大模型升级将推动AI产业链发展，GPU算力、云计算服务需求大增。海康威视在AI视觉领域技术领先，算力需求增长将带动其产品销售。',
      sentiment: 'positive',
      impact: 'high'
    }
  ];

  async getHotNews(limit: number = 20, category?: string): Promise<News[]> {
    await this.delay(300);
    
    return this.mockNews
      .sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime())
      .slice(0, limit);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
