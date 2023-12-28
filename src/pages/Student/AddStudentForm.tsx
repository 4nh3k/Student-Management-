import React from 'react';
import { Breadcrumb, FloatingLabel } from 'flowbite-react';
import Pagination from 'src/components/Pagination';
import Breadcrumbs from 'src/components/Breadcrumb/Breadcrumb';
import Header from 'src/components/Header/Header';
import { Spinner } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';
import { Button } from 'flowbite-react';
import Table from 'src/components/Table';
import { useState } from 'react';
import { Datepicker } from 'flowbite-react';


const AddStudentForm = () => {
  return (
    <div className='items-center'>
      <Header></Header>
      <div id='main-body' className='space-y-5 p-10'>
        <Breadcrumbs></Breadcrumbs>
        <div
          id='student-table-container'
          className='w-full bg-white p-5 shadow-lg'
        >
          <h1>Thêm sinh viên mới</h1>
          <div className='grid grid-cols-4'>
            <FloatingLabel variant='filled' label='Tên' />
            <Dropdown
              className='text-xl font-bold'
              label='Chọn khoa'
              dismissOnClick={true}
              inline
            >
              <Dropdown.Item key={'male'}>{'Nam'}</Dropdown.Item>
              <Dropdown.Item key={'female'}>{'Nữ'}</Dropdown.Item>
            </Dropdown>
            <Datepicker placeholder='Chọn ngày sinh'></Datepicker>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentForm;
