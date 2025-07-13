import React from 'react';
import { Badge, Space } from 'antd';
import { 
  CheckCircleOutlined, 
  ExclamationCircleOutlined, 
  CloseCircleOutlined, 
  ClockCircleOutlined,
  SyncOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledBadge = styled(Badge)`
  .ant-badge-status-dot {
    width: 8px;
    height: 8px;
  }
  
  &.animate {
    .ant-badge-status-dot {
      animation: ${pulse} 2s infinite;
    }
  }
  
  .ant-badge-status-text {
    font-size: 13px;
    margin-left: 8px;
  }
`;

const IconContainer = styled.span`
  margin-right: 4px;
  display: inline-flex;
  align-items: center;
  
  &.animate {
    animation: ${pulse} 2s infinite;
  }
`;

const statusConfig = {
  success: {
    color: '#52c41a',
    icon: CheckCircleOutlined,
    text: '성공'
  },
  error: {
    color: '#ff4d4f',
    icon: CloseCircleOutlined,
    text: '오류'
  },
  warning: {
    color: '#faad14',
    icon: ExclamationCircleOutlined,
    text: '경고'
  },
  info: {
    color: '#1890ff',
    icon: ClockCircleOutlined,
    text: '정보'
  },
  processing: {
    color: '#1890ff',
    icon: SyncOutlined,
    text: '처리중'
  },
  default: {
    color: '#d9d9d9',
    icon: MinusCircleOutlined,
    text: '기본'
  },
  connected: {
    color: '#52c41a',
    icon: CheckCircleOutlined,
    text: '연결됨'
  },
  disconnected: {
    color: '#ff4d4f',
    icon: CloseCircleOutlined,
    text: '연결끊김'
  },
  pending: {
    color: '#faad14',
    icon: ClockCircleOutlined,
    text: '대기중'
  },
  running: {
    color: '#52c41a',
    icon: SyncOutlined,
    text: '실행중'
  },
  stopped: {
    color: '#ff4d4f',
    icon: MinusCircleOutlined,
    text: '중지됨'
  }
};

const StatusBadge = ({
  status = 'default',
  text = null,
  showIcon = false,
  showDot = true,
  animate = false,
  size = 'default',
  style = {},
  className = '',
  onClick,
  ...props
}) => {
  const config = statusConfig[status] || statusConfig.default;
  const displayText = text || config.text;
  const IconComponent = config.icon;
  
  const shouldAnimate = animate || status === 'processing' || status === 'running';

  if (showIcon && !showDot) {
    return (
      <Space 
        size={4} 
        style={{ 
          color: config.color, 
          cursor: onClick ? 'pointer' : 'default',
          ...style 
        }}
        className={className}
        onClick={onClick}
        {...props}
      >
        <IconContainer className={shouldAnimate ? 'animate' : ''}>
          <IconComponent 
            style={{ 
              color: config.color,
              fontSize: size === 'small' ? '12px' : '14px'
            }} 
            spin={status === 'processing' || status === 'running'}
          />
        </IconContainer>
        <span style={{ fontSize: size === 'small' ? '12px' : '13px' }}>
          {displayText}
        </span>
      </Space>
    );
  }

  return (
    <StyledBadge
      status={status}
      color={config.color}
      text={
        <Space size={4}>
          {showIcon && (
            <IconContainer className={shouldAnimate ? 'animate' : ''}>
              <IconComponent 
                style={{ 
                  color: config.color,
                  fontSize: size === 'small' ? '10px' : '12px'
                }} 
                spin={status === 'processing' || status === 'running'}
              />
            </IconContainer>
          )}
          <span>{displayText}</span>
        </Space>
      }
      className={`${shouldAnimate ? 'animate' : ''} ${className}`}
      style={{ 
        cursor: onClick ? 'pointer' : 'default',
        ...style 
      }}
      onClick={onClick}
      {...props}
    />
  );
};

export default StatusBadge;