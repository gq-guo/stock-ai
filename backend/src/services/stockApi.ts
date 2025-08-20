import axios from 'axios';

// 新浪财经API数据结构
interface SinaStockData {
  name: string;
  open: number;
  prevClose: number;
  current: number;
  high: number;
  low: number;
  volume: number;
  amount: number;
  timestamp: string;
}

// 股票代码映射 - 新浪API需要特定格式
const STOCK_CODE_MAP: { [key: string]: string } = {
  '600795': 'sh600795', // 国电电力
  '300750': 'sz300750', // 宁德时代
  '000858': 'sz000858', // 五粮液
  '002415': 'sz002415', // 海康威视
  '601012': 'sh601012', // 隆基绿能
  '002594': 'sz002594', // 比亚迪
  '600519': 'sh600519', // 贵州茅台
  '000001': 'sz000001', // 平安银行
  '600036': 'sh600036', // 招商银行
  '688981': 'sh688981', // 中芯国际
  '300059': 'sz300059', // 东方财富
  '603259': 'sh603259', // 药明康德
  '000002': 'sz000002', // 万科A
};

// 股票中文名称映射 - 解决编码问题
const STOCK_NAME_MAP: { [key: string]: string } = {
  '600795': '国电电力',
  '300750': '宁德时代', 
  '000858': '五粮液',
  '002415': '海康威视',
  '601012': '隆基绿能',
  '002594': '比亚迪',
  '600519': '贵州茅台',
  '000001': '平安银行',
  '600036': '招商银行',
  '688981': '中芯国际',
  '300059': '东方财富',
  '603259': '药明康德',
  '000002': '万科A',
};

export class StockApiService {
  private baseUrl = 'https://hq.sinajs.cn/list=';

  // 获取单只股票实时数据
  async getStockData(stockCode: string): Promise<any> {
    try {
      const sinaCode = STOCK_CODE_MAP[stockCode] || `sh${stockCode}`;
      const response = await axios.get(`${this.baseUrl}${sinaCode}`, {
        timeout: 5000,
        responseType: 'text',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://finance.sina.com.cn'
        },
        transformResponse: [function (data) {
          // 处理编码问题
          return data;
        }]
      });

      const data = this.parseStockData(response.data, stockCode);
      return data;
    } catch (error) {
      console.error(`获取股票数据失败 ${stockCode}:`, error);
      return null;
    }
  }

  // 批量获取多只股票数据
  async getBatchStockData(stockCodes: string[]): Promise<any[]> {
    try {
      const sinaCodes = stockCodes.map(code => STOCK_CODE_MAP[code] || `sh${code}`);
      const codeList = sinaCodes.join(',');
      
      const response = await axios.get(`${this.baseUrl}${codeList}`, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://finance.sina.com.cn'
        }
      });

      return this.parseBatchStockData(response.data, stockCodes);
    } catch (error) {
      console.error('批量获取股票数据失败:', error);
      return [];
    }
  }

  // 解析单只股票数据
  private parseStockData(rawData: string, originalCode: string): any {
    try {
      const dataMatch = rawData.match(/="([^"]+)"/);
      if (!dataMatch) return null;

      const fields = dataMatch[1].split(',');
      if (fields.length < 32) return null;

      const name = fields[0];
      const open = parseFloat(fields[1]) || 0;
      const prevClose = parseFloat(fields[2]) || 0;
      const current = parseFloat(fields[3]) || 0;
      const high = parseFloat(fields[4]) || 0;
      const low = parseFloat(fields[5]) || 0;
      const volume = parseInt(fields[8]) || 0;
      const amount = parseFloat(fields[9]) || 0;

      const change = current - prevClose;
      const changePercent = prevClose > 0 ? (change / prevClose) * 100 : 0;

      // 模拟一些基本的财务指标
      const marketCap = current * volume * 100; // 简单估算
      const pe = 15 + Math.random() * 20; // 模拟市盈率
      const pb = 1 + Math.random() * 5; // 模拟市净率

      return {
        code: originalCode,
        name: STOCK_NAME_MAP[originalCode] || name || '未知',
        price: current,
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
        volume: volume,
        marketCap: Math.floor(marketCap),
        pe: Number(pe.toFixed(1)),
        pb: Number(pb.toFixed(2)),
        high: high,
        low: low,
        open: open,
        close: current,
        updateTime: new Date().toISOString()
      };
    } catch (error) {
      console.error('解析股票数据失败:', error);
      return null;
    }
  }

  // 解析批量股票数据
  private parseBatchStockData(rawData: string, originalCodes: string[]): any[] {
    try {
      const lines = rawData.split('\n').filter(line => line.trim());
      const results: any[] = [];

      lines.forEach((line, index) => {
        if (index < originalCodes.length) {
          const stockData = this.parseStockData(line, originalCodes[index]);
          if (stockData) {
            results.push(stockData);
          }
        }
      });

      return results;
    } catch (error) {
      console.error('解析批量股票数据失败:', error);
      return [];
    }
  }

  // 获取热门股票列表
  async getHotStocks(): Promise<string[]> {
    return [
      '000858', '600519', '300750', '002594', '600795', 
      '002415', '000001', '688981', '300059', '603259',
      '000002', '601012'
    ];
  }

  // 搜索股票（基于预设的股票列表）
  async searchStocks(keyword: string): Promise<any[]> {
    const allStocks = Object.keys(STOCK_CODE_MAP);
    const matchedCodes = allStocks.filter(code => 
      code.includes(keyword) || 
      STOCK_CODE_MAP[code].includes(keyword.toLowerCase())
    );

    if (matchedCodes.length > 0) {
      return this.getBatchStockData(matchedCodes.slice(0, 10));
    }

    return [];
  }
}
