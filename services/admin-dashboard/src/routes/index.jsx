import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '../components/templates/Layout';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import ErrorBoundary from '../components/atoms/ErrorBoundary';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Applications = lazy(() => import('../pages/Applications'));
const Databases = lazy(() => import('../pages/Databases'));
const Connections = lazy(() => import('../pages/Connections'));
const TableMappings = lazy(() => import('../pages/TableMappings'));
const Monitoring = lazy(() => import('../pages/Monitoring'));
const Settings = lazy(() => import('../pages/Settings'));
const Login = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFound'));

const LazyWrapper = ({ children }) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <LazyWrapper>
        <Login />
      </LazyWrapper>
    ),
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <LazyWrapper>
            <Dashboard />
          </LazyWrapper>
        ),
      },
      {
        path: 'applications',
        element: (
          <LazyWrapper>
            <Applications />
          </LazyWrapper>
        ),
      },
      {
        path: 'databases',
        element: (
          <LazyWrapper>
            <Databases />
          </LazyWrapper>
        ),
      },
      {
        path: 'connections',
        element: (
          <LazyWrapper>
            <Connections />
          </LazyWrapper>
        ),
      },
      {
        path: 'table-mappings',
        element: (
          <LazyWrapper>
            <TableMappings />
          </LazyWrapper>
        ),
      },
      {
        path: 'monitoring',
        element: (
          <LazyWrapper>
            <Monitoring />
          </LazyWrapper>
        ),
      },
      {
        path: 'settings',
        element: (
          <LazyWrapper>
            <Settings />
          </LazyWrapper>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <LazyWrapper>
        <NotFound />
      </LazyWrapper>
    ),
  },
], {
  future: {
    v7_startTransition: true,
  },
});

export default router;