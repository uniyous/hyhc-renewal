import React from 'react';
import { Layout, Button, Dropdown, Avatar, Space, Breadcrumb, Badge, Typography } from 'antd';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined, 
  UserOutlined, 
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
  GlobalOutlined,
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toggleSidebar, setTheme } from '../../../store/reduxStore/slices/appSlice';
import { logout } from '../../../store/reduxStore/slices/authSlice';
import { selectSidebarCollapsed, selectUser, selectProfile, selectUserName, selectTheme } from '../../../store/reduxStore/selectors';
import styled from 'styled-components';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const StyledHeader = styled(AntHeader)`
  padding: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  position: static;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: 64px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  font-weight: 600;
  font-size: 18px;
  color: #1890ff;
  min-width: ${props => props.$collapsed ? '80px' : '200px'};
  transition: all 0.3s;
  border-right: 1px solid #f0f0f0;
`;

const BreadcrumbSection = styled.div`
  flex: 1;
  padding: 0 24px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 24px;
  height: 100%;
`;

const ActionButton = styled(Button)`
  border: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 8px;
  
  &:hover {
    background: #f5f5f5;
  }
  
  .anticon {
    font-size: 16px;
  }
`;

const UserSection = styled(Button)`
  border: none;
  box-shadow: none;
  height: 48px;
  padding: 8px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  min-width: 140px;
  
  &:hover {
    background: #f5f5f5;
  }
  
  .ant-space {
    width: 100%;
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const collapsed = useSelector(selectSidebarCollapsed);
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);
  const userName = useSelector(selectUserName);
  const theme = useSelector(selectTheme);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleThemeToggle = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const getBreadcrumbItems = () => {
    const pathMap = {
      '/': '대시보드',
      '/applications': '애플리케이션',
      '/databases': '데이터베이스',
      '/connections': '연결관리',
      '/table-mappings': '테이블매핑',
      '/monitoring': '모니터링',
      '/settings': '설정'
    };

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const items = [{ title: 'Home' }];
    
    if (pathSegments.length === 0) {
      items.push({ title: '대시보드' });
    } else {
      const currentPath = '/' + pathSegments.join('/');
      items.push({ title: pathMap[currentPath] || '페이지' });
    }
    
    return items;
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '프로필',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '계정 설정',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '로그아웃',
      onClick: handleLogout,
    },
  ];

  const languageItems = [
    { key: 'ko', label: '한국어' },
    { key: 'en', label: 'English' },
    { key: 'zh', label: '中文' },
  ];

  return (
    <StyledHeader>
      <LeftSection>
        <LogoSection $collapsed={collapsed}>
          {collapsed ? 'HC' : 'HYHC Admin'}
        </LogoSection>
        
        <BreadcrumbSection>
          <Breadcrumb items={getBreadcrumbItems()} />
        </BreadcrumbSection>
      </LeftSection>

      <RightSection>
        <Dropdown menu={{ items: languageItems }} placement="bottomRight">
          <ActionButton type="text" icon={<GlobalOutlined />} />
        </Dropdown>
        
        <ActionButton 
          type="text" 
          icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
          onClick={handleThemeToggle}
        />
        
        <Badge count={3} size="small" offset={[-2, 2]}>
          <ActionButton type="text" icon={<BellOutlined />} />
        </Badge>
        
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          arrow
        >
          <UserSection type="text">
            <Space size={12} align="center">
              <Avatar 
                size={32}
                icon={<UserOutlined />}
                style={{ 
                  backgroundColor: '#1890ff',
                  flexShrink: 0
                }}
              />
              <div style={{ 
                textAlign: 'left',
                lineHeight: 1.2,
                overflow: 'hidden'
              }}>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: 500,
                  color: '#262626',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '80px'
                }}>
                  {userName || user?.name || 'Admin User'}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#8c8c8c',
                  marginTop: '2px'
                }}>
                  관리자
                </div>
              </div>
            </Space>
          </UserSection>
        </Dropdown>
      </RightSection>
    </StyledHeader>
  );
};

export default Header;