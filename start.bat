@echo off
chcp 65001 >nul

echo 🚀 启动AI股票分析平台...

REM 检查Node.js版本
echo 📋 检查环境...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 请先安装Node.js (^>=18.0.0^)
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set node_version=%%i
echo Node.js 版本: %node_version%

REM 安装依赖
echo 📦 安装依赖包...
if not exist "node_modules" (
    call npm install
)

if not exist "frontend\node_modules" (
    echo 安装前端依赖...
    cd frontend
    call npm install
    cd ..
)

if not exist "backend\node_modules" (
    echo 安装后端依赖...
    cd backend
    call npm install
    cd ..
)

echo ✅ 依赖安装完成

REM 启动服务
echo 🌟 启动开发服务器...
echo 前端地址: http://localhost:3000
echo 后端地址: http://localhost:8000
echo 健康检查: http://localhost:8000/api/health
echo.
echo 按 Ctrl+C 停止服务

call npm run dev
