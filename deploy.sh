#!/bin/bash

# AI股票分析平台 Vercel 部署脚本

echo "🚀 开始部署AI股票分析平台到Vercel..."

# 检查是否安装了Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安装Vercel CLI..."
    npm install -g vercel
fi

# 检查是否已登录
echo "🔐 检查Vercel登录状态..."
if ! vercel whoami &> /dev/null; then
    echo "请先登录Vercel:"
    vercel login
fi

# 安装依赖
echo "📦 安装项目依赖..."
npm run install:all

# 构建前端项目
echo "🏗️ 构建前端项目..."
npm run build:frontend

# 验证构建结果
if [ ! -d "frontend/dist" ]; then
    echo "❌ 前端构建失败"
    exit 1
fi

echo "✅ 构建完成"

# 部署到Vercel
echo "🌍 部署到Vercel..."
vercel --prod

echo "🎉 部署完成！"
echo ""
echo "📱 访问地址："
echo "   生产环境: https://your-project.vercel.app"
echo "   API健康检查: https://your-project.vercel.app/api/health"
echo ""
echo "🔧 如需自定义域名，请在Vercel控制台中配置"
