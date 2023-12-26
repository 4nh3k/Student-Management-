import React from 'react';

const TextArea = () => {
  return (
    <textarea
      className='bg-input focus:border-primary border-1 border-textboxBorder mt-1 w-72 rounded px-3 py-1 text-sm focus:border-2 focus:outline-none'
      id='book-order-list'
      rows={6}
      cols={50}
    />
  );
};

export default TextArea;
