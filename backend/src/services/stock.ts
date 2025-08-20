import { Stock, StockAnalysis } from '../types';
import { StockApiService } from './stockApi';

export class StockService {
  private stockApi: StockApiService;
  
  constructor() {
    this.stockApi = new StockApiService();
  }
  
  private mockStocks: Stock[] = [
    {
      code: '600795',
      name: '国电电力',
      price: 7.85,
      change: 0.15,
      changePercent: 1.95,
      volume: 45678900,
      marketCap: 1856789000,
      pe: 12.5,
      pb: 1.2,
      high: 8.05,
      low: 7.70,
      open: 7.80,
      close: 7.85
    },
    {
      code: '300750',
      name: '宁德时代',
      price: 178.50,
      change: -2.30,
      changePercent: -1.27,
      volume: 12345678,
      marketCap: 789456123000,
      pe: 25.6,
      pb: 3.4,
      high: 182.00,
      low: 176.80,
      open: 180.80,
      close: 178.50
    },
    {
      code: '000858',
      name: '五粮液',
      price: 142.80,
      change: 3.20,
      changePercent: 2.29,
      volume: 8765432,
      marketCap: 556789234000,
      pe: 18.9,
      pb: 2.1,
      high: 143.50,
      low: 139.60,
      open: 140.20,
      close: 142.80
    },
    {
      code: '002415',
      name: '海康威视',
      price: 45.60,
      change: -0.80,
      changePercent: -1.72,
      volume: 15678901,
      marketCap: 423456789000,
      pe: 15.3,
      pb: 2.8,
      high: 46.80,
      low: 45.20,
      open: 46.40,
      close: 45.60
    }
  ];

  private mockRecommendations: StockAnalysis[] = [
    {
      stockCode: '600795',
      stockName: '国电电力',
      analysis: '在 2025.01-2025.03 期间，600795 出现MACD金叉时RSI＞50，成交量放大，形成三重验证、布林带+KDJ、均线+OBV，历史上出现这种情况短期内后市上涨概率为83%。技术面显示多头排列，资金流入明显。',
      probability: 83,
      riskLevel: 'low',
      indicators: ['MACD金叉', 'RSI>50', '成交量放大', '布林带', 'KDJ', '均线', 'OBV'],
      recommendation: 'buy',
      targetPrice: 8.5,
      timeframe: '短期(1-3个月)',
      confidence: 0.85
    },
    {
      stockCode: '300750',
      stockName: '宁德时代',
      analysis: '在 2025.01-2025.03 期间 300750 出现成交量显著放大，显示买方力量增强，易推动上涨；结合资金流向分析，能识别到明显主力介入信号。近期政策利好新能源行业，行业景气度提升。',
      probability: 78,
      riskLevel: 'medium',
      indicators: ['成交量放大', '主力介入', '资金流向', '政策利好'],
      recommendation: 'buy',
      targetPrice: 185.0,
      timeframe: '短期(1-3个月)',
      confidence: 0.78
    },
    {
      stockCode: '000858',
      stockName: '五粮液',
      analysis: '在 2025.01-2025.03 期间 000858 布林带下轨附近触及或突破，可能标示超卖反弹点；ADX值超过25则确认趋势强度，支持上涨延续。白酒行业基本面向好，消费回暖预期强烈。',
      probability: 91,
      riskLevel: 'low',
      indicators: ['布林带下轨', 'ADX>25', '超卖反弹', '消费复苏'],
      recommendation: 'buy',
      targetPrice: 145.8,
      timeframe: '短期(1-3个月)',
      confidence: 0.91
    },
    {
      stockCode: '002415',
      stockName: '海康威视',
      analysis: '技术指标显示该股处于震荡整理阶段，MACD即将形成金叉，成交量温和放大，机构资金流入迹象明显。安防行业景气度回升，业绩预期良好。',
      probability: 69,
      riskLevel: 'medium',
      indicators: ['MACD即将金叉', '成交量放大', '机构资金流入'],
      recommendation: 'hold',
      targetPrice: 48.0,
      timeframe: '中期(3-6个月)',
      confidence: 0.69
    }
  ];

  async getRecommendations(limit: number = 10): Promise<StockAnalysis[]> {
    try {
      // 获取热门股票代码 - 扩展更多股票
      const hotStockCodes = [
        '000858', '600795', '300750', '600519', '002415', 
        '000001', '002594', '688981', '300059', '603259', 
        '000002', '601012'
      ];
      
      // 获取真实股票数据
      const realStockData = await this.stockApi.getBatchStockData(hotStockCodes);
      
      // 结合真实数据和模拟分析
      const recommendations: StockAnalysis[] = [];
      
      for (let i = 0; i < Math.min(realStockData.length, this.mockRecommendations.length); i++) {
        const realData = realStockData[i];
        const mockAnalysis = this.mockRecommendations[i];
        
        if (realData) {
          recommendations.push({
            ...mockAnalysis,
            stockCode: realData.code,
            stockName: realData.name,
            targetPrice: realData.price * (1 + (Math.random() * 0.1 + 0.05)), // 目标价格为当前价格的105-115%
            analysis: `基于当前价格 ¥${realData.price}，涨跌幅 ${realData.changePercent > 0 ? '+' : ''}${realData.changePercent}%。${mockAnalysis.analysis}`
          });
        }
      }
      
      // 如果API调用失败，回退到模拟数据
      if (recommendations.length === 0) {
        console.warn('股票API调用失败，使用模拟数据');
        return this.mockRecommendations.slice(0, limit);
      }
      
      return recommendations
        .sort((a, b) => b.probability - a.probability)
        .slice(0, limit);
        
    } catch (error) {
      console.error('获取股票推荐失败:', error);
      // 出错时返回模拟数据
      return this.mockRecommendations
        .sort((a, b) => b.probability - a.probability)
        .slice(0, limit);
    }
  }

  async searchByQuery(query: string): Promise<StockAnalysis[]> {
    // 模拟异步操作
    await this.delay(500);
    
    // 简单的查询匹配逻辑
    const searchResults = this.mockRecommendations.filter(stock => {
      const searchText = `${stock.stockName} ${stock.analysis} ${stock.indicators.join(' ')}`.toLowerCase();
      const queryLower = query.toLowerCase();
      
      // 检查是否包含查询关键词
      return searchText.includes(queryLower) || 
             queryLower.split(' ').some(keyword => searchText.includes(keyword));
    });
    
    // 如果没有匹配结果，返回随机推荐
    if (searchResults.length === 0) {
      return this.mockRecommendations.slice(0, 2);
    }
    
    return searchResults;
  }

  async getStockDetail(code: string): Promise<Stock | null> {
    try {
      // 先尝试获取真实股票数据
      const realStock = await this.stockApi.getStockData(code);
      
      if (realStock) {
        return realStock;
      }
      
      // 如果API调用失败，回退到模拟数据
      console.warn(`股票详情API调用失败 ${code}，使用模拟数据`);
      await this.delay(300);
      
      const stock = this.mockStocks.find(s => s.code === code);
      return stock || null;
      
    } catch (error) {
      console.error(`获取股票详情失败 ${code}:`, error);
      
      // 出错时返回模拟数据
      const stock = this.mockStocks.find(s => s.code === code);
      return stock || null;
    }
  }

  async getStockHistory(code: string, period: string): Promise<any[]> {
    await this.delay(400);
    
    // 生成模拟的历史K线数据
    const days = this.getPeriodDays(period);
    const basePrice = this.mockStocks.find(s => s.code === code)?.price || 100;
    
    const history = [];
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // 生成随机的OHLC数据
      const randomFactor = (Math.random() - 0.5) * 0.1; // ±10%的随机波动
      const open = basePrice * (1 + randomFactor);
      const close = open * (1 + (Math.random() - 0.5) * 0.05); // ±5%的日内波动
      const high = Math.max(open, close) * (1 + Math.random() * 0.03); // 最高价
      const low = Math.min(open, close) * (1 - Math.random() * 0.03); // 最低价
      const volume = Math.floor(Math.random() * 50000000) + 10000000; // 成交量
      
      history.push({
        date: date.toISOString().split('T')[0],
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
        volume: volume
      });
    }
    
    return history;
  }

  private getPeriodDays(period: string): number {
    switch (period) {
      case '1w': return 7;
      case '1m': return 30;
      case '3m': return 90;
      case '6m': return 180;
      case '1y': return 365;
      default: return 365;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
