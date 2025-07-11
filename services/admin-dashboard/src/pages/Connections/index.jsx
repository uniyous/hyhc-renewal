import React from 'react';
import { Card, Typography } from 'antd';
import { useIntl } from 'react-intl';

const { Title } = Typography;

const Connections = () => {
  const intl = useIntl();

  return (
    <div>
      <Title level={2}>
        {intl.formatMessage({ id: 'connections.title' })}
      </Title>
      
      <Card>
        <p>연결 관리 페이지입니다.</p>
      </Card>
    </div>
  );
};

export default Connections;