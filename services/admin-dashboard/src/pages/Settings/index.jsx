import React from 'react';
import { Card, Typography } from 'antd';
import { useIntl } from 'react-intl';

const { Title } = Typography;

const Settings = () => {
  const intl = useIntl();

  return (
    <div>
      <Title level={2}>
        {intl.formatMessage({ id: 'settings.title' })}
      </Title>
      
      <Card>
        <p>설정 페이지입니다.</p>
      </Card>
    </div>
  );
};

export default Settings;