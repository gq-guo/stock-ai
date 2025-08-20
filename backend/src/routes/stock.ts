import express from 'express';
import { StockService } from '../services/stock';
import { ApiResponse, StockAnalysis } from '../types';

export const stockRoutes = express.Router();
const stockService = new StockService();

// 获取智能推荐股票
stockRoutes.get('/recommendations', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const recommendations = await stockService.getRecommendations(limit);
    
    const response: ApiResponse<StockAnalysis[]> = {
      success: true,
      data: recommendations,
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get stock recommendations',
      timestamp: new Date().toISOString()
    });
  }
});

// 自然语言选股
stockRoutes.post('/search', async (req, res) => {
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
    
    const response: ApiResponse<StockAnalysis[]> = {
      success: true,
      data: results,
      message: `Found ${results.length} stocks matching your criteria`,
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error searching stocks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search stocks',
      timestamp: new Date().toISOString()
    });
  }
});

// 获取股票详情
stockRoutes.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const stockDetail = await stockService.getStockDetail(code);
    
    if (!stockDetail) {
      return res.status(404).json({
        success: false,
        error: 'Stock not found',
        timestamp: new Date().toISOString()
      });
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: stockDetail,
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error getting stock detail:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get stock detail',
      timestamp: new Date().toISOString()
    });
  }
});

// 获取股票历史数据
stockRoutes.get('/:code/history', async (req, res) => {
  try {
    const { code } = req.params;
    const { period = '1y' } = req.query;
    
    const history = await stockService.getStockHistory(code, period as string);
    
    const response: ApiResponse<any> = {
      success: true,
      data: history,
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error getting stock history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get stock history',
      timestamp: new Date().toISOString()
    });
  }
});

// 获取实时股票数据
stockRoutes.get('/:code/realtime', async (req, res) => {
  try {
    const { code } = req.params;
    const stockDetail = await stockService.getStockDetail(code);
    
    if (!stockDetail) {
      return res.status(404).json({
        success: false,
        error: 'Stock not found',
        timestamp: new Date().toISOString()
      });
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: stockDetail,
      message: 'Real-time stock data',
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error getting realtime stock data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get realtime stock data',
      timestamp: new Date().toISOString()
    });
  }
});
