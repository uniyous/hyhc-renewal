import React from 'react';
import { Layout } from 'antd';
import { useIntl } from 'react-intl';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const intl = useIntl();
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter
      style={{
        textAlign: 'center',
        background: '#f0f2f5',
        color: '#666',
        fontSize: '14px',
      }}
    >
      HYHC Admin Dashboard ©{currentYear} Created by SK hynix
    </AntFooter>
  );
};

export default Footer;