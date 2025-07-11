import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import {
  DashboardOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  LinkOutlined,
  TableOutlined,
  MonitorOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { SidebarContainer, Logo } from './styles';

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const intl = useIntl();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: intl.formatMessage({ id: 'navigation.dashboard' }),
    },
    {
      key: '/applications',
      icon: <AppstoreOutlined />,
      label: intl.formatMessage({ id: 'navigation.applications' }),
    },
    {
      key: '/databases',
      icon: <DatabaseOutlined />,
      label: intl.formatMessage({ id: 'navigation.databases' }),
    },
    {
      key: '/connections',
      icon: <LinkOutlined />,
      label: intl.formatMessage({ id: 'navigation.connections' }),
    },
    {
      key: '/table-mappings',
      icon: <TableOutlined />,
      label: intl.formatMessage({ id: 'navigation.tableMappings' }),
    },
    {
      key: '/monitoring',
      icon: <MonitorOutlined />,
      label: intl.formatMessage({ id: 'navigation.monitoring' }),
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: intl.formatMessage({ id: 'navigation.settings' }),
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <SidebarContainer>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Logo collapsed={collapsed}>
          <div style={{ 
            color: '#fff', 
            fontSize: collapsed ? '14px' : '18px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            {collapsed ? 'HC' : 'HYHC Admin'}
          </div>
        </Logo>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
    </SidebarContainer>
  );
};

export default Sidebar;