import { Avatar, Dropdown } from 'flowbite-react';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from 'src/components/Breadcrumb';
import SidebarComponent from 'src/components/Sidebar';

export default function MainLayout() {
  return (
    <div className='flex h-screen w-screen overflow-y-hidden'>
      <div className='z-10 h-screen lg:z-0 '>
        <SidebarComponent />
      </div>
      <div className='ml-auto min-h-screen w-full overflow-y-auto bg-gray-100 '>
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
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
