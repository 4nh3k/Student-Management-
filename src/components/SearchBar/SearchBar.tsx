import React from 'react';
import SearchIcon from 'src/assets/icons/search.svg';
const SearchBar = () => {
  return (
    <div className='flex w-60 items-center space-x-5 bg-input p-2 align-middle'>
      <img src={SearchIcon} width={32} height={32} alt='search icon'></img>
      <input
        type='text'
        placeholder='Tìm kiếm...'
        className='overflow-hidden bg-input focus:outline-none'
      ></input>
    </div>
  );
};

export default SearchBar;
