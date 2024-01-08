import { Sidebar } from 'flowbite-react';
import React from 'react';
import {
  PiBookOpen,
  PiBooks,
  PiChalkboardTeacher,
  PiChartPieSlice,
  PiClipboardText,
  PiFiles,
  PiMagnifyingGlass,
  PiMoney,
  PiStudent,
  PiDotsNine
} from 'react-icons/pi';
import { useLocation } from 'react-router-dom';
import logo from 'src/assets/icons/UITLogo.svg';
import path from 'src/constants/path';
('use client');

interface SidebarProp {
  isAdmin: boolean;
}

export default function SidebarComponent({ isAdmin }: SidebarProp) {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);
  const getIsOpen = (tab: string) => {
    return location.pathname.includes(tab);
  };
  const getIsActive = (link: string) => {
    return location.pathname === link;
  };

  return (
    <>
      {isAdmin && (
        <Sidebar
          collapsed={collapsed}
          aria-label='Sidebar with multi-level dropdown example'
        >
          {/* <div className='mb-2 flex items-center'>
        <button
          className='flex h-[40px] w-[40px] items-center justify-center rounded-md hover:bg-gray-100'
          onClick={() => setCollapsed(!collapsed)}
        >
          <PiList size={20} />
        </button>
        <img hidden={collapsed} src={logo} alt='logo' className='ml-2 h-10' />
        <span hidden={collapsed} className='ml-3 text-lg font-semibold'>
          QLSV
        </span>
      </div> */}
          <Sidebar.Logo href={path.dashboard} img={logo} imgAlt='uit logo'>
            Quản lý sinh viên
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href={path.dashboard}
                active={getIsActive(path.dashboard)}
                icon={PiChartPieSlice}
              >
                Bảng điều khiển
              </Sidebar.Item>
              <Sidebar.Collapse
                label='Sinh viên'
                icon={PiStudent}
                open={getIsOpen('student')}
              >
                <Sidebar.Item
                  href={path.all_students}
                  active={getIsActive(path.all_students)}
                >
                  Toàn bộ sinh viên
                </Sidebar.Item>{' '}
                {/* Quản lý tiến độ*/} {/* Giấy tờ sinh viên */}
                <Sidebar.Item
                  href={path.add_student}
                  active={getIsActive(path.add_student)}
                >
                  Thêm sinh viên
                </Sidebar.Item>
                <Sidebar.Item
                  href={path.student_file_management}
                  active={getIsActive(path.student_file_management)}
                >
                  Quản lý hồ sơ sinh viên
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse
                label='Giảng viên'
                icon={PiChalkboardTeacher}
                open={getIsOpen('lecturer')}
              >
                <Sidebar.Item
                  href={path.all_lecturers}
                  active={getIsActive(path.all_lecturers)}
                >
                  Toàn bộ giảng viên
                </Sidebar.Item>
                <Sidebar.Item
                  href={path.add_lecturer}
                  active={getIsActive(path.add_lecturer)}
                >
                  Thêm giảng viên
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse
                label='Học phí'
                icon={PiMoney}
                open={getIsOpen('fee')}
              >
                <Sidebar.Item
                  href={path.fee_list}
                  active={getIsActive(path.fee_list)}
                >
                  Danh sách học phí
                </Sidebar.Item>
                <Sidebar.Item
                  href={path.add_fee}
                  active={getIsActive(path.add_fee)}
                >
                  Thêm học phí
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse
                label='Học phần'
                open={getIsOpen('courses')}
                icon={PiBooks}
              >
                <Sidebar.Item
                  href={path.course_management}
                  active={getIsActive(path.course_management)}
                >
                  Tất cả học phần
                </Sidebar.Item>
                <Sidebar.Item
                  href={path.add_course_form}
                  active={getIsActive(path.add_course_form)}
                >
                  Thêm học phần
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse
                label='Học tập'
                icon={PiDotsNine}
                open={getIsOpen('management')}
              >
                <Sidebar.Item
                  href={path.timetable_management}
                  active={getIsActive(path.timetable_management)}
                >
                  Quản lý lịch học
                </Sidebar.Item>
                <Sidebar.Item
                  href={path.exam_schedule_management}
                  active={getIsActive(path.exam_schedule_management)}
                >
                  Quản lý lịch thi
                </Sidebar.Item>
                <Sidebar.Item
                  href={path.student_result_management}
                  active={getIsActive(path.student_result_management)}
                >
                  Quản lý KQ học tập
                </Sidebar.Item>
                <Sidebar.Item
                  href={path.student_conduct_points_management}
                  active={getIsActive(path.student_conduct_points_management)}
                >
                  Quản lý KQ rèn luyện
                </Sidebar.Item>
                {/* <Sidebar.Item
                  href={path.student_reward_management}
                  active={getIsActive(path.student_reward_management)}
                >
                  Quản lý khen thưởng
                </Sidebar.Item> */}
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}

      {/*student sidebar*/}
      {!isAdmin && (
        <Sidebar
          collapsed={collapsed}
          aria-label='Sidebar with multi-level dropdown example'
        >
          <Sidebar.Logo
            href={path.student_dashboard}
            img={logo}
            imgAlt='uit logo'
          >
            Sinh viên
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href={path.student_dashboard}
                active={getIsActive(path.student_dashboard)}
                icon={PiChartPieSlice}
              >
                Bảng điều khiển
              </Sidebar.Item>
              <Sidebar.Item icon={PiFiles}>Hồ sơ sinh viên</Sidebar.Item>
              <Sidebar.Collapse
                label='Học phần'
                icon={PiBookOpen}
                open={getIsOpen('course')}
              >
                <Sidebar.Item
                  href={path.course_registration}
                  active={getIsActive(path.course_registration)}
                >
                  Đăng ký học phần
                </Sidebar.Item>
                <Sidebar.Item
                  href={path.course_registered}
                  active={getIsActive(path.course_registered)}
                >
                  Danh sách đã đăng ký
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse label='Tra cứu' icon={PiMagnifyingGlass}>
                <Sidebar.Item href={path.student_transcript}>
                  Kết quả học tập
                </Sidebar.Item>
                <Sidebar.Item href={path.student_fee_info}>
                  Thông tin học phí
                </Sidebar.Item>
                <Sidebar.Item href={path.student_schedule}>
                  Thời khóa biểu
                </Sidebar.Item>
                <Sidebar.Item href={path.student_test_schedule}>
                  Lịch thi
                </Sidebar.Item>
                <Sidebar.Item href={path.student_conduct_points}>
                  Điểm rèn luyện
                </Sidebar.Item>
              </Sidebar.Collapse>
              {/* <Sidebar.Collapse label='Đăng ký dịch vụ' icon={PiClipboardText}>
                <Sidebar.Item>Đăng ký xét tốt nghiệp</Sidebar.Item>
              </Sidebar.Collapse> */}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
    </>
  );
}
