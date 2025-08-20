import { BacktestResult, StrategyConfig } from '../types';

export class StrategyService {
  async runBacktest(config: StrategyConfig): Promise<BacktestResult> {
    // 模拟回测计算时间
    await this.delay(1000);
    
    return this.calculateBacktest(config);
  }

  private calculateBacktest(config: StrategyConfig): BacktestResult {
    // 根据指标组合计算基础成功率
    let baseSuccessRate = 50;
    
    const indicatorWeights: { [key: string]: number } = {
      'macd_golden_cross': 15,
      'rsi_above_50': 10,
      'volume_increase': 12,
      'bollinger_breakout': 18,
      'kdj_golden_cross': 14,
      'ma_bullish': 16,
      'obv_rising': 8,
      'adx_above_25': 11
    };
    
    config.indicators.forEach(indicator => {
      const weight = indicatorWeights[indicator] || 5;
      baseSuccessRate += weight;
    });
    
    if (config.indicators.length >= 3) {
      baseSuccessRate += Math.min(config.indicators.length * 2, 10);
    }
    
    const targetImpact = Math.max(0, (config.targetReturn - 5) * -2);
    baseSuccessRate += targetImpact;
    
    const timeframeMultiplier = config.timeframe === 'short' ? 1.1 : 
                               config.timeframe === 'medium' ? 0.95 : 0.85;
    baseSuccessRate *= timeframeMultiplier;
    
    const successRate = Math.max(30, Math.min(95, baseSuccessRate));
    
    const totalTrades = Math.floor(Math.random() * 150) + 80;
    const successTrades = Math.floor(totalTrades * successRate / 100);
    const failTrades = totalTrades - successTrades;
    
    const targetReachRate = successRate * (0.6 + Math.random() * 0.3);
    const avgProfit = config.targetReturn * (0.8 + Math.random() * 0.4);
    const avgLoss = avgProfit * (0.2 + Math.random() * 0.3);
    const maxDrawdown = avgLoss * (1.5 + Math.random() * 2);
    const sharpeRatio = (avgProfit / avgLoss) * (successRate / 100) * (Math.random() * 0.5 + 0.8);
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - 2);
    
    const strategyName = config.indicators.map(ind => this.getIndicatorName(ind)).join(' + ');
    
    return {
      strategy: strategyName,
      totalTrades,
      successTrades,
      failTrades,
      successRate: Number(successRate.toFixed(1)),
      targetReachRate: Number(targetReachRate.toFixed(1)),
      avgProfit: Number(avgProfit.toFixed(2)),
      avgLoss: Number(avgLoss.toFixed(2)),
      maxDrawdown: Number(maxDrawdown.toFixed(2)),
      sharpeRatio: Number(sharpeRatio.toFixed(3)),
      timeframe: config.timeframe,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  }

  private getIndicatorName(indicator: string): string {
    const nameMap: { [key: string]: string } = {
      'macd_golden_cross': 'MACD金叉',
      'rsi_above_50': 'RSI>50',
      'volume_increase': '成交量放大',
      'bollinger_breakout': '布林带突破',
      'kdj_golden_cross': 'KDJ金叉',
      'ma_bullish': '均线多头',
      'obv_rising': 'OBV上涨',
      'adx_above_25': 'ADX>25'
    };
    
    return nameMap[indicator] || indicator;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
