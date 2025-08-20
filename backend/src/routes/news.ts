import express from 'express';
import { NewsService } from '../services/news';
import { ApiResponse, News } from '../types';

export const newsRoutes = express.Router();
const newsService = new NewsService();

// 获取热点新闻
newsRoutes.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const category = req.query.category as string;
    
    const news = await newsService.getHotNews(limit, category);
    
    const response: ApiResponse<News[]> = {
      success: true,
      data: news,
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error getting news:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get news',
      timestamp: new Date().toISOString()
    });
  }
});

// 获取特定新闻详情
newsRoutes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newsItem = await newsService.getNewsById(id);
    
    if (!newsItem) {
      return res.status(404).json({
        success: false,
        error: 'News not found',
        timestamp: new Date().toISOString()
      });
    }
    
    const response: ApiResponse<News> = {
      success: true,
      data: newsItem,
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error getting news detail:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get news detail',
      timestamp: new Date().toISOString()
    });
  }
});

// 获取股票相关新闻
newsRoutes.get('/stock/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const news = await newsService.getNewsByStock(code, limit);
    
    const response: ApiResponse<News[]> = {
      success: true,
      data: news,
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error getting stock news:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get stock news',
      timestamp: new Date().toISOString()
    });
  }
});
