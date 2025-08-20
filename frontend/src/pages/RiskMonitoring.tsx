import React, { useState, useEffect } from 'react';
import { Card, Tag, Button, Alert, Row, Col, Statistic, Badge, Switch, Progress } from 'antd';
import { 
  WarningOutlined, 
  EyeOutlined, 
  BellOutlined, 
  FallOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { RiskAlert } from '../types';

// 模拟风险监控数据
const mockAlerts: RiskAlert[] = [
    {
      stockCode: '600795',
      stockName: '国电电力',
      riskType: '死叉信号',
      riskLevel: 88,
      description: '在 2025.01-2025.03 期间 600795 即将走出死叉指标，历史上，月线级别死叉出现时，半年内下跌概率 88%，平均跌幅 12%。',
      probability: 88,
      avgLoss: 12,
      timestamp: '2025-01-15 09:30:00'
    },
    {
      stockCode: '000858',
      stockName: '五粮液',
      riskType: '高位风险',
      riskLevel: 75,
      description: '股价已连续上涨15个交易日，技术指标显示超买，历史数据显示在此位置回调概率为75%，平均回调幅度8.5%。',
      probability: 75,
      avgLoss: 8.5,
      timestamp: '2025-01-15 10:15:00'
    },
    {
      stockCode: '300750',
      stockName: '宁德时代',
      riskType: '成交量萎缩',
      riskLevel: 62,
      description: '近5日成交量持续萎缩，市场关注度下降，技术面显示可能进入盘整期，短期上涨动力不足。',
      probability: 62,
      avgLoss: 5.2,
      timestamp: '2025-01-15 11:00:00'
    },
    {
      stockCode: '002415',
      stockName: '海康威视',
      riskType: '资金流出',
      riskLevel: 70,
      description: '主力资金连续3日净流出，大单流出明显，可能面临调整压力，建议关注后续走势。',
      probability: 70,
      avgLoss: 6.8,
      timestamp: '2025-01-15 13:45:00'
    }
  ];

const RiskMonitoring: React.FC = () => {
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [monitoringEnabled, setMonitoringEnabled] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAlerts(mockAlerts);
    }, 1000);
  }, []);

  const getRiskColor = (level: number) => {
    if (level >= 80) return '#ff4d4f';
    if (level >= 60) return '#faad14';
    return '#52c41a';
  };

  const getRiskTag = (level: number) => {
    if (level >= 80) return { color: 'red', text: '高风险' };
    if (level >= 60) return { color: 'orange', text: '中风险' };
    return { color: 'green', text: '低风险' };
  };

  const highRiskAlerts = alerts.filter(alert => alert.riskLevel >= 80);
  const mediumRiskAlerts = alerts.filter(alert => alert.riskLevel >= 60 && alert.riskLevel < 80);
  const lowRiskAlerts = alerts.filter(alert => alert.riskLevel < 60);

  const renderRiskCard = (alert: RiskAlert) => {
    const riskTag = getRiskTag(alert.riskLevel);
    
    return (
      <Card
        key={alert.stockCode}
        size="small"
        style={{ marginBottom: 16 }}
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              <strong>{alert.stockCode}</strong> - {alert.stockName}
            </span>
            <div>
              <Tag color={riskTag.color}>
                {riskTag.text}
              </Tag>
              <Badge count={alert.riskLevel} style={{ backgroundColor: getRiskColor(alert.riskLevel) }} />
            </div>
          </div>
        }
      >
        <div style={{ marginBottom: 12 }}>
          <Alert
            message={alert.riskType}
            description={alert.description}
            type={alert.riskLevel >= 80 ? 'error' : alert.riskLevel >= 60 ? 'warning' : 'info'}
            showIcon
          />
        </div>
        
        <Row gutter={16} style={{ marginBottom: 12 }}>
          <Col span={12}>
            <Statistic
              title="下跌概率"
              value={alert.probability}
              suffix="%"
              valueStyle={{ color: getRiskColor(alert.riskLevel), fontSize: 16 }}
            />
            <Progress
              percent={alert.probability}
              strokeColor={getRiskColor(alert.riskLevel)}
              showInfo={false}
              size="small"
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="预期跌幅"
              value={alert.avgLoss}
              suffix="%"
              valueStyle={{ color: '#ff4d4f', fontSize: 16 }}
            />
          </Col>
        </Row>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#999', fontSize: 12 }}>
            更新时间: {alert.timestamp}
          </span>
          <div>
            <Button type="link" size="small" icon={<EyeOutlined />}>
              查看详情
            </Button>
            <Button type="link" size="small" danger>
              移出自选
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div>
      {/* 控制面板 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={24} align="middle">
          <Col span={6}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Switch 
                checked={monitoringEnabled} 
                onChange={setMonitoringEnabled}
                checkedChildren="监控开启"
                unCheckedChildren="监控关闭"
              />
              <BellOutlined style={{ fontSize: 16 }} />
            </div>
          </Col>
          <Col span={18}>
            <Row gutter={16}>
              <Col span={6}>
                <Statistic
                  title="监控股票"
                  value={15}
                  suffix="只"
                  prefix={<SafetyCertificateOutlined />}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="高风险预警"
                  value={highRiskAlerts.length}
                  suffix="只"
                  valueStyle={{ color: '#ff4d4f' }}
                  prefix={<WarningOutlined />}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="中风险预警"
                  value={mediumRiskAlerts.length}
                  suffix="只"
                  valueStyle={{ color: '#faad14' }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="低风险"
                  value={lowRiskAlerts.length}
                  suffix="只"
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* 风险预警列表 */}
      <div>
        <h3 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FallOutlined />
          自选股风险监控
          <Badge count={alerts.length} style={{ backgroundColor: '#1890ff' }} />
        </h3>
        
        <p style={{ color: '#666', marginBottom: 24 }}>
          实时监控自选股的技术指标和风险信号，按风险等级排序显示。风险等级越高，建议越早考虑减仓或卖出。
        </p>

        {alerts.length > 0 ? (
          <div>
            {/* 按风险等级排序显示 */}
            {alerts
              .sort((a, b) => b.riskLevel - a.riskLevel)
              .map(renderRiskCard)}
          </div>
        ) : (
          <Card style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ color: '#52c41a', fontSize: 16 }}>
              <SafetyCertificateOutlined style={{ fontSize: 48, marginBottom: 16 }} />
              <div>暂无风险预警</div>
              <div style={{ fontSize: 14, color: '#999', marginTop: 8 }}>
                您的自选股目前处于相对安全状态
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RiskMonitoring;
