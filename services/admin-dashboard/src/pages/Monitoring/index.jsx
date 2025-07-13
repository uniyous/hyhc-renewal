import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px;
  background: #f5f5f5;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8e8e8;
`;

const PageContent = styled.div`
  width: 100%;
  min-height: calc(100vh - 120px);
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const Monitoring = () => {
  return (
    <PageContainer>
      <PageHeader>
        <Title level={2} style={{ margin: 0 }}>모니터링</Title>
      </PageHeader>
      <PageContent>
        {/* 페이지 내용이 여기에 들어갑니다 */}
        <p>모니터링 페이지 내용</p>
      </PageContent>
    </PageContainer>
  );
};

export default Monitoring;