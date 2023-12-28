import { Outlet } from 'react-router-dom';
import Header from 'src/components/Header/Header';
import SidebarComponent from 'src/components/Sidebar/Sidebar';

export default function MainLayout() {
  return (
    <div className='h-screen w-screen overflow-y-hidden'>
      <SidebarComponent />
      <div className='ml-auto h-screen w-[calc(100%-6rem)] overflow-y-auto bg-gray-100 lg:w-[calc(100%-15rem)]'>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
