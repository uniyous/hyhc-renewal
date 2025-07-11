import React from 'react';
import { Card, Typography } from 'antd';
import { useIntl } from 'react-intl';

const { Title } = Typography;

const Monitoring = () => {
  const intl = useIntl();

  return (
    <div>
      <Title level={2}>
        {intl.formatMessage({ id: 'monitoring.title' })}
      </Title>
      
      <Card>
        <p>모니터링 페이지입니다.</p>
      </Card>
    </div>
  );
};

export default Monitoring;