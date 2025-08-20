// 股票基本信息
export interface Stock {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  pb: number;
}

// AI分析结果
export interface StockAnalysis {
  stockCode: string;
  stockName: string;
  analysis: string;
  probability: number;
  riskLevel: 'low' | 'medium' | 'high';
  indicators: string[];
  recommendation: 'buy' | 'hold' | 'sell';
  targetPrice?: number;
  timeframe: string;
}

// 新闻信息
export interface News {
  id: string;
  title: string;
  content: string;
  publishTime: string;
  source: string;
  relatedStocks: {
    code: string;
    name: string;
    relevance: number;
  }[];
  aiAnalysis: string;
}

// 策略回测结果
export interface BacktestResult {
  strategy: string;
  totalTrades: number;
  successTrades: number;
  failTrades: number;
  successRate: number;
  targetReachRate: number;
  avgProfit: number;
  avgLoss: number;
  timeframe: string;
}

// 风险监控
export interface RiskAlert {
  stockCode: string;
  stockName: string;
  riskType: string;
  riskLevel: number;
  description: string;
  probability: number;
  avgLoss: number;
  timestamp: string;
}
