import React from 'react';
import { Button, Dropdown, FloatingLabel } from 'flowbite-react';
import Pagination from 'src/components/Pagination';

import { useState } from 'react';
import Table from 'src/components/Table';
import Chip from 'src/components/Chip/Chip';

const FeeList = () => {
  const [totalPage, setTotalPage] = useState(50);
  const [pageRange, setPageRange] = useState(5);
  const onPageChange = (page: number) => setCurrentPage(page);
  const courseMajor = ['KTPM', 'KHMT', 'ATTT', 'MMT&TT'];

  const headers = [
    { title: 'Mã số sinh viên', dataIndex: 'studentID' },
    { title: 'Tên', dataIndex: 'studentName' },
    { title: 'Giới tính', dataIndex: 'gender' },
    { title: 'Lớp', dataIndex: 'class' },
    { title: 'Học phí', dataIndex: 'fee' },
    { title: 'Đã trả', dataIndex: 'moneyPaid' },
    { title: 'Còn dư', dataIndex: 'remainer' },
    { title: 'Tình trạng', dataIndex: 'paidStatus' }
  ];

  const data = [
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Giới tính',
      class: 'KTPM2021',
      fee: '16,000,000đ',
      moneyPaid: '17,000,000đ',
      remainer: '1,000,000đ',
      paidStatus: <Chip type={'paid'} value={'Đã trả'}></Chip>
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Giới tính',
      class: 'KTPM2021',
      fee: '16,000,000đ',
      moneyPaid: '17,000,000đ',
      remainer: '1,000,000đ',
      paidStatus: <Chip type={'paid'} value={'Đã trả'}></Chip>
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Giới tính',
      class: 'KTPM2021',
      fee: '16,000,000đ',
      moneyPaid: '17,000,000đ',
      remainer: '1,000,000đ',
      paidStatus: <Chip type={'paid'} value={'Đã trả'}></Chip>
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Giới tính',
      class: 'KTPM2021',
      fee: '16,000,000đ',
      moneyPaid: '17,000,000đ',
      remainer: '1,000,000đ',
      paidStatus: <Chip type={'paid'} value={'Đã trả'}></Chip>
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Giới tính',
      class: 'KTPM2021',
      fee: '16,000,000đ',
      moneyPaid: '17,000,000đ',
      remainer: '1,000,000đ',
      paidStatus: <Chip type={'paid'} value={'Đã trả'}></Chip>
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Giới tính',
      class: 'KTPM2021',
      fee: '16,000,000đ',
      moneyPaid: '17,000,000đ',
      remainer: '1,000,000đ',
      paidStatus: <Chip type={'paid'} value={'Đã trả'}></Chip>
    }
  ];

  return (
    <div id='student-table-container' className='w-full bg-white p-5 shadow-lg'>
      <div
        id='input-row'
        className='flex items-center justify-between align-middle'
      >
        <div className='w-96'>
          <FloatingLabel className='' variant='outlined' label='Tìm bằng tên' />
        </div>
        <Dropdown
          className=' font-bold'
          label='Chọn lớp'
          dismissOnClick={true}
          inline
        >
          {courseMajor.map(major => (
            <Dropdown.Item key={major}>{major}</Dropdown.Item>
          ))}
        </Dropdown>

        <Dropdown
          className=' font-bold'
          label='Chọn tình trạng học phí'
          dismissOnClick={true}
          inline
        >
          <Dropdown.Item>Đã trả</Dropdown.Item>
          <Dropdown.Item>Chưa trả</Dropdown.Item>
        </Dropdown>
      </div>
      <Table
        headers={headers}
        data={data}
        className='border-input mt-2 border-2'
      />
      <Pagination
        className='mt-5 flex justify-end'
        pageCount={50}
        pageRangeDisplayed={5}
        onPageChange={(data: { selected: number }) => {}}
      />
    </div>
  );
};

export default FeeList;

function setCurrentPage(page: number) {
  throw new Error('Function not implemented.');
}
