import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './store/reduxStore';
import { router } from './routes';
import CommonStoreProvider from './components/organisms/CommonStoreProvider';
import './index.css';
import 'antd/dist/reset.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CommonStoreProvider>
      <RouterProvider router={router} />
    </CommonStoreProvider>
  </Provider>
);
