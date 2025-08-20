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
    },
    {
      stockCode: '002415',
      stockName: '海康威视',
      riskType: '资金流出',
      riskLevel: 70,
      description: '主力资金连续3日净流出，大单流出明显，可能面临调整压力，建议关注后续走势。北向资金也出现减持迹象，机构态度转谨慎。',
      probability: 70,
      avgLoss: 6.8,
      timestamp: '2025-01-15 13:45:00',
      severity: 'warning'
    },
    {
      stockCode: '600036',
      stockName: '招商银行',
      riskType: '业绩预警',
      riskLevel: 55,
      description: '银行板块整体承压，息差收窄预期影响业绩，短期可能面临估值回调。不过基本面仍然稳健，属于结构性调整。',
      probability: 55,
      avgLoss: 4.2,
      timestamp: '2025-01-15 14:20:00',
      severity: 'info'
    }
  ];

  private monitoringList: string[] = ['600795', '000858', '300750', '002415', '600036'];

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

  async analyzeStockRisk(stockCode: string): Promise<{
    stockCode: string;
    overallRisk: number;
    riskFactors: {
      technical: number;
      fundamental: number;
      market: number;
      sentiment: number;
    };
    alerts: RiskAlert[];
    recommendations: string[];
  } | null> {
    await this.delay(500);
    
    // 查找该股票的风险警报
    const stockAlerts = this.mockAlerts.filter(alert => alert.stockCode === stockCode);
    
    if (stockAlerts.length === 0) {
      return null;
    }
    
    // 计算各维度风险评分
    const riskFactors = {
      technical: Math.floor(Math.random() * 40) + 30, // 30-70
      fundamental: Math.floor(Math.random() * 30) + 20, // 20-50
      market: Math.floor(Math.random() * 35) + 25, // 25-60
      sentiment: Math.floor(Math.random() * 45) + 15  // 15-60
    };
    
    const overallRisk = Math.floor(
      (riskFactors.technical * 0.4 + 
       riskFactors.fundamental * 0.3 + 
       riskFactors.market * 0.2 + 
       riskFactors.sentiment * 0.1)
    );
    
    // 生成建议
    const recommendations = this.generateRecommendations(overallRisk, riskFactors);
    
    return {
      stockCode,
      overallRisk,
      riskFactors,
      alerts: stockAlerts,
      recommendations
    };
  }

  private generateRecommendations(overallRisk: number, riskFactors: any): string[] {
    const recommendations: string[] = [];
    
    if (overallRisk >= 70) {
      recommendations.push('建议考虑减仓或止损，风险较高');
    } else if (overallRisk >= 50) {
      recommendations.push('建议谨慎持有，密切关注风险信号');
    } else {
      recommendations.push('当前风险可控，可继续持有');
    }
    
    if (riskFactors.technical >= 60) {
      recommendations.push('技术面风险较高，注意技术指标变化');
    }
    
    if (riskFactors.fundamental >= 40) {
      recommendations.push('关注基本面变化，注意业绩预期调整');
    }
    
    if (riskFactors.market >= 50) {
      recommendations.push('市场环境不确定性增加，注意系统性风险');
    }
    
    return recommendations;
  }

  async addToMonitoring(stockCode: string, thresholds?: {
    riskLevel?: number;
    lossThreshold?: number;
    volumeChangeThreshold?: number;
  }): Promise<{
    success: boolean;
    message: string;
    monitoringCount: number;
  }> {
    await this.delay(200);
    
    if (!this.monitoringList.includes(stockCode)) {
      this.monitoringList.push(stockCode);
    }
    
    // 这里可以保存阈值设置到数据库
    
    return {
      success: true,
      message: `股票${stockCode}已添加到监控列表`,
      monitoringCount: this.monitoringList.length
    };
  }

  async removeFromMonitoring(stockCode: string): Promise<{
    success: boolean;
    message: string;
    monitoringCount: number;
  }> {
    await this.delay(150);
    
    const index = this.monitoringList.indexOf(stockCode);
    if (index > -1) {
      this.monitoringList.splice(index, 1);
    }
    
    return {
      success: true,
      message: `股票${stockCode}已从监控列表移除`,
      monitoringCount: this.monitoringList.length
    };
  }

  async getMonitoringList(): Promise<{
    stocks: string[];
    alertCount: number;
    highRiskCount: number;
  }> {
    await this.delay(100);
    
    const alertCount = this.mockAlerts.length;
    const highRiskCount = this.mockAlerts.filter(alert => alert.riskLevel >= 70).length;
    
    return {
      stocks: this.monitoringList,
      alertCount,
      highRiskCount
    };
  }

  async updateRiskThresholds(stockCode: string, thresholds: {
    riskLevel: number;
    lossThreshold: number;
    volumeChangeThreshold: number;
  }): Promise<{
    success: boolean;
    message: string;
  }> {
    await this.delay(200);
    
    // 这里可以更新数据库中的阈值设置
    
    return {
      success: true,
      message: `股票${stockCode}的风险阈值已更新`
    };
  }

  async getMarketRiskOverview(): Promise<{
    marketSentiment: 'bullish' | 'bearish' | 'neutral';
    volatilityIndex: number;
    riskDistribution: {
      high: number;
      medium: number;
      low: number;
    };
    sectorRisks: {
      sector: string;
      riskLevel: number;
    }[];
  }> {
    await this.delay(400);
    
    // 模拟市场风险概况
    const volatilityIndex = Math.floor(Math.random() * 40) + 10; // 10-50
    const marketSentiment = volatilityIndex > 35 ? 'bearish' : 
                           volatilityIndex < 20 ? 'bullish' : 'neutral';
    
    const highRisk = this.mockAlerts.filter(a => a.riskLevel >= 70).length;
    const mediumRisk = this.mockAlerts.filter(a => a.riskLevel >= 50 && a.riskLevel < 70).length;
    const lowRisk = this.mockAlerts.length - highRisk - mediumRisk;
    
    const sectorRisks = [
      { sector: '科技', riskLevel: Math.floor(Math.random() * 30) + 40 },
      { sector: '金融', riskLevel: Math.floor(Math.random() * 25) + 30 },
      { sector: '消费', riskLevel: Math.floor(Math.random() * 35) + 25 },
      { sector: '医药', riskLevel: Math.floor(Math.random() * 20) + 35 },
      { sector: '新能源', riskLevel: Math.floor(Math.random() * 40) + 30 }
    ];
    
    return {
      marketSentiment,
      volatilityIndex,
      riskDistribution: {
        high: highRisk,
        medium: mediumRisk,
        low: lowRisk
      },
      sectorRisks: sectorRisks.sort((a, b) => b.riskLevel - a.riskLevel)
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
