import { RiskAlert } from '../types';

export class RiskService {
  private mockAlerts: RiskAlert[] = [
    {
      stockCode: '600795',
      stockName: '国电电力',
      riskType: '死叉信号',
      riskLevel: 88,
      description: '在 2025.01-2025.03 期间 600795 即将走出死叉指标，历史上，月线级别死叉出现时，半年内下跌概率 88%，平均跌幅 12%。技术面显示空头排列趋势，建议关注风险。',
      probability: 88,
      avgLoss: 12,
      timestamp: '2025-01-15 09:30:00',
      severity: 'critical'
    },
    {
      stockCode: '000858',
      stockName: '五粮液',
      riskType: '高位风险',
      riskLevel: 75,
      description: '股价已连续上涨15个交易日，技术指标显示超买，历史数据显示在此位置回调概率为75%，平均回调幅度8.5%。RSI已达80以上超买区域，MACD背离明显。',
      probability: 75,
      avgLoss: 8.5,
      timestamp: '2025-01-15 10:15:00',
      severity: 'warning'
    },
    {
      stockCode: '300750',
      stockName: '宁德时代',
      riskType: '成交量萎缩',
      riskLevel: 62,
      description: '近5日成交量持续萎缩，市场关注度下降，技术面显示可能进入盘整期，短期上涨动力不足。量价背离信号明显，需要关注后续走势。',
      probability: 62,
      avgLoss: 5.2,
      timestamp: '2025-01-15 11:00:00',
      severity: 'warning'
    }
  ];

  async getRiskAlerts(severity?: 'critical' | 'warning' | 'info', limit: number = 50): Promise<RiskAlert[]> {
    await this.delay(300);
    
    let filteredAlerts = this.mockAlerts;
    
    if (severity) {
      filteredAlerts = this.mockAlerts.filter(alert => alert.severity === severity);
    }
    
    return filteredAlerts
      .sort((a, b) => b.riskLevel - a.riskLevel)
      .slice(0, limit);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
