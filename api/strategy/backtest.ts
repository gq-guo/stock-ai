import { VercelRequest, VercelResponse } from '@vercel/node';
import { StrategyService } from '../../backend/src/services/strategy';

const strategyService = new StrategyService();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const config = req.body;
    
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
    
    res.status(200).json({
      success: true,
      data: result,
      message: 'Backtest completed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error running backtest:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to run backtest',
      timestamp: new Date().toISOString()
    });
  }
}
