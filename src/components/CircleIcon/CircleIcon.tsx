import React from 'react';

const CircleIcon = ({  src, size }) => {
  return (
    <img
      alt='icon'
      width={size}
      height={size}
      className='rounded-full'
      src={src}
    ></img>
  );
};

export default CircleIcon;
