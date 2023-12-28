import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import path from 'src/constants/path';

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
    { path: path.fee_list, breadcrumb: 'Danh sách học phí'},
    { path: path.add_fee, breadcrumb: 'Thêm thông tin học phí'},
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
