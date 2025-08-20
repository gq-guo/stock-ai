import express from 'express';
import { StrategyService } from '../services/strategy';
import { ApiResponse, BacktestResult, StrategyConfig } from '../types';

export const strategyRoutes = express.Router();
const strategyService = new StrategyService();

// 执行策略回测
strategyRoutes.post('/backtest', async (req, res) => {
  try {
    const config: StrategyConfig = req.body;
    
    // 验证必需参数
    if (!config.indicators || !Array.isArray(config.indicators) || config.indicators.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Indicators are required and must be a non-empty array',
        timestamp: new Date().toISOString()
      });
    }
    
    if (!config.targetReturn || typeof config.targetReturn !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Target return is required and must be a number',
        timestamp: new Date().toISOString()
      });
    }
    
    const result = await strategyService.runBacktest(config);
    
    const response: ApiResponse<BacktestResult> = {
      success: true,
      data: result,
      message: 'Backtest completed successfully',
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error running backtest:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to run backtest',
      timestamp: new Date().toISOString()
    });
  }
});

// 获取历史策略表现
strategyRoutes.get('/history', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const history = await strategyService.getStrategyHistory(limit);
    
    const response: ApiResponse<BacktestResult[]> = {
      success: true,
      data: history,
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error getting strategy history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get strategy history',
      timestamp: new Date().toISOString()
    });
  }
});

// 获取推荐策略
strategyRoutes.get('/recommended', async (req, res) => {
  try {
    const riskTolerance = req.query.riskTolerance as 'low' | 'medium' | 'high' || 'medium';
    const strategies = await strategyService.getRecommendedStrategies(riskTolerance);
    
    const response: ApiResponse<StrategyConfig[]> = {
      success: true,
      data: strategies,
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error getting recommended strategies:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get recommended strategies',
      timestamp: new Date().toISOString()
    });
  }
});
