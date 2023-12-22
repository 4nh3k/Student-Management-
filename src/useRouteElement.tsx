import {
  Navigate,
  Outlet,
  type RouteObject,
  useRoutes
} from 'react-router-dom';
import path from './constants/path';

import Login from './pages/Login';
import Register from './pages/Register';
import { useAppContext } from './contexts/app.contexts';
import MainLayout from './layouts/MainLayout';
import Button from './components/Button';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';

function ProtectedRoute() {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
  const { isAuthenticated } = useAppContext();
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

const AuthRouteChildren: RouteObject[] = [
  {
    path: path.login,
    element: <Login />
  },
  {
    path: path.register,
    element: <Register />
  }
];

export default function useRouteElement() {
  const pathTestForBreadcrumb = [
    { title: 'Home', link: '/' },
    { title: 'Products', link: '/products' },
    { title: 'Category', link: '/products/category' },
    { title: 'Current Page' },
  ];
  const routeElement = useRoutes([
    // {
    //   element: <RejectedRoute />,
    //   children: [
    //     {
    //       element: <MainLayout />,
    //       children: AuthRouteChildren
    //     }
    //   ]
    // },
    // Main Layout
    // {
    //   element: <ProtectedRoute />,
    //   children: [{}]
    // },
    //Handle Not Found page
    // {
    //   element: <NotFound />,
    //   path: path.all
    // }
    {
      
      element: <Breadcrumb></Breadcrumb>,
      path: '/component'
    },
    {
      
      element: <Breadcrumb></Breadcrumb>,
      path: '/component2/component3'
    }
  ]);
  

  return routeElement;
}
