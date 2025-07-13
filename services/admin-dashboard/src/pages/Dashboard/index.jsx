import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Space, Typography } from 'antd';
import { 
  DatabaseOutlined, 
  CloudServerOutlined, 
  SyncOutlined, 
  WarningOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const { Title } = Typography;

const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  background: #f5f5f5;
  overflow-y: auto;
  
  .ant-row {
    width: 100% !important;
  }
  
  .ant-col {
    max-width: 100%;
  }
`;

const DashboardHeader = styled.div`
  background: #fff;
  padding: 24px;
  margin: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <Title level={1} style={{ margin: '0 0 16px 0' }}>HYHC 대시보드</Title>
        <p style={{ margin: 0, fontSize: '16px', color: '#666' }}>
          데이터베이스 복제 서비스 모니터링 및 관리
        </p>
      </DashboardHeader>
      
      {/* 시스템 상태 카드 */}
      <div style={{ padding: '0 24px', marginBottom: '24px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '24px',
          width: '100%'
        }}>
          <Card>
            <Statistic
              title="활성 연결"
              value={12}
              prefix={<DatabaseOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
          <Card>
            <Statistic
              title="복제 작업"
              value={8}
              prefix={<SyncOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
          <Card>
            <Statistic
              title="처리량"
              value={2.5}
              precision={1}
              suffix="GB/h"
              prefix={<CloudServerOutlined style={{ color: '#722ed1' }} />}
            />
          </Card>
          <Card>
            <Statistic
              title="경고"
              value={3}
              prefix={<WarningOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </div>
      </div>

      {/* 차트 영역 */}
      <div style={{ padding: '0 24px', marginBottom: '24px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr', 
          gap: '24px',
          width: '100%'
        }}>
          <Card title="시스템 리소스 사용률" style={{ height: '400px' }}>
            <div style={{ 
              textAlign: 'center', 
              padding: '100px 20px',
              background: '#fafafa',
              borderRadius: '8px',
              height: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Title level={3} style={{ color: '#1890ff' }}>시스템 리소스 차트</Title>
              <p style={{ color: '#666' }}>CPU, 메모리, 디스크 사용률이 여기에 표시됩니다</p>
            </div>
          </Card>
          <Card title="서비스 상태 분포" style={{ height: '400px' }}>
            <div style={{ 
              textAlign: 'center', 
              padding: '100px 20px',
              background: '#f0f9ff',
              borderRadius: '8px',
              height: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Title level={3} style={{ color: '#52c41a' }}>상태 분포</Title>
              <p style={{ color: '#666' }}>정상/경고/오류 상태가 여기에 표시됩니다</p>
            </div>
          </Card>
        </div>
      </div>

      {/* 추가 차트 영역 */}
      <div style={{ padding: '0 24px', marginBottom: '24px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '24px',
          width: '100%'
        }}>
          <Card title="복제 처리량 추이" style={{ height: '350px' }}>
            <div style={{ 
              textAlign: 'center', 
              padding: '80px 20px',
              background: '#f6ffed',
              borderRadius: '8px',
              height: '230px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Title level={4}>처리량 추이</Title>
              <p style={{ color: '#666' }}>시간별 데이터 복제 처리량</p>
            </div>
          </Card>
          <Card title="성능 지표" style={{ height: '350px' }}>
            <div style={{ 
              textAlign: 'center', 
              padding: '80px 20px',
              background: '#fff7e6',
              borderRadius: '8px',
              height: '230px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Title level={4}>성능 지표</Title>
              <p style={{ color: '#666' }}>네트워크, I/O, 응답시간 등</p>
            </div>
          </Card>
        </div>
      </div>

      {/* 상태 정보 */}
      <div style={{ padding: '0 24px 24px 24px' }}>
        <Card title="시스템 상태 요약" size="small" style={{ width: '100%' }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '32px',
            justifyContent: 'space-around'
          }}>
            <div>
              <span style={{ color: '#52c41a', fontWeight: 'bold' }}>● 데이터베이스 연결:</span>
              <span style={{ marginLeft: '8px' }}>정상 (12개 활성)</span>
            </div>
            <div>
              <span style={{ color: '#1890ff', fontWeight: 'bold' }}>● 복제 서비스:</span>
              <span style={{ marginLeft: '8px' }}>실행중 (8개 작업)</span>
            </div>
            <div>
              <span style={{ color: '#722ed1', fontWeight: 'bold' }}>● 백업 상태:</span>
              <span style={{ marginLeft: '8px' }}>완료</span>
            </div>
            <div>
              <span style={{ color: '#faad14', fontWeight: 'bold' }}>● 시스템 알림:</span>
              <span style={{ marginLeft: '8px' }}>3개 경고</span>
            </div>
          </div>
        </Card>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;