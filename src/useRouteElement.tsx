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
import Input from './components/Input';
import Dropdown from './components/Dropdown/Dropdown';
import CircleIcon from './components/CircleIcon/CircleIcon';
import Logo from 'src/assets/icons/UITLogo.svg';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import DateTimeInput from './components/DatetimeInput/DatetimeInput';
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
    { title: 'Current Page' }
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
      element: <CircleIcon src={Logo} size={128} ></CircleIcon>,
      path: '/dropdown'
    },
    {
      element: <Header></Header>,
      path: '/header'
    },
    {
      element: <SearchBar></SearchBar>,
      path: '/search'
    },
    {
      element: <DateTimeInput></DateTimeInput>,
      path: '/date'
    },
    {
      element: <Login></Login>,
      path: '/login'
    },
  ]);

  return routeElement;
}
