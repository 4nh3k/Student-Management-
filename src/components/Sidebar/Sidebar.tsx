import logo from 'src/assets/icons/UITLogo.svg';
('use client');
import { Sidebar } from 'flowbite-react';

interface SidebarProp {
  isAdmin: boolean;
}

export default function SidebarComponent() {
  return (
    <Sidebar
      className='fixed bottom-0 left-0 top-0 w-24 bg-sidebar shadow lg:w-60 '
      aria-label='Sidebar with multi-level dropdown example'
    >
      <div className='flex w-full items-center space-x-3 pb-2 pt-2 align-middle text-[1.125rem] font-semibold'>
        <img src={logo} alt='logo' className='ml-3 h-[1.5rem] w-[1.5rem]' />
        <span>Quản lý sinh viên</span>
      </div>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href='#'>Bảng điều khiển</Sidebar.Item>
          <Sidebar.Collapse label='Sinh viên'>
            <Sidebar.Item href='/all-students'>Toàn bộ sinh viên</Sidebar.Item>{' '}
            {/* Quản lý tiến độ*/}
            <Sidebar.Item href='/add-student'>Thêm sinh viên</Sidebar.Item>
            <Sidebar.Item href='/student-paper'>Giấy tờ sinh viên</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse label='Giảng viên'>
            <Sidebar.Item href='/all-lecturer'>Toàn bộ giảng viên</Sidebar.Item>
            <Sidebar.Item href='/add-lecturer'>Thêm giảng viên</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse label='Học phí'>
            <Sidebar.Item href='/fee-list'>Danh sách học phí</Sidebar.Item>
            <Sidebar.Item href='/add-fee'>Thêm học phí</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse label='Học tập'>
            <Sidebar.Item href='/course-management'>
              Quản lý học phần
            </Sidebar.Item>
            <Sidebar.Item href='/timetable-management'>
              Quản lý lịch học
            </Sidebar.Item>
            <Sidebar.Item href='/exam-schedule-management'>
              Quản lý lịch thi
            </Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
