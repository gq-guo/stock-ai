import { VercelRequest, VercelResponse } from '@vercel/node';
import { RiskService } from '../../backend/src/services/risk';

const riskService = new RiskService();

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
    const severity = req.query.severity as 'critical' | 'warning' | 'info';
    const limit = parseInt(req.query.limit as string) || 50;
    
    const alerts = await riskService.getRiskAlerts(severity, limit);
    
    res.status(200).json({
      success: true,
      data: alerts,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting risk alerts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get risk alerts',
      timestamp: new Date().toISOString()
    });
  }
}
