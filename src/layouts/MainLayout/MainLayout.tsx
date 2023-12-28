import { Outlet } from 'react-router-dom';
import Breadcrumbs from 'src/components/Breadcrumb';
import Header from 'src/components/Header';
import SidebarComponent from 'src/components/Sidebar';

export default function MainLayout() {
  return (
    <div className='h-screen w-screen overflow-y-hidden'>
      <SidebarComponent />
      <div className='ml-auto h-screen w-[calc(100%-6rem)] overflow-y-auto bg-gray-100 lg:w-[calc(100%-15rem)]'>
        <Header />
        <div id='main-body' className='space-y-5 p-10'>
          <Breadcrumbs />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
