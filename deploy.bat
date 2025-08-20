@echo off
chcp 65001 >nul

echo 🚀 开始部署AI股票分析平台到Vercel...

REM 检查是否安装了Vercel CLI
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 安装Vercel CLI...
    call npm install -g vercel
)

REM 检查是否已登录
echo 🔐 检查Vercel登录状态...
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo 请先登录Vercel:
    call vercel login
)

REM 安装依赖
echo 📦 安装项目依赖...
call npm run install:all

REM 构建前端项目
echo 🏗️ 构建前端项目...
call npm run build:frontend

REM 验证构建结果
if not exist "frontend\dist" (
    echo ❌ 前端构建失败
    pause
    exit /b 1
)

echo ✅ 构建完成

REM 部署到Vercel
echo 🌍 部署到Vercel...
call vercel --prod

echo 🎉 部署完成！
echo.
echo 📱 访问地址：
echo    生产环境: https://your-project.vercel.app
echo    API健康检查: https://your-project.vercel.app/api/health
echo.
echo 🔧 如需自定义域名，请在Vercel控制台中配置
pause
