import React from 'react';
import { Layout } from 'antd';
import { useIntl } from 'react-intl';
import { FooterContainer } from './styles';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const intl = useIntl();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <AntFooter style={{ textAlign: 'center' }}>
        HYHC Admin Dashboard ©{currentYear} Created by SK hynix
      </AntFooter>
    </FooterContainer>
  );
};

export default Footer;