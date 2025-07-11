import React from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { 
  AppstoreOutlined, 
  DatabaseOutlined, 
  LinkOutlined, 
  MonitorOutlined 
} from '@ant-design/icons';

const { Title } = Typography;

const Dashboard = () => {
  const intl = useIntl();

  const stats = [
    {
      title: intl.formatMessage({ id: 'navigation.applications' }),
      value: 12,
      icon: <AppstoreOutlined style={{ color: '#1890ff' }} />,
    },
    {
      title: intl.formatMessage({ id: 'navigation.databases' }),
      value: 8,
      icon: <DatabaseOutlined style={{ color: '#52c41a' }} />,
    },
    {
      title: intl.formatMessage({ id: 'navigation.connections' }),
      value: 24,
      icon: <LinkOutlined style={{ color: '#722ed1' }} />,
    },
    {
      title: intl.formatMessage({ id: 'monitoring.performance' }),
      value: '98%',
      icon: <MonitorOutlined style={{ color: '#fa8c16' }} />,
    },
  ];

  return (
    <div>
      <Title level={2}>
        {intl.formatMessage({ id: 'dashboard.title' })}
      </Title>
      
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.icon.props.style.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card 
            title={intl.formatMessage({ id: 'dashboard.overview' })}
            style={{ height: '300px' }}
          >
            <p>시스템 개요 정보가 여기에 표시됩니다.</p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
            title={intl.formatMessage({ id: 'dashboard.recentActivity' })}
            style={{ height: '300px' }}
          >
            <p>최근 활동 내역이 여기에 표시됩니다.</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;