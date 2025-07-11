import React from 'react';
import { Layout as AntLayout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSidebarCollapsed } from '../../../store/reduxStore/selectors';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { LayoutContainer } from './styles';

const { Content } = AntLayout;

const Layout = () => {
  const collapsed = useSelector(selectSidebarCollapsed);

  return (
    <LayoutContainer>
      <AntLayout style={{ minHeight: '100vh' }}>
        <Sidebar collapsed={collapsed} />
        <AntLayout>
          <Header />
          <Content style={{ 
            margin: '24px 16px', 
            padding: 24, 
            minHeight: 280,
            background: '#fff',
            borderRadius: 8
          }}>
            <Outlet />
          </Content>
          <Footer />
        </AntLayout>
      </AntLayout>
    </LayoutContainer>
  );
};

export default Layout;