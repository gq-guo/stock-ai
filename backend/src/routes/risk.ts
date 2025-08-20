import express from 'express';
import { RiskService } from '../services/risk';
import { ApiResponse, RiskAlert } from '../types';

export const riskRoutes = express.Router();
const riskService = new RiskService();

// 获取风险警报
riskRoutes.get('/alerts', async (req, res) => {
  try {
    const severity = req.query.severity as 'critical' | 'warning' | 'info';
    const limit = parseInt(req.query.limit as string) || 50;
    
    const alerts = await riskService.getRiskAlerts(severity, limit);
    
    const response: ApiResponse<RiskAlert[]> = {
      success: true,
      data: alerts,
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error getting risk alerts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get risk alerts',
      timestamp: new Date().toISOString()
    });
  }
});

// 获取特定股票的风险分析
riskRoutes.get('/analysis/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const analysis = await riskService.analyzeStockRisk(code);
    
    if (!analysis) {
      return res.status(404).json({
        success: false,
        error: 'Stock risk analysis not found',
        timestamp: new Date().toISOString()
      });
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: analysis,
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error analyzing stock risk:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze stock risk',
      timestamp: new Date().toISOString()
    });
  }
});

// 添加股票到监控列表
riskRoutes.post('/monitor', async (req, res) => {
  try {
    const { stockCode, thresholds } = req.body;
    
    if (!stockCode) {
      return res.status(400).json({
        success: false,
        error: 'Stock code is required',
        timestamp: new Date().toISOString()
      });
    }
    
    const result = await riskService.addToMonitoring(stockCode, thresholds);
    
    const response: ApiResponse<any> = {
      success: true,
      data: result,
      message: 'Stock added to monitoring successfully',
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error adding stock to monitoring:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add stock to monitoring',
      timestamp: new Date().toISOString()
    });
  }
});

// 移除股票监控
riskRoutes.delete('/monitor/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const result = await riskService.removeFromMonitoring(code);
    
    const response: ApiResponse<any> = {
      success: true,
      data: result,
      message: 'Stock removed from monitoring successfully',
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error removing stock from monitoring:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to remove stock from monitoring',
      timestamp: new Date().toISOString()
    });
  }
});
