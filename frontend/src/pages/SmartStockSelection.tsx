import React, { useState, useEffect } from 'react';
import { Tabs, Card, List, Tag, Button, Input, Space, Spin, Badge, Progress, Row, Col } from 'antd';
import { StarOutlined, RiseOutlined, SearchOutlined } from '@ant-design/icons';
import { StockAnalysis } from '../types';

const { TabPane } = Tabs;
const { Search } = Input;

const SmartStockSelection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [recommendedStocks, setRecommendedStocks] = useState<StockAnalysis[]>([]);
  const [searchResults, setSearchResults] = useState<StockAnalysis[]>([]);
  const [activeTab, setActiveTab] = useState('recommended');
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});

  // 模拟推荐股票数据
  const mockRecommendedStocks: StockAnalysis[] = [
    {
      stockCode: '000858',
      stockName: '五粮液',
      analysis: '在 2025.01-2025.03 期间 000858 布林带下轨附近触及或突破，可能标示超卖反弹点；ADX值超过25则确认趋势强度，支持上涨延续。白酒行业基本面持续向好，春节消费旺季临近，机构资金持续流入，技术面与基本面共振，历史上接近该图形指标的股票反弹概率为91%，平均反弹幅度达15.2%。',
      probability: 91,
      riskLevel: 'low',
      indicators: ['布林带下轨', 'ADX>25', '超卖反弹', '消费复苏', '机构流入'],
      recommendation: 'buy',
      targetPrice: 148.5,
      timeframe: '短期(1-3个月)'
    },
    {
      stockCode: '600795',
      stockName: '国电电力',
      analysis: '在 2025.01-2025.03 期间，600795 出现MACD金叉时RSI＞50，成交量放大，形成三重验证、布林带+KDJ、均线+OBV多重信号共振。电力板块受益于用电需求回升和新能源消纳政策利好，公司作为央企龙头，估值修复空间较大，历史上出现这种技术形态后短期内上涨概率为83%。',
      probability: 83,
      riskLevel: 'low',
      indicators: ['MACD金叉', 'RSI>50', '成交量放大', '布林带', 'KDJ', '均线', 'OBV'],
      recommendation: 'buy',
      targetPrice: 8.8,
      timeframe: '短期(1-3个月)'
    },
    {
      stockCode: '300750',
      stockName: '宁德时代',
      analysis: '新能源汽车产业链龙头，2024年全球动力电池装机量持续领先。近期成交量显著放大，显示买方力量增强；结合资金流向分析，识别到明显主力介入信号。公司发布新一代麒麟电池技术，产品竞争力进一步提升，国际化布局加速推进。技术面看，股价在重要支撑位获得支撑，历史统计该情况下短期上涨概率78%。',
      probability: 78,
      riskLevel: 'medium',
      indicators: ['成交量放大', '主力介入', '资金流向', '技术创新', '国际化'],
      recommendation: 'buy',
      targetPrice: 188.0,
      timeframe: '短期(1-3个月)'
    },
    {
      stockCode: '600519',
      stockName: '贵州茅台',
      analysis: '白酒行业绝对龙头，品牌价值护城河深厚。近期股价在3000元重要关口获得强力支撑，成交量温和放大，显示机构资金逢低布局。春节旺季临近，渠道库存健康，价格体系稳定。技术指标显示RSI从超卖区域反弹，MACD即将形成金叉，历史上该组合形态出现后，中期上涨概率达85%，平均涨幅12.5%。',
      probability: 85,
      riskLevel: 'low',
      indicators: ['支撑反弹', 'RSI反弹', 'MACD即将金叉', '机构布局', '旺季效应'],
      recommendation: 'buy',
      targetPrice: 2180.0,
      timeframe: '中期(3-6个月)'
    },
    {
      stockCode: '002415',
      stockName: '海康威视',
      analysis: '安防行业龙头，AI+安防布局领先。近期公司发布新一代AI智能产品，技术壁垒进一步加深。股价经过充分调整后，估值已具备吸引力。技术面看，股价在年线附近获得支撑，成交量逐步放大，机构资金开始关注。结合历史数据，当前形态下未来2-3个月上涨概率为69%。',
      probability: 69,
      riskLevel: 'medium',
      indicators: ['技术创新', '估值修复', '年线支撑', '成交量放大', '机构关注'],
      recommendation: 'buy',
      targetPrice: 52.5,
      timeframe: '中期(3-6个月)'
    },
    {
      stockCode: '000001',
      stockName: '平安银行',
      analysis: '零售银行转型标杆，数字化经营能力突出。受益于降准政策和利率环境改善，银行板块整体估值有望修复。公司零售业务占比较高，资产质量稳定，ROE水平行业领先。技术面看，股价突破下降趋势线，量价配合良好，MACD出现底背离信号，历史统计显示该形态后上涨概率76%。',
      probability: 76,
      riskLevel: 'low',
      indicators: ['政策利好', '趋势突破', 'MACD底背离', '量价配合', 'ROE领先'],
      recommendation: 'buy',
      targetPrice: 15.2,
      timeframe: '短期(1-3个月)'
    },
    {
      stockCode: '002594',
      stockName: '比亚迪',
      analysis: '新能源汽车全产业链布局的领军企业，电池、整车、半导体三大业务协同发展。2024年新能源汽车销量超预期增长，市场份额持续提升。近期发布刀片电池3.0技术，产品竞争力再次升级。股价在重要均线获得支撑，北向资金持续净流入，技术指标显示多头排列，上涨概率达82%。',
      probability: 82,
      riskLevel: 'medium',
      indicators: ['产业升级', '技术突破', '均线支撑', '北向流入', '多头排列'],
      recommendation: 'buy',
      targetPrice: 285.0,
      timeframe: '中期(3-6个月)'
    },
    {
      stockCode: '688981',
      stockName: '中芯国际',
      analysis: '国内半导体制造龙头，受益于国产化替代和政策扶持。近期公司先进制程工艺取得重要突破，产能利用率持续提升。地缘政治因素催化国产芯片需求，公司作为产业链核心环节，长期成长空间广阔。技术面看，股价在关键支撑位企稳，成交量有所放大，短期反弹概率73%。',
      probability: 73,
      riskLevel: 'high',
      indicators: ['国产替代', '技术突破', '产能提升', '关键支撑', '政策扶持'],
      recommendation: 'hold',
      targetPrice: 58.8,
      timeframe: '中期(3-6个月)'
    },
    {
      stockCode: '300059',
      stockName: '东方财富',
      analysis: '互联网证券服务龙头，受益于资本市场改革和投资者教育普及。近期股市活跃度提升带动公司经纪业务增长，基金代销和财富管理业务稳健发展。技术面看，股价在上升通道内运行，成交量温和放大，RSI指标显示多头强势，历史数据表明该形态下上涨概率77%。',
      probability: 77,
      riskLevel: 'medium',
      indicators: ['行业景气', '通道上行', 'RSI强势', '成交放大', '业务增长'],
      recommendation: 'buy',
      targetPrice: 18.5,
      timeframe: '短期(1-3个月)'
    },
    {
      stockCode: '603259',
      stockName: '药明康德',
      analysis: '全球CRO行业龙头，一体化研发服务平台优势显著。近期海外订单回暖，公司业绩有望迎来拐点。生物医药行业长期增长趋势不变，公司作为产业链关键环节，具备稳定的盈利能力。股价经过深度调整后估值合理，技术指标显示超卖反弹信号，短期上涨概率68%。',
      probability: 68,
      riskLevel: 'medium',
      indicators: ['订单回暖', '估值合理', '超卖反弹', '行业龙头', '业绩拐点'],
      recommendation: 'hold',
      targetPrice: 78.5,
      timeframe: '中期(3-6个月)'
    },
    {
      stockCode: '000002',
      stockName: '万科A',
      analysis: '地产行业龙头，经营稳健，财务结构优良。受益于地产政策边际放松和一线城市限购调整，行业基本面有望改善。公司开发+服务双轮驱动战略成效显现，租赁住宅等新业务增长良好。技术面看，股价在重要支撑区间震荡，等待政策催化，短期上涨概率65%。',
      probability: 65,
      riskLevel: 'high',
      indicators: ['政策利好', '双轮驱动', '支撑震荡', '财务稳健', '龙头优势'],
      recommendation: 'hold',
      targetPrice: 12.8,
      timeframe: '中期(3-6个月)'
    },
    {
      stockCode: '601012',
      stockName: '隆基绿能',
      analysis: '全球光伏组件龙头企业，产品技术和成本优势明显。受益于全球新能源政策支持和碳中和目标推进，光伏行业长期增长确定性高。近期硅料价格企稳，公司盈利能力有望修复。股价在底部区域震荡，成交量萎缩，等待行业催化，一旦突破，上涨空间较大，概率约71%。',
      probability: 71,
      riskLevel: 'medium',
      indicators: ['行业龙头', '技术领先', '底部震荡', '政策支持', '盈利修复'],
      recommendation: 'hold',
      targetPrice: 28.5,
      timeframe: '长期(6-12个月)'
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRecommendedStocks(mockRecommendedStocks);
      setLoading(false);
    }, 1000);
  }, []);

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return '#52c41a';
    if (probability >= 60) return '#faad14';
    return '#ff4d4f';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'green';
      case 'medium': return 'orange';
      case 'high': return 'red';
      default: return 'default';
    }
  };

  const handleSearch = async (value: string) => {
    if (!value.trim()) return;
    
    setLoading(true);
    // 模拟搜索API调用
    setTimeout(() => {
      const mockSearchResults = mockRecommendedStocks.filter(stock => 
        stock.stockName.includes(value) || 
        stock.stockCode.includes(value) ||
        stock.analysis.includes(value)
      );
      setSearchResults(mockSearchResults);
      setLoading(false);
    }, 800);
  };

  const toggleCardExpansion = (stockCode: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [stockCode]: !prev[stockCode]
    }));
  };

  const renderStockCard = (stock: StockAnalysis) => {
    const isExpanded = expandedCards[stock.stockCode] || false;
    const analysisText = stock.analysis;
    const shouldShowExpand = analysisText.length > 150; // 如果文本超过150个字符才显示展开功能

    return (
    <Card
      key={stock.stockCode}
      className="stock-card"
      style={{ height: 'auto' }}
    >
      {/* Header section with stock name and code */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 16,
        borderBottom: '1px solid #2a2f4a',
        paddingBottom: 12
      }}>
        <div>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#ffffff',
            marginBottom: 4
          }}>
            {stock.stockName}
          </div>
          <div style={{ 
            fontSize: '14px', 
            color: '#c0c0c0'
          }}>
            {stock.stockCode}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#ffffff',
            marginBottom: 4
          }}>
            目标价: ¥{stock.targetPrice?.toFixed(2)}
          </div>
          <div style={{ 
            fontSize: '12px', 
            color: '#c0c0c0'
          }}>
            {stock.timeframe}
          </div>
        </div>
      </div>

      {/* Probability section */}
      <div style={{ 
        textAlign: 'center',
        marginBottom: 16,
        padding: '12px',
        background: 'rgba(0, 212, 170, 0.1)',
        borderRadius: '8px',
        border: '1px solid rgba(0, 212, 170, 0.2)'
      }}>
        <div style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: '#00d4aa',
          marginBottom: 4
        }}>
          历史上涨概率: {stock.probability}%
        </div>
        <Progress 
          percent={stock.probability} 
          strokeColor="#00d4aa"
          showInfo={false}
          size="small"
        />
      </div>

      {/* Technical indicators */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ 
          fontSize: '14px', 
          color: '#d0d0d0',
          marginBottom: 8
        }}>
          技术指标
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {stock.indicators.map((indicator, index) => (
            <Tag 
              key={index} 
              style={{ 
                margin: 0,
                background: '#2a2f4a',
                border: '1px solid #3a3f5a',
                color: '#ffffff',
                fontSize: '12px'
              }}
            >
              {indicator}
            </Tag>
          ))}
        </div>
      </div>

      {/* AI Analysis */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ 
          fontSize: '12px', 
          color: '#d0d0d0',
          lineHeight: 1.5,
          position: 'relative',
          ...(shouldShowExpand && !isExpanded ? {
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          } : {})
        }}>
          {analysisText}
          {shouldShowExpand && !isExpanded && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '100px',
              height: '18px',
              background: 'linear-gradient(to right, transparent, #1a1f3a 70%)',
              pointerEvents: 'none'
            }} />
          )}
        </div>
        
        {shouldShowExpand && (
          <div style={{ marginTop: 8, textAlign: 'center' }}>
            <Button
              type="link"
              size="small"
              onClick={() => toggleCardExpansion(stock.stockCode)}
              style={{ 
                fontSize: '11px', 
                color: '#00d4aa',
                padding: '4px 8px',
                height: 'auto',
                border: '1px solid rgba(0, 212, 170, 0.3)',
                borderRadius: '4px',
                background: 'rgba(0, 212, 170, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 212, 170, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 212, 170, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(0, 212, 170, 0.3)';
              }}
            >
              {isExpanded ? '收起分析 ▲' : '查看详细分析 ▼'}
            </Button>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: 'auto'
      }}>
        <Button 
          type="primary" 
          size="small" 
          icon={<StarOutlined />}
          style={{ fontSize: '12px' }}
        >
          加入自选
        </Button>
        <Button 
          type="link" 
          size="small"
          style={{ fontSize: '12px', color: '#00d4aa' }}
        >
          将当前添加入自选
        </Button>
      </div>
    </Card>
    );
  };

  return (
    <div>
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        size="large"
        tabBarStyle={{ marginBottom: 24 }}
      >
        <TabPane tab="智能推荐" key="recommended">
          <Spin spinning={loading}>
            <div style={{ marginBottom: 16 }}>
              <Badge count={recommendedStocks.length} showZero>
                <h3 style={{ margin: 0 }}>AI推荐股票</h3>
              </Badge>
                          <p style={{ color: '#e0e0e0', marginTop: 8 }}>
                          基于 A 股历史详细数据 ai 分析，配合多因子模型和技术指标，为您实时推荐当前具有上涨潜力的股票
            </p>
            </div>
            
            <Row gutter={[16, 16]}>
              {recommendedStocks
                .sort((a, b) => b.probability - a.probability)
                .map((stock, index) => (
                  <Col key={stock.stockCode} xs={24} sm={12} lg={8} xl={6}>
                    {renderStockCard(stock)}
                  </Col>
                ))}
            </Row>
          </Spin>
        </TabPane>
        
        <TabPane tab="自然语言检索" key="search">
          <div style={{ marginBottom: 24 }}>
            <h3>自然语言选股</h3>
            <p style={{ color: '#e0e0e0' }}>
              使用自然语言描述选股条件，AI将为您找到符合条件的股票
            </p>
            <div style={{ 
              background: '#2a2f4a',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ 
                fontSize: '14px', 
                color: '#d0d0d0', 
                marginBottom: '8px' 
              }}>
                示例：计算当日线历史出现 MACD 金叉时RSI&gt;50，且成交量放大，布林带+KDJ 验证；确保月线 PE &lt; 30 的光伏概念，目标涨幅 10%
              </div>
              <Search
                placeholder="自然语言描述您的选股条件..."
                allowClear
                enterButton={<Button type="primary">AI筛选</Button>}
                size="large"
                onSearch={handleSearch}
                style={{ width: '100%' }}
              />
              <div style={{ 
                marginTop: '8px', 
                fontSize: '12px', 
                color: '#c0c0c0' 
              }}>
                解析关键指标并井历史概率筛选，结果仅供参考
              </div>
            </div>
          </div>

          <Spin spinning={loading}>
            {searchResults.length > 0 && (
              <div>
                <h4>检索结果 ({searchResults.length} 只股票)</h4>
                <Row gutter={[16, 16]}>
                  {searchResults.map((stock, index) => (
                    <Col key={stock.stockCode} xs={24} sm={12} lg={8} xl={6}>
                      {renderStockCard(stock)}
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Spin>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SmartStockSelection;
