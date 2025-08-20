import { VercelRequest, VercelResponse } from '@vercel/node';
import { StockService } from '../services/stockService';

const stockService = new StockService();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const recommendations = await stockService.getRecommendations(limit);
    
    res.status(200).json({
      success: true,
      data: recommendations,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get stock recommendations',
      timestamp: new Date().toISOString()
    });
  }
}
