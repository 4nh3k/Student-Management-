import React from 'react';
import DateIcon from 'src/assets/icons/date.svg';
const DateTimeInput = () => {
  return (
    <div className='flex w-60 items-center space-x-5 bg-input p-2 align-middle'>
      <input
        type='text'
        placeholder='Tìm kiếm...'
        className='overflow-hidden bg-input focus:outline-none'
      ></input>
      <img src={DateIcon} width={30} height={30} alt='search icon'></img>
    </div>
  );
};

export default DateTimeInput;
