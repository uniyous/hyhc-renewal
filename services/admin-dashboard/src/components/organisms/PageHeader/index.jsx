import React from 'react';
import { Typography, Breadcrumb, Space, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title } = Typography;

const HeaderContainer = styled.div`
  background: #ffffff;
  padding: 20px 24px;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 24px;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const HeaderLeft = styled.div`
  flex: 1;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PageTitle = styled(Title)`
  && {
    margin: 0 0 8px 0;
    font-size: 28px;
    font-weight: 600;
    color: #262626;
  }
`;

const PageDescription = styled.div`
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const StyledBreadcrumb = styled(Breadcrumb)`
  .ant-breadcrumb-link {
    color: #666;
    font-size: 13px;
    
    &:hover {
      color: #1890ff;
    }
  }
  
  .ant-breadcrumb-separator {
    color: #999;
  }
`;

const ActionButton = styled(Button)`
  &.ant-btn-primary {
    background: #1890ff;
    border-color: #1890ff;
    
    &:hover {
      background: #40a9ff;
      border-color: #40a9ff;
    }
  }
`;

const PageHeader = ({
  title,
  description,
  breadcrumb = [],
  actions = [],
  extra = null,
  showHomeIcon = true,
  className,
  ...props
}) => {
  const defaultBreadcrumbItems = showHomeIcon 
    ? [
        {
          title: (
            <Space>
              <HomeOutlined />
              <span>홈</span>
            </Space>
          ),
          path: '/',
        },
        ...breadcrumb
      ]
    : breadcrumb;

  const breadcrumbItems = defaultBreadcrumbItems.map((item, index) => ({
    key: index,
    title: item.path ? (
      <a href={item.path}>{item.title}</a>
    ) : (
      item.title
    ),
  }));

  return (
    <HeaderContainer className={className} {...props}>
      {breadcrumbItems.length > 0 && (
        <StyledBreadcrumb items={breadcrumbItems} />
      )}
      
      <HeaderTop>
        <HeaderLeft>
          <PageTitle level={1}>{title}</PageTitle>
          {description && (
            <PageDescription>{description}</PageDescription>
          )}
        </HeaderLeft>
        
        {(actions.length > 0 || extra) && (
          <HeaderRight>
            {actions.map((action, index) => (
              <ActionButton
                key={index}
                type={action.type || 'default'}
                icon={action.icon}
                onClick={action.onClick}
                loading={action.loading}
                disabled={action.disabled}
                size={action.size || 'default'}
              >
                {action.label}
              </ActionButton>
            ))}
            {extra}
          </HeaderRight>
        )}
      </HeaderTop>
    </HeaderContainer>
  );
};

export default PageHeader;