import { NavLink } from 'react-router-dom';
import React from 'react';

import useBreadcrumbs from 'use-react-router-breadcrumbs';

const Breadcrumbs = ({ separator = '>' }) => {
  const breadcrumbs = useBreadcrumbs();
  const separatorSpan = <span key='separator'> {separator} </span>;
  const lastBreadcrumbIndex = breadcrumbs.length - 1;
  return (
    <div className='small'>
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
