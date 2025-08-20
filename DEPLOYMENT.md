# 🚀 Vercel 部署指南

本指南将帮助您将AI股票分析平台部署到Vercel云平台。

## 📋 部署前准备

### 1. 安装Vercel CLI
```bash
npm install -g vercel
```

### 2. 登录Vercel账户
```bash
vercel login
```

### 3. 准备项目
确保项目已经完成构建和测试：
```bash
npm run install:all
npm run build:frontend
```

## 🛠️ 部署步骤

### 方式一：使用Vercel CLI（推荐）

1. **初始化部署**
```bash
vercel
```

2. **按照提示配置项目**
- Set up and deploy? `Y`
- Which scope? 选择您的账户
- Link to existing project? `N`
- What's your project's name? `stock-ai-platform`
- In which directory is your code located? `./`

3. **生产环境部署**
```bash
vercel --prod
```

### 方式二：GitHub集成（自动部署）

1. **推送代码到GitHub**
```bash
git add .
git commit -m "feat: 完成AI股票分析平台"
git push origin main
```

2. **连接Vercel和GitHub**
- 访问 [vercel.com](https://vercel.com)
- 点击 "New Project"
- 选择您的GitHub仓库
- 导入项目

3. **配置部署设置**
- **Framework Preset**: Other
- **Build Command**: `npm run build:frontend`
- **Output Directory**: `frontend/dist`
- **Install Command**: `npm run install:all`

## ⚙️ 环境变量配置

在Vercel项目设置中添加以下环境变量：

```bash
# 基础配置
NODE_ENV=production
PORT=3000

# 股票API配置（可选）
STOCK_API_KEY=your_api_key_here
STOCK_API_BASE_URL=https://hq.sinajs.cn

# 其他API配置（预留）
NEWS_API_KEY=your_news_api_key
AI_SERVICE_KEY=your_ai_service_key
```

## 📁 项目结构说明

```
stock-ai/
├── api/                    # Vercel Serverless Functions
│   ├── health.ts          # 健康检查
│   ├── stocks/
│   │   ├── recommendations.ts  # 股票推荐
│   │   └── search.ts      # 股票搜索
│   ├── news/
│   │   └── index.ts       # 新闻资讯
│   ├── strategy/
│   │   └── backtest.ts    # 策略回测
│   ├── risk/
│   │   └── alerts.ts      # 风险预警
│   ├── types.ts           # 类型定义
│   └── package.json       # API依赖
├── frontend/              # React前端应用
│   ├── dist/             # 构建输出（Vercel托管）
│   └── src/              # 源代码
├── backend/               # 本地开发用后端（不部署）
└── vercel.json           # Vercel配置
```

## 🔗 API端点说明

部署后的API端点：
- `GET /api/health` - 服务健康检查
- `GET /api/stocks/recommendations` - 获取股票推荐
- `POST /api/stocks/search` - 股票搜索
- `GET /api/news` - 获取新闻资讯
- `POST /api/strategy/backtest` - 策略回测
- `GET /api/risk/alerts` - 风险预警

## 🔧 自定义域名（可选）

1. 在Vercel项目设置中点击 "Domains"
2. 添加您的自定义域名
3. 配置DNS记录指向Vercel

## 📊 性能优化

### 1. 启用缓存
```json
// vercel.json 中添加
"headers": [
  {
    "source": "/api/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "s-maxage=60, stale-while-revalidate"
      }
    ]
  }
]
```

### 2. 函数优化
- 函数冷启动时间：通常 < 100ms
- 内存限制：1024MB
- 执行时间限制：10s（Hobby）/ 60s（Pro）

## 🐛 常见问题

### 1. 构建失败
```bash
# 本地测试构建
npm run build:frontend

# 检查构建产物
ls frontend/dist/
```

### 2. API调用失败
- 检查CORS配置
- 验证API路径是否正确
- 查看Vercel函数日志

### 3. 环境变量问题
- 确保在Vercel项目设置中正确配置
- 注意区分开发环境和生产环境变量

## 🎯 部署后验证

1. **访问首页**：https://your-project.vercel.app
2. **测试API**：https://your-project.vercel.app/api/health
3. **功能测试**：逐一测试各个页面功能

## 💡 部署优化建议

1. **分支部署**：为不同分支配置不同的部署环境
2. **预览部署**：每次PR自动创建预览环境
3. **性能监控**：启用Vercel Analytics监控性能
4. **错误追踪**：集成错误日志收集

## 📞 技术支持

如遇到部署问题：
1. 查看Vercel部署日志
2. 检查函数执行日志
3. 验证配置文件语法
4. 联系技术支持团队

---

**部署完成后，您的AI股票分析平台将可以通过全球CDN访问，享受Vercel的高性能和可靠性！** 🌍✨
