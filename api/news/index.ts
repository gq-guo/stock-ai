import { VercelRequest, VercelResponse } from '@vercel/node';
import { NewsService } from '../services/newsService';

const newsService = new NewsService();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const category = req.query.category as string;
    
    const news = await newsService.getHotNews(limit, category);
    
    res.status(200).json({
      success: true,
      data: news,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting news:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get news',
      timestamp: new Date().toISOString()
    });
  }
}
