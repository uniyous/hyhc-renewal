import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { store } from './store/reduxStore';
import { router } from './routes';
import IntlProvider from './components/organisms/IntlProvider';
import './index.css';
import 'antd/dist/reset.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1890ff',
            },
          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      </IntlProvider>
    </Provider>
  </React.StrictMode>
);
