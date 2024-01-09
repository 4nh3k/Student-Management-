import { NavLink } from 'react-router-dom';
import path from 'src/constants/path';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

interface BreadcrumbProps {
  separator?: string;
}

const Breadcrumbs = ({ separator = '/' }: BreadcrumbProps) => {
  const routes = [
    { path: path.dashboard, breadcrumb: 'Bảng điều khiển' },
    { path: '/', breadcrumb: 'Trang chủ' },
    { path: path.all_students, breadcrumb: 'Toàn bộ sinh viên' },
    { path: path.add_student, breadcrumb: 'Thêm sinh viên' },
    { path: path.all_lecturers, breadcrumb: 'Toàn bộ giảng viên' },
    { path: path.add_lecturer, breadcrumb: 'Thêm giảng viên' },
    { path: path.fee_list, breadcrumb: 'Danh sách học phí' },
    { path: path.add_fee, breadcrumb: 'Thêm thông tin học phí' },
    { path: path.course_management, breadcrumb: 'Quản lý học phần' },
    { path: path.exam_schedule_management, breadcrumb: 'Quản lý lịch thi' },
    { path: path.timetable_management, breadcrumb: 'Quản lý lịch học' },
    { path: path.student_dashboard, breadcrumb: 'Bảng điều khiển' },
    { path: path.course_registration, breadcrumb: 'Đăng ký học phần' },
    { path: path.course_registered, breadcrumb: 'Học phần đã đăng ký' },
    { path: path.student_fee_info, breadcrumb: 'Thông tin học phí' },
    { path: path.student_schedule, breadcrumb: 'Thời khoá biểu' },
    { path: path.student_transcript, breadcrumb: 'Bảng điểm' },
    { path: path.student_test_schedule, breadcrumb: 'Lịch thi' },
    { path: path.student_file_management, breadcrumb: 'Hồ sơ sinh viên' },
    { path: path.add_student_file_form, breadcrumb: 'Thêm hồ sơ sinh viên' },
    {
      path: path.student_conduct_points,
      breadcrumb: 'Điểm rèn luyện sinh viên'
    },
    {
      path: path.student_reward_management,
      breadcrumb: 'Khen thưởng sinh viên'
    },
    {
      path: path.file_management,
      breadcrumb: 'Quản lý hồ sơ sinh viên'
    },
    {
      path: path.add_course_form,
      breadcrumb: 'Thêm học phần'
    },
    {
      path: path.conduct_points_management,
      breadcrumb: 'Quản lý điểm rèn luyện'
    },
    {
      path: path.reward_management,
      breadcrumb: 'Quản lý khen thưởng'
    }
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  const separatorSpan = <span key='separator'> {separator} </span>;
  const lastBreadcrumbIndex = breadcrumbs.length - 1;
  return (
    <div className='text-lg font-semibold'>
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <NavLink key={match.pathname} to={match.pathname}>
          {index > 0 && separatorSpan}
          <span
            className={
              index === lastBreadcrumbIndex ? 'text-primary' : 'text-black'
            }
          >
            {breadcrumb}
          </span>
        </NavLink>
      ))}
    </div>
  );
};

export default Breadcrumbs;
