import React from 'react';
import { Layout as AntLayout, ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSidebarCollapsed, selectTheme } from '../../../store/reduxStore/selectors';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import styled from 'styled-components';

const { Content } = AntLayout;

const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
  background: ${props => props.theme === 'dark' ? '#141414' : '#f0f2f5'};
`;

const StyledContent = styled(Content)`
  margin-left: ${props => props.$collapsed ? '64px' : '200px'};
  margin-top: 64px;
  padding: 0;
  min-height: calc(100vh - 64px);
  background: ${props => props.$theme === 'dark' ? '#141414' : '#f0f2f5'};
  transition: margin-left 0.3s cubic-bezier(0.2, 0, 0, 1);
  flex: 1;
  width: auto;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Layout = () => {
  const collapsed = useSelector(selectSidebarCollapsed);
  const theme = useSelector(selectTheme);

  const getThemeConfig = () => {
    if (theme === 'dark') {
      return {
        algorithm: 'darkAlgorithm',
        token: {
          colorPrimary: '#1890ff',
          colorBgContainer: '#1f1f1f',
          colorBgElevated: '#262626',
          colorBgLayout: '#141414',
          colorText: '#ffffff',
          colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
          colorBorder: '#424242',
        },
      };
    }
    
    return {
      token: {
        colorPrimary: '#1890ff',
        colorBgContainer: '#ffffff',
        colorBgLayout: '#f0f2f5',
        borderRadius: 8,
        wireframe: false,
      },
      components: {
        Layout: {
          headerBg: '#ffffff',
          headerHeight: 64,
          siderBg: '#001529',
        },
        Menu: {
          itemHeight: 40,
          itemMarginInline: 8,
          itemBorderRadius: 6,
        },
        Button: {
          borderRadius: 6,
        },
        Card: {
          borderRadius: 12,
        },
        Table: {
          borderRadius: 8,
        },
      },
    };
  };

  return (
    <ConfigProvider theme={getThemeConfig()}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        width: '100vw',
        overflow: 'hidden'
      }}>
        <Header />
        <div style={{ 
          display: 'flex', 
          flex: 1,
          height: 'calc(100vh - 64px)',
          overflow: 'hidden'
        }}>
          <Sidebar collapsed={collapsed} />
          <div style={{ 
            flex: 1, 
            background: theme === 'dark' ? '#141414' : '#f0f2f5',
            overflow: 'auto',
            height: '100%'
          }}>
            <Outlet />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Layout;