import React, { useState, useEffect } from 'react';
import { Card, List, Tag, Button, Badge, Divider, Row, Col, Spin, Alert, Progress } from 'antd';
import { 
  FireOutlined, 
  RiseOutlined, 
  ReadOutlined, 
  StockOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { News } from '../types';

const NewsAnalysis: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  // 模拟新闻数据
  const mockNews: News[] = [
    {
      id: '1',
      title: '国务院颁发补贴光伏设备相关文件，多行业"反内卷"持续推进中',
      content: '国务院发布关于促进光伏产业高质量发展的指导意见，将对光伏设备制造企业给予税收优惠和资金补贴，预计将推动整个新能源产业链的快速发展...',
      publishTime: '2025-01-15 08:30:00',
      source: '财经新闻网',
      relatedStocks: [
        { code: '601012', name: '隆基绿能', relevance: 99 },
        { code: '300750', name: '宁德时代', relevance: 85 },
        { code: '002594', name: '比亚迪', relevance: 78 },
        { code: '600438', name: '通威股份', relevance: 94 }
      ],
      aiAnalysis: '利好光伏行业，政策支持力度加大，相关龙头企业有望受益。隆基绿能作为光伏组件龙头，相关性最高达99%，建议重点关注。'
    },
    {
      id: '2',
      title: 'ChatGPT-5即将发布，AI算力需求激增',
      content: 'OpenAI宣布ChatGPT-5将在年内发布，预计算力需求将比现有版本增加10倍，这将带动GPU、数据中心等相关产业链的爆发式增长...',
      publishTime: '2025-01-15 09:15:00',
      source: '科技日报',
      relatedStocks: [
        { code: '002415', name: '海康威视', relevance: 92 },
        { code: '000066', name: '中国长城', relevance: 87 },
        { code: '002230', name: '科大讯飞', relevance: 95 },
        { code: '300059', name: '东方财富', relevance: 65 }
      ],
      aiAnalysis: '大模型升级将推动AI产业链发展，GPU算力、云计算服务需求大增。科大讯飞作为AI应用龙头，相关性达95%，有望直接受益。'
    },
    {
      id: '3',
      title: '央行降准0.5个百分点，释放流动性约1万亿元',
      content: '中国人民银行决定于1月15日下调金融机构存款准备金率0.5个百分点，此次降准将释放长期资金约1万亿元，有利于保持流动性合理充裕...',
      publishTime: '2025-01-15 10:00:00',
      source: '新华社',
      relatedStocks: [
        { code: '000001', name: '平安银行', relevance: 88 },
        { code: '600036', name: '招商银行', relevance: 90 },
        { code: '600000', name: '浦发银行', relevance: 85 },
        { code: '002142', name: '宁波银行', relevance: 82 }
      ],
      aiAnalysis: '货币政策宽松利好银行股，降准释放流动性将改善银行资金成本，提升放贷能力。招商银行作为零售银行龙头，相关性达90%。'
    },
    {
      id: '4',
      title: '新能源汽车销量创历史新高，产业链持续火热',
      content: '2024年新能源汽车销量达到950万辆，同比增长38%，预计2025年将突破1200万辆。动力电池、充电桩等细分领域迎来黄金发展期...',
      publishTime: '2025-01-15 11:30:00',
      source: '汽车之家',
      relatedStocks: [
        { code: '002594', name: '比亚迪', relevance: 98 },
        { code: '300750', name: '宁德时代', relevance: 96 },
        { code: '002466', name: '天齐锂业', relevance: 89 },
        { code: '300014', name: '亿纬锂能', relevance: 85 }
      ],
      aiAnalysis: '新能源汽车高速增长带动整个产业链繁荣，比亚迪、宁德时代作为产业链核心企业，相关性超过95%，持续看好。'
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setNews(mockNews);
      setLoading(false);
    }, 1000);
  }, []);

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return '#52c41a';
    if (relevance >= 70) return '#faad14';
    return '#ff7875';
  };

  const handleStockClick = (stock: { code: string; name: string; relevance: number }) => {
    console.log('点击股票:', stock);
    // 这里可以跳转到股票详情页面或显示股票分析
  };

  const renderNewsCard = (item: News) => (
    <Card
      key={item.id}
      style={{ marginBottom: 24 }}
      title={
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{
            background: '#ff4d4f',
            color: '#ffffff',
            padding: '2px 8px',
            fontSize: '12px',
            fontWeight: 'bold',
            borderRadius: '4px',
            flexShrink: 0,
            marginTop: '2px'
          }}>
            热点
          </span>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, fontSize: 16, lineHeight: 1.4 }}>{item.title}</h3>
          </div>
        </div>
      }
      extra={
        <div style={{ textAlign: 'right', fontSize: 12, color: '#d0d0d0' }}>
          <div style={{ marginBottom: 4 }}>
            <ClockCircleOutlined /> {item.publishTime}
          </div>
          <div>来源：{item.source}</div>
        </div>
      }
    >
      <div style={{ marginBottom: 16 }}>
        <p style={{ color: '#e0e0e0', lineHeight: 1.6 }}>
          {item.content}
        </p>
      </div>

      <Divider orientation="left" style={{ margin: '16px 0 12px 0' }}>
        <span style={{ fontSize: 14, fontWeight: 'bold' }}>
          <StockOutlined /> AI分析
        </span>
      </Divider>
      
      <Alert
        message="智能分析结果"
        description={item.aiAnalysis}
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      <Divider orientation="left" style={{ margin: '16px 0 12px 0' }}>
        <span style={{ fontSize: 14, fontWeight: 'bold' }}>
          相关股票 ({item.relatedStocks.length})
        </span>
      </Divider>

      <Row gutter={[12, 12]}>
        {item.relatedStocks.map((stock, index) => (
          <Col span={12} key={index}>
            <Card
              size="small"
              style={{ 
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: `1px solid ${getRelevanceColor(stock.relevance)}20`
              }}
              hoverable
              onClick={() => handleStockClick(stock)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{stock.code}</strong>
                  <div style={{ fontSize: 12, color: '#666' }}>{stock.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    fontSize: 16, 
                    fontWeight: 'bold',
                    color: getRelevanceColor(stock.relevance)
                  }}>
                    {stock.relevance}%
                  </div>
                  <Progress
                    percent={stock.relevance}
                    strokeColor={getRelevanceColor(stock.relevance)}
                    showInfo={false}
                    size="small"
                  />
                  <div style={{ fontSize: 10, color: '#999' }}>相关性</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <Button type="link" icon={<ReadOutlined />}>
          阅读全文
        </Button>
        <Button type="link" icon={<RiseOutlined />}>
          查看影响分析
        </Button>
      </div>
    </Card>
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0, color: '#ffffff' }}>
          <FireOutlined style={{ color: '#ff4d4f' }} />
          热点新闻资讯
          <Badge count={news.length} style={{ backgroundColor: '#00d4aa' }} />
        </h3>
        <p style={{ color: '#e0e0e0', marginTop: 8, marginBottom: 0 }}>
          基于AI分析的股市相关热点新闻，智能识别相关股票和影响程度
        </p>
      </div>

      <Spin spinning={loading}>
        <div>
          {news.map(renderNewsCard)}
        </div>
        
        {!loading && news.length === 0 && (
          <Card style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ color: '#999', fontSize: 16 }}>
              <ReadOutlined style={{ fontSize: 48, marginBottom: 16 }} />
              <div>暂无新闻资讯</div>
            </div>
          </Card>
        )}
      </Spin>
    </div>
  );
};

export default NewsAnalysis;
