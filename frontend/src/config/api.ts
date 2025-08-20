// API配置
const isDevelopment = typeof window !== 'undefined' && window.location.hostname === 'localhost';

export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:8000' 
  : ''; // 生产环境使用相对路径，Vercel会自动处理

export const API_ENDPOINTS = {
  // 股票相关
  STOCK_RECOMMENDATIONS: '/api/stocks/recommendations',
  STOCK_SEARCH: '/api/stocks/search',
  STOCK_DETAIL: (code: string) => `/api/stocks/${code}`,
  STOCK_REALTIME: (code: string) => `/api/stocks/${code}/realtime`,
  
  // 新闻相关
  NEWS_LIST: '/api/news',
  NEWS_DETAIL: (id: string) => `/api/news/${id}`,
  NEWS_BY_STOCK: (code: string) => `/api/news/stock/${code}`,
  
  // 策略相关
  STRATEGY_BACKTEST: '/api/strategy/backtest',
  STRATEGY_HISTORY: '/api/strategy/history',
  
  // 风险相关
  RISK_ALERTS: '/api/risk/alerts',
  RISK_ANALYSIS: (code: string) => `/api/risk/analysis/${code}`,
  
  // 健康检查
  HEALTH: '/api/health'
};

// API请求封装
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = isDevelopment 
    ? `${API_BASE_URL}${endpoint}` 
    : endpoint;
    
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
};
