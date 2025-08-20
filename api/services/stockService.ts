import { StockAnalysis } from '../types';

export class StockService {
  private mockRecommendations: StockAnalysis[] = [
    {
      stockCode: '000858',
      stockName: '五粮液',
      analysis: '在 2025.01-2025.03 期间 000858 布林带下轨附近触及或突破，可能标示超卖反弹点；ADX值超过25则确认趋势强度，支持上涨延续。白酒行业基本面持续向好，春节消费旺季临近，机构资金持续流入，技术面与基本面共振，历史上接近该图形指标的股票反弹概率为91%。',
      probability: 91,
      riskLevel: 'low',
      indicators: ['布林带下轨', 'ADX>25', '超卖反弹', '消费复苏', '机构流入'],
      recommendation: 'buy',
      targetPrice: 148.5,
      timeframe: '短期(1-3个月)',
      confidence: 0.91
    },
    {
      stockCode: '600795',
      stockName: '国电电力',
      analysis: '在 2025.01-2025.03 期间，600795 出现MACD金叉时RSI＞50，成交量放大，形成三重验证、布林带+KDJ、均线+OBV多重信号共振。电力板块受益于用电需求回升和新能源消纳政策利好，公司作为央企龙头，估值修复空间较大。',
      probability: 83,
      riskLevel: 'low',
      indicators: ['MACD金叉', 'RSI>50', '成交量放大', '布林带', 'KDJ', '均线', 'OBV'],
      recommendation: 'buy',
      targetPrice: 8.8,
      timeframe: '短期(1-3个月)',
      confidence: 0.83
    },
    {
      stockCode: '300750',
      stockName: '宁德时代',
      analysis: '新能源汽车产业链龙头，2024年全球动力电池装机量持续领先。近期成交量显著放大，显示买方力量增强；结合资金流向分析，识别到明显主力介入信号。公司发布新一代麒麟电池技术，产品竞争力进一步提升。',
      probability: 78,
      riskLevel: 'medium',
      indicators: ['成交量放大', '主力介入', '资金流向', '技术创新', '国际化'],
      recommendation: 'buy',
      targetPrice: 188.0,
      timeframe: '短期(1-3个月)',
      confidence: 0.78
    }
  ];

  async getRecommendations(limit: number = 10): Promise<StockAnalysis[]> {
    // 模拟异步操作
    await this.delay(200);
    
    return this.mockRecommendations
      .sort((a, b) => b.probability - a.probability)
      .slice(0, limit);
  }

  async searchByQuery(query: string): Promise<StockAnalysis[]> {
    // 模拟异步操作
    await this.delay(500);
    
    // 简单的查询匹配逻辑
    const searchResults = this.mockRecommendations.filter(stock => {
      const searchText = `${stock.stockName} ${stock.analysis} ${stock.indicators.join(' ')}`.toLowerCase();
      const queryLower = query.toLowerCase();
      
      return searchText.includes(queryLower) || 
             queryLower.split(' ').some(keyword => searchText.includes(keyword));
    });
    
    if (searchResults.length === 0) {
      return this.mockRecommendations.slice(0, 2);
    }
    
    return searchResults;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
