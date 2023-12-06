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
  const routeElement = useRoutes([
    {
      element: <RejectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: AuthRouteChildren
        }
      ]
    },
    // Main Layout
    {
      element: <ProtectedRoute />,
      children: [{}]
    }
    // Handle Not Found page
    // {
    //   element: <NotFound />,
    //   path: path.all
    // }
  ]);

  return routeElement;
}
