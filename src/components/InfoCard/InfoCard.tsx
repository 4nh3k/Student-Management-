import React from 'react';
import PropTypes from 'prop-types';
import CircleIcon from '../CircleIcon/CircleIcon';

const InfoCard = ({ icon_src, label, value }) => {
  return (
    <div className='w-64 flex items-center space-x-5 divide-x-2 rounded-sm bg-white p-5 align-middle shadow-lg'>
      <CircleIcon src={icon_src} size={24}></CircleIcon>
      <div className='flex flex-col pl-5'>
        <span className='text-sm text-gray-500'>{label}</span>
        <span className='text-xl font-bold'>{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
