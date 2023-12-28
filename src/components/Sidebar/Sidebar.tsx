import { Sidebar } from 'flowbite-react';
import {
  PiBooks,
  PiChalkboardTeacher,
  PiChartPieSlice,
  PiMoney,
  PiStudent
} from 'react-icons/pi';
import { useLocation } from 'react-router-dom';
import logo from 'src/assets/icons/UITLogo.svg';
import path from 'src/constants/path';
('use client');

interface SidebarProp {
  isAdmin: boolean;
}

const getIsOpen = (tab: string, location: string) => {
  return location.includes(tab);
};

export default function SidebarComponent() {
  const location = useLocation();

  return (
    <Sidebar
      className='fixed bottom-0 left-0 top-0 w-24 bg-sidebar shadow-lg lg:w-60 '
      aria-label='Sidebar with multi-level dropdown example'
    >
      <Sidebar.Logo href={path.dashboard} img={logo} imgAlt='uit logo'>
        Quản lý sinh viên
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href={path.dashboard}
            active={path.dashboard === location.pathname}
            icon={PiChartPieSlice}
          >
            Bảng điều khiển
          </Sidebar.Item>
          <Sidebar.Collapse
            label='Sinh viên'
            icon={PiStudent}
            open={getIsOpen('student', location.pathname)}
          >
            <Sidebar.Item
              href={path.all_students}
              active={path.all_students === location.pathname}
            >
              Toàn bộ sinh viên
            </Sidebar.Item>{' '}
            {/* Quản lý tiến độ*/} {/* Giấy tờ sinh viên */}
            <Sidebar.Item
              href={path.add_student}
              active={path.add_student === location.pathname}
            >
              Thêm sinh viên
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            label='Giảng viên'
            icon={PiChalkboardTeacher}
            open={getIsOpen('lecturer', location.pathname)}
          >
            <Sidebar.Item
              href={path.all_lecturers}
              active={path.all_lecturers === location.pathname}
            >
              Toàn bộ giảng viên
            </Sidebar.Item>
            <Sidebar.Item
              href={path.add_lecturer}
              active={path.add_lecturer === location.pathname}
            >
              Thêm giảng viên
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            label='Học phí'
            icon={PiMoney}
            open={getIsOpen('fee', location.pathname)}
          >
            <Sidebar.Item
              href={path.fee_list}
              active={path.fee_list === location.pathname}
            >
              Danh sách học phí
            </Sidebar.Item>
            <Sidebar.Item
              href={path.add_fee}
              active={path.add_fee === location.pathname}
            >
              Thêm học phí
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            label='Học tập'
            icon={PiBooks}
            open={getIsOpen('management', location.pathname)}
          >
            <Sidebar.Item
              href={path.course_management}
              active={path.course_management === location.pathname}
            >
              Quản lý học phần
            </Sidebar.Item>
            <Sidebar.Item
              href={path.timetable_management}
              active={path.timetable_management === location.pathname}
            >
              Quản lý lịch học
            </Sidebar.Item>
            <Sidebar.Item
              href={path.exam_schedule_management}
              active={path.exam_schedule_management === location.pathname}
            >
              Quản lý lịch thi
            </Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
