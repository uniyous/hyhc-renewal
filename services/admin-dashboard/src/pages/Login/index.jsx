import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { loginStart } from '../../store/reduxStore/slices/authSlice';
import styled from 'styled-components';

const { Title } = Typography;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoginCard = styled(Card)`
  width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const Login = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(loginStart(values));
  };

  return (
    <LoginContainer>
      <LoginCard>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ color: '#1890ff' }}>
            HYHC Admin
          </Title>
          <p style={{ color: '#666' }}>
            {intl.formatMessage({ id: 'auth.loginRequired' })}
          </p>
        </div>
        
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'auth.username' }),
              },
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder={intl.formatMessage({ id: 'auth.username' })}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'auth.password' }),
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={intl.formatMessage({ id: 'auth.password' })}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {intl.formatMessage({ id: 'auth.login' })}
            </Button>
          </Form.Item>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;