import { News } from '../types';

export class NewsService {
  private mockNews: News[] = [
    {
      id: '1',
      title: '国务院颁发补贴光伏设备相关文件，多行业"反内卷"持续推进中',
      content: '国务院发布关于促进光伏产业高质量发展的指导意见，将对光伏设备制造企业给予税收优惠和资金补贴，预计将推动整个新能源产业链的快速发展。此次政策涵盖光伏组件制造、逆变器生产、硅料加工等多个环节，预计将在未来三年内投入资金超过1000亿元...',
      publishTime: '2025-01-15 08:30:00',
      source: '财经新闻网',
      relatedStocks: [
        { code: '601012', name: '隆基绿能', relevance: 99 },
        { code: '300750', name: '宁德时代', relevance: 85 },
        { code: '002594', name: '比亚迪', relevance: 78 },
        { code: '688981', name: '中芯国际', relevance: 76 }
      ],
      aiAnalysis: '利好光伏行业，政策支持力度加大，相关龙头企业有望受益。隆基绿能作为光伏组件龙头，相关性最高达99%，建议重点关注。通威股份在硅料环节具有优势，也将显著受益。',
      sentiment: 'positive',
      impact: 'high'
    },
    {
      id: '2',
      title: 'ChatGPT-5即将发布，AI算力需求激增',
      content: 'OpenAI宣布ChatGPT-5将在年内发布，预计算力需求将比现有版本增加10倍，这将带动GPU、数据中心等相关产业链的爆发式增长。据悉，新版本将在推理能力、多模态理解等方面实现重大突破，对计算资源的需求呈指数级增长...',
      publishTime: '2025-01-15 09:15:00',
      source: '科技日报',
      relatedStocks: [
        { code: '002415', name: '海康威视', relevance: 92 },
        { code: '688981', name: '中芯国际', relevance: 89 },
        { code: '300059', name: '东方财富', relevance: 75 },
        { code: '603259', name: '药明康德', relevance: 68 }
      ],
      aiAnalysis: '大模型升级将推动AI产业链发展，GPU算力、云计算服务需求大增。科大讯飞作为AI应用龙头，相关性达95%，有望直接受益。海康威视在AI视觉领域技术领先，算力需求增长将带动其产品销售。',
      sentiment: 'positive',
      impact: 'high'
    },
    {
      id: '3',
      title: '央行降准0.5个百分点，释放流动性约1万亿元',
      content: '中国人民银行决定于1月15日下调金融机构存款准备金率0.5个百分点，此次降准将释放长期资金约1万亿元，有利于保持流动性合理充裕，支持实体经济发展。这是年内首次降准，体现了稳健货币政策的灵活适度...',
      publishTime: '2025-01-15 10:00:00',
      source: '新华社',
      relatedStocks: [
        { code: '000001', name: '平安银行', relevance: 88 },
        { code: '600036', name: '招商银行', relevance: 90 },
        { code: '300059', name: '东方财富', relevance: 75 },
        { code: '000002', name: '万科A', relevance: 65 }
      ],
      aiAnalysis: '货币政策宽松利好银行股，降准释放流动性将改善银行资金成本，提升放贷能力。招商银行作为零售银行龙头，相关性达90%，将受益于流动性改善和放贷空间扩大。',
      sentiment: 'positive',
      impact: 'medium'
    },
    {
      id: '4',
      title: '新能源汽车销量创历史新高，产业链持续火热',
      content: '2024年新能源汽车销量达到950万辆，同比增长38%，预计2025年将突破1200万辆。动力电池、充电桩等细分领域迎来黄金发展期，多家龙头企业业绩预告超预期...',
      publishTime: '2025-01-15 11:30:00',
      source: '汽车之家',
      relatedStocks: [
        { code: '002594', name: '比亚迪', relevance: 98 },
        { code: '300750', name: '宁德时代', relevance: 96 },
        { code: '002466', name: '天齐锂业', relevance: 89 },
        { code: '300014', name: '亿纬锂能', relevance: 85 }
      ],
      aiAnalysis: '新能源汽车高速增长带动整个产业链繁荣，比亚迪、宁德时代作为产业链核心企业，相关性超过95%，持续看好。天齐锂业受益于锂价企稳回升，业绩有望改善。',
      sentiment: 'positive',
      impact: 'high'
    },
    {
      id: '5',
      title: '地产政策再度放松，一线城市限购政策调整',
      content: '多个一线城市宣布调整住房限购政策，降低首付比例，放宽购房资格。分析认为这将提振房地产市场信心，带动相关产业链复苏...',
      publishTime: '2025-01-15 13:45:00',
      source: '经济日报',
      relatedStocks: [
        { code: '000002', name: '万科A', relevance: 95 },
        { code: '000001', name: '平安银行', relevance: 78 },
        { code: '000858', name: '五粮液', relevance: 65 },
        { code: '600519', name: '贵州茅台', relevance: 60 }
      ],
      aiAnalysis: '地产政策放松利好房地产板块，万科A、保利发展等龙头房企将直接受益。政策刺激有望改善销售端表现，缓解资金压力。酒类消费也可能随着地产回暖而改善。',
      sentiment: 'positive',
      impact: 'medium'
    }
  ];

  async getHotNews(limit: number = 20, category?: string): Promise<News[]> {
    await this.delay(300);
    
    let filteredNews = this.mockNews;
    
    // 可以根据category过滤新闻
    if (category) {
      // 这里可以添加分类过滤逻辑
    }
    
    return filteredNews
      .sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime())
      .slice(0, limit);
  }

  async getNewsById(id: string): Promise<News | null> {
    await this.delay(200);
    
    const news = this.mockNews.find(n => n.id === id);
    return news || null;
  }

  async getNewsByStock(stockCode: string, limit: number = 10): Promise<News[]> {
    await this.delay(250);
    
    const relatedNews = this.mockNews.filter(news => 
      news.relatedStocks.some(stock => stock.code === stockCode)
    );
    
    return relatedNews
      .sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime())
      .slice(0, limit);
  }

  async analyzeNewsSentiment(content: string): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
    keywords: string[];
  }> {
    await this.delay(400);
    
    // 简单的情感分析模拟
    const positiveKeywords = ['利好', '上涨', '增长', '突破', '超预期', '回升', '改善'];
    const negativeKeywords = ['下跌', '风险', '亏损', '下滑', '预警', '调整', '压力'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    const foundKeywords: string[] = [];
    
    positiveKeywords.forEach(keyword => {
      if (content.includes(keyword)) {
        positiveCount++;
        foundKeywords.push(keyword);
      }
    });
    
    negativeKeywords.forEach(keyword => {
      if (content.includes(keyword)) {
        negativeCount++;
        foundKeywords.push(keyword);
      }
    });
    
    let sentiment: 'positive' | 'negative' | 'neutral';
    let score: number;
    
    if (positiveCount > negativeCount) {
      sentiment = 'positive';
      score = Math.min(0.8, 0.5 + (positiveCount - negativeCount) * 0.1);
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative';
      score = Math.max(-0.8, -0.5 - (negativeCount - positiveCount) * 0.1);
    } else {
      sentiment = 'neutral';
      score = 0;
    }
    
    return {
      sentiment,
      score,
      keywords: foundKeywords
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
