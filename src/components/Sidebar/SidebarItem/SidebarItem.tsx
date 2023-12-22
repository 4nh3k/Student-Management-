/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// MenuItem.tsx
import { NavLink } from 'react-router-dom';
import arrowRight from 'src/assets/icons/arrow-right.svg';

interface MenuItemProps {
  iconSrc: string;
  label: string;
  to?: string;
  isDropdown: boolean;
}

export function SidebarItem({
  iconSrc,
  label,
  to,
  isDropdown = false
}: MenuItemProps) {
  return (
    <NavLink
      to={`/${to === '' || to ? to : label.toLowerCase()}`}
      className={({ isActive }) =>
        `menu-item mx-0 flex items-center justify-center gap-2 rounded-lg px-2 py-3 hover:bg-gray-50 lg:w-40 lg:justify-start lg:px-2 ${
          isActive ? 'bg-gray-50' : ''
        }`
      }
    >
      <div className='flex w-full items-center justify-between align-middle'>
        <div className='flex space-x-3'>
          <img
            alt='menu-icon'
            src={iconSrc}
            className='h-6 w-6 md:h-4 md:w-4'
          />
          <span className='letter-spacing hidden text-xs font-medium lg:block'>
            {label}
          </span>
        </div>
        {isDropdown && (
          <img src={arrowRight} alt='dropdown' className=' h-[1rem] w-[1rem]' />
        )}
      </div>
    </NavLink>
  );
}

export default SidebarItem;
