import React, { useState } from 'react';
import { Select, TextInput } from 'flowbite-react';
import Table from 'src/components/Table';

const FeeList = () => {

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
      paidStatus: 'Đã trả'
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Giới tính',
      class: 'KTPM2021',
      fee: '16,000,000đ',
      moneyPaid: '17,000,000đ',
      remainer: '1,000,000đ',
      paidStatus: 'Đã trả'
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Giới tính',
      class: 'KTPM2021',
      fee: '16,000,000đ',
      moneyPaid: '17,000,000đ',
      remainer: '1,000,000đ',
      paidStatus: 'Đã trả'
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Giới tính',
      class: 'KTPM2021',
      fee: '16,000,000đ',
      moneyPaid: '17,000,000đ',
      remainer: '1,000,000đ',
      paidStatus: 'Đã trả'
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Giới tính',
      class: 'KTPM2021',
      fee: '16,000,000đ',
      moneyPaid: '17,000,000đ',
      remainer: '1,000,000đ',
      paidStatus: 'Đã trả'
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Giới tính',
      class: 'KTPM2021',
      fee: '16,000,000đ',
      moneyPaid: '17,000,000đ',
      remainer: '1,000,000đ',
      paidStatus: 'Đã trả'
    }
  ];

  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearchVal] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };
  const handleSelectedValueChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div id='student-table-container' className='w-full bg-white p-5 shadow-lg'>
      <div id='input-row' className='flex items-center'>
        <div className='w-96'>
          <TextInput
            placeholder='Tìm kiếm...'
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className='ml-4'>
          <Select
            id='filter'
            value={selectedValue}
            onChange={handleSelectedValueChange}
            required
          >
            {headers.map(header => {
              return (
                <option key={header.dataIndex} value={header.dataIndex}>
                  {header.title}
                </option>
              );
            })}
          </Select>
        </div>
        <div className='ml-auto flex items-center'>
          <span className='mr-2 text-gray-500'>Hiển thị</span>
          <Select
            id='pageSize'
            value={pageSize}
            onChange={e => setPageSize(+e.target.value)}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </Select>
          <span className='ml-2 text-gray-500'>kết quả</span>
        </div>
      </div>

      <Table
        headers={headers}
        data={data}
        className='border-input mt-2 border-2'
        filters={{ [selectedValue]: search }}
        pageSize={pageSize}
      />
    </div>
  );
};

export default FeeList;

function setCurrentPage(page: number) {
  throw new Error('Function not implemented.');
}
