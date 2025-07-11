import React from 'react';
import { Layout, Button, Dropdown, Avatar, Space, Select } from 'antd';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined, 
  UserOutlined, 
  LogoutOutlined,
  SettingOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { toggleSidebar } from '../../../store/reduxStore/slices/appSlice';
import { logout } from '../../../store/reduxStore/slices/authSlice';
import { setLanguage } from '../../../store/reduxStore/slices/appSlice';
import { selectSidebarCollapsed, selectUser, selectLanguage } from '../../../store/reduxStore/selectors';
import { HeaderContainer, HeaderContent, UserSection } from './styles';

const { Header: AntHeader } = Layout;

const Header = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const collapsed = useSelector(selectSidebarCollapsed);
  const user = useSelector(selectUser);
  const language = useSelector(selectLanguage);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLanguageChange = (value) => {
    dispatch(setLanguage(value));
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: intl.formatMessage({ id: 'common.profile' }),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: intl.formatMessage({ id: 'navigation.settings' }),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: intl.formatMessage({ id: 'auth.logout' }),
      onClick: handleLogout,
    },
  ];

  return (
    <HeaderContainer>
      <AntHeader style={{ padding: 0, background: '#fff' }}>
        <HeaderContent>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleToggleSidebar}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          
          <UserSection>
            <Space size="middle">
              <Select
                value={language}
                onChange={handleLanguageChange}
                style={{ width: 120 }}
                size="small"
                suffixIcon={<GlobalOutlined />}
              >
                <Select.Option value="ko">한국어</Select.Option>
                <Select.Option value="en">English</Select.Option>
                <Select.Option value="zh">中文</Select.Option>
              </Select>
              
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                arrow
              >
                <Button type="text" style={{ height: 'auto', padding: '4px 8px' }}>
                  <Space>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <span>{user?.name || 'User'}</span>
                  </Space>
                </Button>
              </Dropdown>
            </Space>
          </UserSection>
        </HeaderContent>
      </AntHeader>
    </HeaderContainer>
  );
};

export default Header;