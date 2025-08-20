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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.body;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Query parameter is required and must be a string',
        timestamp: new Date().toISOString()
      });
    }
    
    const results = await stockService.searchByQuery(query);
    
    res.status(200).json({
      success: true,
      data: results,
      message: `Found ${results.length} stocks matching your criteria`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error searching stocks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search stocks',
      timestamp: new Date().toISOString()
    });
  }
}
