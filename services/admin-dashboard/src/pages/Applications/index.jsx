import React from 'react';
import { Card, Typography } from 'antd';
import { useIntl } from 'react-intl';

const { Title } = Typography;

const Applications = () => {
  const intl = useIntl();

  return (
    <div>
      <Title level={2}>
        {intl.formatMessage({ id: 'applications.title' })}
      </Title>
      
      <Card>
        <p>어플리케이션 관리 페이지입니다.</p>
      </Card>
    </div>
  );
};

export default Applications;