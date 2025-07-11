import React from 'react';
import { Card, Typography } from 'antd';
import { useIntl } from 'react-intl';

const { Title } = Typography;

const TableMappings = () => {
  const intl = useIntl();

  return (
    <div>
      <Title level={2}>
        {intl.formatMessage({ id: 'tableMappings.title' })}
      </Title>
      
      <Card>
        <p>테이블 매핑 페이지입니다.</p>
      </Card>
    </div>
  );
};

export default TableMappings;