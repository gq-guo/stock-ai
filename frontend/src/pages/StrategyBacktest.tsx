import React, { useState } from 'react';
import { Card, Form, Select, InputNumber, Button, Statistic, Row, Col, Alert, Table, Tag, Progress } from 'antd';
import { PlayCircleOutlined, BarChartOutlined } from '@ant-design/icons';
import { BacktestResult } from '../types';

const { Option } = Select;

interface BacktestForm {
  indicators: string[];
  targetReturn: number;
  timeframe: string;
  turnoverRate?: [number, number];
}

const StrategyBacktest: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BacktestResult | null>(null);
  const [historicalTrades, setHistoricalTrades] = useState<any[]>([]);

  const indicatorOptions = [
    { label: 'MACD金叉', value: 'macd_golden_cross' },
    { label: 'RSI > 50', value: 'rsi_above_50' },
    { label: '成交量放大', value: 'volume_increase' },
    { label: '布林带突破', value: 'bollinger_breakout' },
    { label: 'KDJ金叉', value: 'kdj_golden_cross' },
    { label: '均线多头排列', value: 'ma_bullish' },
    { label: 'OBV上涨', value: 'obv_rising' },
    { label: 'ADX > 25', value: 'adx_above_25' },
  ];

  const handleBacktest = async (values: BacktestForm) => {
    setLoading(true);
    
    // 模拟回测计算
    setTimeout(() => {
      const mockResult: BacktestResult = {
        strategy: values.indicators.map(ind => 
          indicatorOptions.find(opt => opt.value === ind)?.label
        ).join(' + '),
        totalTrades: 121,
        successTrades: 108,
        failTrades: 13,
        successRate: 89.2,
        targetReachRate: 62.8,
        avgProfit: 8.5,
        avgLoss: 2.3,
        timeframe: values.timeframe
      };

      const mockTrades = Array.from({ length: 10 }, (_, index) => ({
        key: index,
        stockCode: `60${String(index).padStart(4, '0')}`,
        stockName: `股票${index + 1}`,
        buyDate: `2024-${String((index % 12) + 1).padStart(2, '0')}-15`,
        sellDate: `2024-${String(((index + 1) % 12) + 1).padStart(2, '0')}-15`,
        return: (Math.random() * 20 - 5).toFixed(2),
        success: Math.random() > 0.3
      }));

      setResult(mockResult);
      setHistoricalTrades(mockTrades);
      setLoading(false);
    }, 2000);
  };

  const columns = [
    {
      title: '股票代码',
      dataIndex: 'stockCode',
      key: 'stockCode',
    },
    {
      title: '股票名称',
      dataIndex: 'stockName',
      key: 'stockName',
    },
    {
      title: '买入日期',
      dataIndex: 'buyDate',
      key: 'buyDate',
    },
    {
      title: '卖出日期',
      dataIndex: 'sellDate',
      key: 'sellDate',
    },
    {
      title: '收益率',
      dataIndex: 'return',
      key: 'return',
      render: (value: number, record: any) => (
        <Tag color={record.success ? 'green' : 'red'}>
          {value > 0 ? '+' : ''}{value}%
        </Tag>
      ),
    },
    {
      title: '结果',
      dataIndex: 'success',
      key: 'success',
      render: (success: boolean) => (
        <Tag color={success ? 'green' : 'red'}>
          {success ? '盈利' : '亏损'}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={10}>
          <Card title="策略配置">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleBacktest}
              initialValues={{
                targetReturn: 10,
                timeframe: 'short',
              }}
            >
              <Form.Item
                name="indicators"
                label="技术指标规则"
                rules={[{ required: true, message: '请选择至少一个技术指标' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="选择技术指标组合"
                  options={indicatorOptions}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                name="targetReturn"
                label="目标收益率 (%)"
                rules={[{ required: true, message: '请输入目标收益率' }]}
              >
                <InputNumber
                  min={1}
                  max={100}
                  placeholder="例如：10"
                  style={{ width: '100%' }}
                  addonAfter="%"
                />
              </Form.Item>

              <Form.Item
                name="timeframe"
                label="分析周期"
                rules={[{ required: true, message: '请选择分析周期' }]}
              >
                <Select placeholder="选择分析周期">
                  <Option value="short">短期 (1-3个月)</Option>
                  <Option value="medium">中期 (3-6个月)</Option>
                  <Option value="long">长期 (6-12个月)</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="turnoverRate"
                label="换手率范围 (%)"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <InputNumber min={0} max={50} placeholder="5" />
                  <span>-</span>
                  <InputNumber min={0} max={50} placeholder="15" />
                </div>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  icon={<PlayCircleOutlined />}
                  size="large"
                  block
                >
                  开始回测
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          {result ? (
            <div>
              <Card title="回测结果" style={{ marginBottom: 24 }}>
                <Alert
                  message="AI策略分析"
                  description={`历史上符合「${result.strategy}」规则的股票一共有${result.totalTrades}次交易，其中上涨的有${result.successTrades}次，概率为${result.successRate}%。超过${form.getFieldValue('targetReturn')}%涨幅的有${Math.floor(result.totalTrades * result.targetReachRate / 100)}次，概率为${result.targetReachRate}%，下跌的有${result.failTrades}次，平均跌幅${result.avgLoss}%。`}
                  type="info"
                  showIcon
                  style={{ marginBottom: 24 }}
                />

                <Row gutter={16}>
                  <Col span={6}>
                    <Statistic
                      title="总交易次数"
                      value={result.totalTrades}
                      suffix="次"
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="成功率"
                      value={result.successRate}
                      precision={1}
                      suffix="%"
                      valueStyle={{ color: '#3f8600' }}
                    />
                    <Progress 
                      percent={result.successRate} 
                      strokeColor="#52c41a"
                      showInfo={false}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="达标率"
                      value={result.targetReachRate}
                      precision={1}
                      suffix="%"
                      valueStyle={{ color: '#cf1322' }}
                    />
                    <Progress 
                      percent={result.targetReachRate} 
                      strokeColor="#faad14"
                      showInfo={false}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="平均收益"
                      value={result.avgProfit}
                      precision={1}
                      suffix="%"
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Col>
                </Row>
              </Card>

              <Card title="历史交易记录" style={{ marginBottom: 24 }}>
                <Table
                  columns={columns}
                  dataSource={historicalTrades}
                  pagination={{ pageSize: 8 }}
                  size="small"
                />
              </Card>
            </div>
          ) : (
            <Card style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ color: '#999', fontSize: 16 }}>
                <BarChartOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                <div>配置策略参数并点击"开始回测"查看历史表现</div>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default StrategyBacktest;
