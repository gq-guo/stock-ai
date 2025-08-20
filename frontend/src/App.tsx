import React, { useState } from 'react';
import { Layout, Menu, ConfigProvider, theme } from 'antd';
import {
  StockOutlined,
  BarChartOutlined,
  EyeOutlined,
  FileTextOutlined,
  PieChartOutlined
} from '@ant-design/icons';

// 页面组件
import SmartStockSelection from './pages/SmartStockSelection';
import StrategyBacktest from './pages/StrategyBacktest';
import RiskMonitoring from './pages/RiskMonitoring';
import NewsAnalysis from './pages/NewsAnalysis';
import SectorAnalysis from './pages/SectorAnalysis';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('smart-selection');

  const menuItems = [
    {
      key: 'smart-selection',
      icon: <StockOutlined />,
      label: '智能选股',
    },
    {
      key: 'strategy-backtest',
      icon: <BarChartOutlined />,
      label: '策略回测',
    },
    {
      key: 'risk-monitoring',
      icon: <EyeOutlined />,
      label: '自选股风险监控',
    },
    {
      key: 'news-analysis',
      icon: <FileTextOutlined />,
      label: '新闻资讯',
    },
    {
      key: 'sector-analysis',
      icon: <PieChartOutlined />,
      label: '板块分析',
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case 'smart-selection':
        return <SmartStockSelection />;
      case 'strategy-backtest':
        return <StrategyBacktest />;
      case 'risk-monitoring':
        return <RiskMonitoring />;
      case 'news-analysis':
        return <NewsAnalysis />;
      case 'sector-analysis':
        return <SectorAnalysis />;
      default:
        return <SmartStockSelection />;
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#00d4aa',
          colorBgBase: '#0a0e27',
          colorBgContainer: '#1a1f3a',
          colorBgElevated: '#1a1f3a',
          colorBorder: '#2a2f4a',
          colorText: '#ffffff',
          colorTextSecondary: '#d0d0d0',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={collapsed}
          width={240}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div style={{ 
            height: 64, 
            margin: 16, 
            background: 'rgba(0, 212, 170, 0.1)', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00d4aa',
            fontSize: collapsed ? '16px' : '18px',
            fontWeight: 'bold',
            border: '1px solid rgba(0, 212, 170, 0.2)'
          }}>
            {collapsed ? '🤖 AI' : '🤖 AI炒股系统'}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={({ key }) => setSelectedKey(key)}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 240 }}>
          <Header 
            style={{ 
              padding: '0 24px', 
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <h2 style={{ margin: 0, color: '#00d4aa', fontWeight: 'bold' }}>
              {menuItems.find(item => item.key === selectedKey)?.label}
            </h2>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24 }}>
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
