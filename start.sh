#!/bin/bash

# AI股票分析平台启动脚本

echo "🚀 启动AI股票分析平台..."

# 检查Node.js版本
echo "📋 检查环境..."
node_version=$(node -v 2>/dev/null || echo "未安装")
echo "Node.js 版本: $node_version"

if [[ $node_version == "未安装" ]]; then
    echo "❌ 请先安装Node.js (>=18.0.0)"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖包..."
if [ ! -d "node_modules" ]; then
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "安装前端依赖..."
    cd frontend && npm install && cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "安装后端依赖..."
    cd backend && npm install && cd ..
fi

echo "✅ 依赖安装完成"

# 启动服务
echo "🌟 启动开发服务器..."
echo "前端地址: http://localhost:3000"
echo "后端地址: http://localhost:8000"
echo "健康检查: http://localhost:8000/api/health"
echo ""
echo "按 Ctrl+C 停止服务"

npm run dev
