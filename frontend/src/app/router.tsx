import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RootLayout } from '@/pages/layouts/RootLayout';
import { DashboardLayout } from '@/pages/layouts/DashboardLayout';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';

const HomePage = lazy(() => import('@/pages/Home'));
const LoginPage = lazy(() => import('@/pages/Login'));
const DashboardPage = lazy(() => import('@/pages/Dashboard'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

/**
 * @router AppRouter
 * @summary Main application routing configuration with lazy loading
 * and hierarchical layouts.
 * @type router-configuration
 * @category navigation
 *
 * @features
 * - Lazy loading of pages for optimization
 * - Hierarchical layouts for consistent structure
 * - Loading states for better UX
 * - Protected route authentication
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <DashboardPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

/**
 * @component AppRouter
 * @summary Router provider component that wraps the entire application
 * with routing capabilities.
 */
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
