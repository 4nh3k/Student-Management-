import { NavLink } from 'react-router-dom';
import React from 'react';

import useBreadcrumbs from 'use-react-router-breadcrumbs';

const Breadcrumbs = ({ separator = '>' }) => {
  const routes = [
    { path: '/dashboard', breadcrumb: 'Bảng điều khiển' },
    { path: '/', breadcrumb: 'Trang chủ' },
    { path: '/all-students', breadcrumb: 'Tất cả sinh viên' }
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  const separatorSpan = <span key='separator'> {separator} </span>;
  const lastBreadcrumbIndex = breadcrumbs.length - 1;
  return (
    <div className='text-lg font-bold'>
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
