import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Row, Col, Statistic, Spin, Button, Select } from 'antd';
import { 
  PieChartOutlined, 
  RiseOutlined,
  FallOutlined,
  LineChartOutlined,
  FundOutlined
} from '@ant-design/icons';

const { Option } = Select;

interface SectorData {
  key: string;
  name: string;
  change: number;
  changePercent: number;
  volume: string;
  leadingStocks: string[];
  trend: 'up' | 'down' | 'stable';
  strength: number;
}

const SectorAnalysis: React.FC = () => {
  const [sectors, setSectors] = useState<SectorData[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState('1d');

  // 模拟板块数据
  const mockSectors: SectorData[] = [
    {
      key: '1',
      name: '新能源汽车',
      change: 2.45,
      changePercent: 2.8,
      volume: '1250.6亿',
      leadingStocks: ['比亚迪', '宁德时代', '理想汽车'],
      trend: 'up',
      strength: 85
    },
    {
      key: '2',
      name: '人工智能',
      change: 1.89,
      changePercent: 2.1,
      volume: '986.3亿',
      leadingStocks: ['科大讯飞', '海康威视', '商汤科技'],
      trend: 'up',
      strength: 78
    },
    {
      key: '3',
      name: '光伏概念',
      change: 3.12,
      changePercent: 3.6,
      volume: '1456.8亿',
      leadingStocks: ['隆基绿能', '通威股份', '阳光电源'],
      trend: 'up',
      strength: 92
    },
    {
      key: '4',
      name: '银行',
      change: -0.56,
      changePercent: -0.8,
      volume: '568.9亿',
      leadingStocks: ['招商银行', '平安银行', '兴业银行'],
      trend: 'down',
      strength: 35
    },
    {
      key: '5',
      name: '房地产',
      change: -1.23,
      changePercent: -1.5,
      volume: '432.1亿',
      leadingStocks: ['万科A', '保利发展', '融创中国'],
      trend: 'down',
      strength: 28
    },
    {
      key: '6',
      name: '医药生物',
      change: 0.78,
      changePercent: 0.9,
      volume: '756.4亿',
      leadingStocks: ['药明康德', '恒瑞医药', '迈瑞医疗'],
      trend: 'stable',
      strength: 58
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSectors(mockSectors);
      setLoading(false);
    }, 1000);
  }, [timeframe]);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <RiseOutlined style={{ color: '#52c41a' }} />;
      case 'down':
        return <FallOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <LineChartOutlined style={{ color: '#faad14' }} />;
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return '#52c41a';
    if (strength >= 60) return '#faad14';
    if (strength >= 40) return '#ff7875';
    return '#ff4d4f';
  };

  const columns = [
    {
      title: '板块名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: SectorData) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {getTrendIcon(record.trend)}
          <strong>{text}</strong>
        </div>
      ),
    },
    {
      title: '涨跌幅',
      dataIndex: 'changePercent',
      key: 'changePercent',
      render: (value: number) => (
        <Tag color={value > 0 ? 'green' : value < 0 ? 'red' : 'default'}>
          {value > 0 ? '+' : ''}{value}%
        </Tag>
      ),
      sorter: (a: SectorData, b: SectorData) => a.changePercent - b.changePercent,
    },
    {
      title: '成交额',
      dataIndex: 'volume',
      key: 'volume',
    },
    {
      title: '板块强度',
      dataIndex: 'strength',
      key: 'strength',
      render: (value: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ 
            width: 60, 
            height: 8, 
            backgroundColor: '#f0f0f0', 
            borderRadius: 4, 
            overflow: 'hidden' 
          }}>
            <div
              style={{
                width: `${value}%`,
                height: '100%',
                backgroundColor: getStrengthColor(value),
                transition: 'width 0.3s ease'
              }}
            />
          </div>
          <span style={{ color: getStrengthColor(value), fontWeight: 'bold' }}>
            {value}
          </span>
        </div>
      ),
      sorter: (a: SectorData, b: SectorData) => a.strength - b.strength,
    },
    {
      title: '龙头股票',
      dataIndex: 'leadingStocks',
      key: 'leadingStocks',
      render: (stocks: string[]) => (
        <div>
          {stocks.slice(0, 2).map((stock, index) => (
            <Tag key={index} style={{ margin: '2px' }}>
              {stock}
            </Tag>
          ))}
          {stocks.length > 2 && <span style={{ color: '#999' }}>等{stocks.length}只</span>}
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: SectorData) => (
        <div>
          <Button type="link" size="small" icon={<LineChartOutlined />}>
            查看详情
          </Button>
          <Button type="link" size="small" icon={<FundOutlined />}>
            相关ETF
          </Button>
        </div>
      ),
    },
  ];

  // 计算统计数据
  const upSectors = sectors.filter(s => s.trend === 'up').length;
  const downSectors = sectors.filter(s => s.trend === 'down').length;
  const avgChange = sectors.reduce((sum, s) => sum + s.changePercent, 0) / sectors.length;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
          <PieChartOutlined />
          板块分析
          <Select
            value={timeframe}
            onChange={setTimeframe}
            style={{ marginLeft: 16 }}
          >
            <Option value="1d">日线</Option>
            <Option value="20d">20日线</Option>
            <Option value="1m">月线</Option>
          </Select>
        </h3>
        <p style={{ color: '#666', marginTop: 8, marginBottom: 0 }}>
          各板块实时数据分析，包括涨跌幅、成交量、板块强度等关键指标（第二期功能）
        </p>
      </div>

      {/* 概览统计 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="上涨板块"
              value={upSectors}
              suffix="个"
              valueStyle={{ color: '#3f8600' }}
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="下跌板块"
              value={downSectors}
              suffix="个"
              valueStyle={{ color: '#cf1322' }}
              prefix={<FallOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均涨幅"
              value={avgChange}
              precision={2}
              suffix="%"
              valueStyle={{ color: avgChange > 0 ? '#3f8600' : '#cf1322' }}
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃板块"
              value={sectors.filter(s => s.strength >= 70).length}
              suffix="个"
              valueStyle={{ color: '#1890ff' }}
              prefix={<PieChartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 板块数据表格 */}
      <Card title="板块详情" style={{ marginBottom: 24 }}>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={sectors}
            pagination={false}
            size="middle"
            defaultSortOrder="descend"
            defaultSortField="changePercent"
          />
        </Spin>
      </Card>

      {/* 功能说明 */}
      <Card title="功能说明" type="inner">
        <Row gutter={16}>
          <Col span={12}>
            <h4>当前功能</h4>
            <ul>
              <li>板块实时行情数据</li>
              <li>板块强度分析</li>
              <li>龙头股票展示</li>
              <li>涨跌排行统计</li>
            </ul>
          </Col>
          <Col span={12}>
            <h4>第二期规划</h4>
            <ul>
              <li>板块K线图表分析</li>
              <li>板块与大盘相关性分析</li>
              <li>板块轮动策略分析</li>
              <li>ETF最佳买入点推荐</li>
            </ul>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SectorAnalysis;
