import React from 'react';
import { Layout, Menu, Divider, Typography, Tooltip } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../../store/reduxStore/slices/appSlice';
import {
  DashboardOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  LinkOutlined,
  TableOutlined,
  MonitorOutlined,
  SettingOutlined,
  HomeOutlined,
  FolderOutlined,
  ControlOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

const { Sider } = Layout;
const { Text } = Typography;

const StyledSider = styled(Sider)`
  overflow: hidden;
  height: 100%;
  position: static;
  background: linear-gradient(180deg, #001529 0%, #002140 100%) !important;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
  
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
    }
  }
  
  .ant-menu-dark {
    background: transparent;
    border: none;
  }
  
  .ant-menu-dark .ant-menu-item {
    margin: 2px 12px;
    border-radius: 8px;
    height: 44px;
    line-height: 44px;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 100%;
      background: #1890ff;
      transform: scaleY(0);
      transition: transform 0.2s ease;
    }
    
    &:hover {
      background: rgba(24, 144, 255, 0.1);
      transform: translateX(2px);
      
      &::before {
        transform: scaleY(1);
      }
    }
    
    &.ant-menu-item-selected {
      background: rgba(24, 144, 255, 0.15);
      color: #1890ff;
      font-weight: 500;
      
      &::before {
        transform: scaleY(1);
      }
      
      &::after {
        display: none;
      }
    }
    
    .ant-menu-item-icon {
      font-size: 16px;
      min-width: 16px;
    }
    
    .ant-menu-title-content {
      margin-left: 12px;
      font-size: 14px;
    }
  }
  
  /* Collapsed 상태에서 특별 스타일링 */
  &.ant-layout-sider-collapsed {
    .ant-menu-dark .ant-menu-item {
      margin: 2px 8px;
      padding: 0;
      justify-content: center;
      
      .ant-menu-item-icon {
        font-size: 18px;
        margin: 0;
      }
      
      &:hover {
        transform: scale(1.05);
        background: rgba(24, 144, 255, 0.2);
        box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
      }
      
      &.ant-menu-item-selected {
        background: rgba(24, 144, 255, 0.25);
        box-shadow: 0 4px 16px rgba(24, 144, 255, 0.4);
      }
    }
  }
`;

const LogoSection = styled.div`
  padding: 16px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 8px;
`;

const CategoryTitle = styled.div`
  color: rgba(255, 255, 255, 0.45);
  font-size: 11px;
  padding: 20px 16px 12px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 8px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 16px;
    bottom: -1px;
    width: 24px;
    height: 2px;
    background: #1890ff;
    border-radius: 1px;
  }
`;

const MenuSection = styled.div`
  flex: 1;
  padding: 0 0 16px;
`;

const FooterSection = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CollapseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.85);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(24, 144, 255, 0.2);
    color: #1890ff;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    font-size: 14px;
  }
`;

const Sidebar = ({ collapsed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const mainMenuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '대시보드',
      type: 'item',
    },
  ];

  const managementMenuItems = [
    {
      key: '/applications',
      icon: <AppstoreOutlined />,
      label: '애플리케이션',
      type: 'item',
    },
    {
      key: '/databases',
      icon: <DatabaseOutlined />,
      label: '데이터베이스',
      type: 'item',
    },
    {
      key: '/connections',
      icon: <LinkOutlined />,
      label: '연결관리',
      type: 'item',
    },
    {
      key: '/table-mappings',
      icon: <TableOutlined />,
      label: '테이블매핑',
      type: 'item',
    },
  ];

  const systemMenuItems = [
    {
      key: '/monitoring',
      icon: <MonitorOutlined />,
      label: '모니터링',
      type: 'item',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '설정',
      type: 'item',
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const renderMenuItems = (items) => {
    return items.map(item => ({
      key: item.key,
      icon: collapsed ? (
        <Tooltip title={item.label} placement="right" mouseEnterDelay={0.1}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}>
            {item.icon}
          </div>
        </Tooltip>
      ) : item.icon,
      label: collapsed ? null : item.label,
    }));
  };

  return (
    <StyledSider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={200}
      collapsedWidth={64}
    >
      <MenuSection>
        {!collapsed && (
          <CategoryTitle>
            <HomeOutlined style={{ marginRight: 8 }} />
            메인
          </CategoryTitle>
        )}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          style={{ background: 'transparent', border: 'none' }}
          items={renderMenuItems(mainMenuItems)}
        />

        {!collapsed && (
          <CategoryTitle>
            <FolderOutlined style={{ marginRight: 8 }} />
            데이터 관리
          </CategoryTitle>
        )}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          style={{ background: 'transparent', border: 'none' }}
          items={renderMenuItems(managementMenuItems)}
        />

        {!collapsed && (
          <CategoryTitle>
            <ControlOutlined style={{ marginRight: 8 }} />
            시스템
          </CategoryTitle>
        )}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          style={{ background: 'transparent', border: 'none' }}
          items={renderMenuItems(systemMenuItems)}
        />
      </MenuSection>

      <FooterSection>
        <CollapseButton onClick={handleToggleSidebar}>
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </CollapseButton>
      </FooterSection>
    </StyledSider>
  );
};

export default Sidebar;