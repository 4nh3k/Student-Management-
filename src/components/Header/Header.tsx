import React from 'react';
import CircleIcon from '../CircleIcon/CircleIcon';
import Logo from 'src/assets/icons/UITLogo.svg';

const Header = user_img => {
  return (
    <div className='flex items-center justify-end bg-white pb-4 pr-2 pt-4 align-middle shadow-lg'>
      <CircleIcon src={Logo} size={32}></CircleIcon>
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M7.41 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984L7.41 8.58984Z'
          fill='black'
        />
      </svg>
    </div>
  );
};

export default Header;
