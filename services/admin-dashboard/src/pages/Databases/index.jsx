import React from 'react';
import { Card, Typography } from 'antd';
import { useIntl } from 'react-intl';

const { Title } = Typography;

const Databases = () => {
  const intl = useIntl();

  return (
    <div>
      <Title level={2}>
        {intl.formatMessage({ id: 'databases.title' })}
      </Title>
      
      <Card>
        <p>데이터베이스 관리 페이지입니다.</p>
      </Card>
    </div>
  );
};

export default Databases;