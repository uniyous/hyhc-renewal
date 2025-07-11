import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.height || '200px'};
  width: 100%;
`;

const LoadingSpinner = ({ size = 'large', height }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <LoadingContainer height={height}>
      <Spin indicator={antIcon} size={size} />
    </LoadingContainer>
  );
};

export default LoadingSpinner;