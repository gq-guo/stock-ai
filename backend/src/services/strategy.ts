import { BacktestResult, StrategyConfig } from '../types';

export class StrategyService {
  private strategyHistory: BacktestResult[] = [];

  async runBacktest(config: StrategyConfig): Promise<BacktestResult> {
    // 模拟回测计算时间
    await this.delay(1500);
    
    const result = this.calculateBacktest(config);
    
    // 保存到历史记录
    this.strategyHistory.unshift(result);
    if (this.strategyHistory.length > 100) {
      this.strategyHistory = this.strategyHistory.slice(0, 100);
    }
    
    return result;
  }

  private calculateBacktest(config: StrategyConfig): BacktestResult {
    // 根据指标组合计算基础成功率
    let baseSuccessRate = 50; // 基础成功率50%
    
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
    
    // 计算指标加权成功率
    config.indicators.forEach(indicator => {
      const weight = indicatorWeights[indicator] || 5;
      baseSuccessRate += weight;
    });
    
    // 指标组合的协同效应
    if (config.indicators.length >= 3) {
      baseSuccessRate += Math.min(config.indicators.length * 2, 10);
    }
    
    // 目标收益率对成功率的影响
    const targetImpact = Math.max(0, (config.targetReturn - 5) * -2);
    baseSuccessRate += targetImpact;
    
    // 时间框架调整
    const timeframeMultiplier = config.timeframe === 'short' ? 1.1 : 
                               config.timeframe === 'medium' ? 0.95 : 0.85;
    baseSuccessRate *= timeframeMultiplier;
    
    // 限制在合理范围内
    const successRate = Math.max(30, Math.min(95, baseSuccessRate));
    
    // 计算其他指标
    const totalTrades = Math.floor(Math.random() * 150) + 80; // 80-230次交易
    const successTrades = Math.floor(totalTrades * successRate / 100);
    const failTrades = totalTrades - successTrades;
    
    // 达标率通常低于成功率
    const targetReachRate = successRate * (0.6 + Math.random() * 0.3);
    
    // 平均盈利和亏损
    const avgProfit = config.targetReturn * (0.8 + Math.random() * 0.4);
    const avgLoss = avgProfit * (0.2 + Math.random() * 0.3);
    
    // 最大回撤
    const maxDrawdown = avgLoss * (1.5 + Math.random() * 2);
    
    // 夏普比率
    const sharpeRatio = (avgProfit / avgLoss) * (successRate / 100) * (Math.random() * 0.5 + 0.8);
    
    // 生成时间范围
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - 2); // 2年历史数据
    
    // 生成策略描述
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

  async getStrategyHistory(limit: number = 10): Promise<BacktestResult[]> {
    await this.delay(200);
    
    return this.strategyHistory
      .slice(0, limit)
      .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
  }

  async getRecommendedStrategies(riskTolerance: 'low' | 'medium' | 'high'): Promise<StrategyConfig[]> {
    await this.delay(300);
    
    const strategies: StrategyConfig[] = [];
    
    if (riskTolerance === 'low') {
      strategies.push(
        {
          indicators: ['ma_bullish', 'volume_increase', 'rsi_above_50'],
          targetReturn: 8,
          timeframe: 'medium',
          riskTolerance: 'low'
        },
        {
          indicators: ['bollinger_breakout', 'adx_above_25'],
          targetReturn: 6,
          timeframe: 'long',
          riskTolerance: 'low'
        }
      );
    } else if (riskTolerance === 'medium') {
      strategies.push(
        {
          indicators: ['macd_golden_cross', 'rsi_above_50', 'volume_increase'],
          targetReturn: 12,
          timeframe: 'short',
          riskTolerance: 'medium'
        },
        {
          indicators: ['kdj_golden_cross', 'obv_rising', 'ma_bullish'],
          targetReturn: 10,
          timeframe: 'medium',
          riskTolerance: 'medium'
        }
      );
    } else {
      strategies.push(
        {
          indicators: ['macd_golden_cross', 'bollinger_breakout', 'volume_increase', 'adx_above_25'],
          targetReturn: 18,
          timeframe: 'short',
          riskTolerance: 'high'
        },
        {
          indicators: ['kdj_golden_cross', 'rsi_above_50', 'obv_rising'],
          targetReturn: 15,
          timeframe: 'short',
          riskTolerance: 'high'
        }
      );
    }
    
    return strategies;
  }

  async optimizeStrategy(config: StrategyConfig): Promise<{
    originalResult: BacktestResult;
    optimizedConfig: StrategyConfig;
    optimizedResult: BacktestResult;
    improvements: string[];
  }> {
    await this.delay(800);
    
    const originalResult = this.calculateBacktest(config);
    
    // 策略优化逻辑
    const optimizedConfig: StrategyConfig = {
      ...config,
      indicators: [...config.indicators]
    };
    
    const improvements: string[] = [];
    
    // 如果成功率过低，建议添加更多指标
    if (originalResult.successRate < 60) {
      if (!optimizedConfig.indicators.includes('ma_bullish')) {
        optimizedConfig.indicators.push('ma_bullish');
        improvements.push('添加均线多头排列指标，提高信号质量');
      }
    }
    
    // 如果达标率过低，建议降低目标收益
    if (originalResult.targetReachRate < 50) {
      optimizedConfig.targetReturn = Math.max(5, config.targetReturn - 2);
      improvements.push('适当降低目标收益率，提高达标概率');
    }
    
    // 如果最大回撤过大，建议调整时间框架
    if (originalResult.maxDrawdown > 10) {
      if (config.timeframe === 'short') {
        optimizedConfig.timeframe = 'medium';
        improvements.push('延长持仓周期，减少短期波动影响');
      }
    }
    
    const optimizedResult = this.calculateBacktest(optimizedConfig);
    
    return {
      originalResult,
      optimizedConfig,
      optimizedResult,
      improvements
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
