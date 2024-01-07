import { useMutation } from '@tanstack/react-query';
import { Avatar, Dropdown } from 'flowbite-react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from 'src/apis/auth.api';
import Breadcrumbs from 'src/components/Breadcrumb';
import SidebarComponent from 'src/components/Sidebar';
import { useAppContext } from 'src/contexts/app.contexts';
import { setAccessTokenToLS, setProfileToLS } from './../../utils/auth';

interface MainLayoutProps {
  isAdmin?: boolean;
}

export default function MainLayout({ isAdmin = false }: MainLayoutProps) {
  const { setIsAuthenticated } = useAppContext();

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setAccessTokenToLS('');
      setProfileToLS('');
      setIsAuthenticated(false);
      toast.success('Đăng xuất thành công');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau');
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <div className='flex h-screen w-screen overflow-y-hidden'>
      <div className='z-10 h-screen lg:z-0 '>
        <SidebarComponent isAdmin={isAdmin} />
      </div>
      <div className='ml-auto min-h-screen w-full overflow-y-auto bg-gray-100'>
        {/* <Header /> */}
        <div id='main-body' className='space-y-5 px-10 pb-10 pt-5'>
          <div className='flex items-end'>
            <Breadcrumbs />
            <div className='ml-auto'>
              <Dropdown
                label={
                  <Avatar
                    img='https://ui-avatars.com/api/?background=0D8ABC&color=fff'
                    rounded
                  />
                }
                inline
              >
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
