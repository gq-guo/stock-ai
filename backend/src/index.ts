import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { stockRoutes } from './routes/stock';
import { newsRoutes } from './routes/news';
import { strategyRoutes } from './routes/strategy';
import { riskRoutes } from './routes/risk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// 中间件
app.use(cors());
app.use(express.json());

// 日志中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// 路由
app.use('/api/stocks', stockRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/strategy', strategyRoutes);
app.use('/api/risk', riskRoutes);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'stock-ai-backend'
  });
});

// 错误处理
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Stock AI Backend Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
