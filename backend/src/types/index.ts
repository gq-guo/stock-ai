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
  high: number;
  low: number;
  open: number;
  close: number;
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
  confidence: number;
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
  sentiment: 'positive' | 'negative' | 'neutral';
  impact: 'high' | 'medium' | 'low';
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
  maxDrawdown: number;
  sharpeRatio: number;
  timeframe: string;
  startDate: string;
  endDate: string;
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
  severity: 'critical' | 'warning' | 'info';
}

// 策略配置
export interface StrategyConfig {
  indicators: string[];
  targetReturn: number;
  timeframe: string;
  turnoverRate?: [number, number];
  riskTolerance: 'low' | 'medium' | 'high';
}

// API响应格式
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

// 板块数据
export interface SectorData {
  code: string;
  name: string;
  change: number;
  changePercent: number;
  volume: string;
  leadingStocks: string[];
  trend: 'up' | 'down' | 'stable';
  strength: number;
}
