import React from 'react';
import Pagination from 'src/components/Pagination';
import { useState } from 'react';
import Table from 'src/components/Table';
import {
  Button,
  Label,
  Select,
  TextInput,
  Datepicker,
  Dropdown,
  FloatingLabel
} from 'flowbite-react';

const CourseManagement = () => {
  const [totalPage, setTotalPage] = useState(50);
  const [pageRange, setPageRange] = useState(5);
  const onPageChange = (page: number) => setCurrentPage(page);
  const courseMajor = ['KTPM', 'KHMT', 'ATTT', 'MMT&TT'];

  const headers = [
    { title: 'Mã môn học', dataIndex: 'courseID' },
    { title: 'Tên môn học', dataIndex: 'courseName' },
    { title: 'Giảng viên', dataIndex: 'lecturerName' },
    { title: 'Thuộc khoa', dataIndex: 'className' },
    { title: 'Ngày bắt đầu', dataIndex: 'startDate' },
    { title: 'Ngày kết thúc', dataIndex: 'endDate' },
    { title: 'Số tín chỉ LT', dataIndex: 'creditLT' },
    { title: 'Số tín chỉ TH', dataIndex: 'creditTH' }
  ];

  const data = [
    {
      courseID: 'IT008.M12',
      courseName: 'Cấu trúc dữ liệu và máy tính',
      lecturerName: 'Nguyễn Văn A',
      className: 'CNPM',
      startDate: '29/12/2023',
      endDate: '6/3/2024',
      creditLT: 3,
      creditTH: 1
    },
    {
      courseID: 'IT008.M12',
      courseName: 'Cấu trúc dữ liệu và máy tính',
      lecturerName: 'Nguyễn Văn A',
      className: 'CNPM',
      startDate: '29/12/2023',
      endDate: '6/3/2024',
      creditLT: 3,
      creditTH: 1
    },
    {
      courseID: 'IT008.M12',
      courseName: 'Cấu trúc dữ liệu và máy tính',
      lecturerName: 'Nguyễn Văn A',
      className: 'CNPM',
      startDate: '29/12/2023',
      endDate: '6/3/2024',
      creditLT: 3,
      creditTH: 1
    },
    {
      courseID: 'IT008.M12',
      courseName: 'Cấu trúc dữ liệu và máy tính',
      lecturerName: 'Nguyễn Văn A',
      className: 'CNPM',
      startDate: '29/12/2023',
      endDate: '6/3/2024',
      creditLT: 3,
      creditTH: 1
    },
    {
      courseID: 'IT008.M12',
      courseName: 'Cấu trúc dữ liệu và máy tính',
      lecturerName: 'Nguyễn Văn A',
      className: 'CNPM',
      startDate: '29/12/2023',
      endDate: '6/3/2024',
      creditLT: 3,
      creditTH: 1
    }
  ];

  const [search, setSearchVal] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };
  const handleSelectedValueChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div>
      <div
        id='student-course-container'
        className='w-full bg-white p-5 shadow-lg'
      >
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
          pageSize={pageSize}
          filters={{ [selectedValue]: search }}
        />
      </div>
      <div
        id='add-course-container'
        className='mt-10 w-full bg-white p-5 shadow-lg'
      >
        <div className='mt-4 grid grid-cols-3 gap-8'>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='courseID' value='Mã môn học' />
            </div>
            <TextInput
              id='courseID'
              type='text'
              placeholder='Nhập mã môn học'
              required
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='courseName' value='Tên môn học' />
            </div>
            <TextInput
              id='courseName'
              type='text'
              placeholder='Nhập tên môn học'
              required
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='lecturerName' value='Tên giảng viên' />
            </div>
            <TextInput
              id='lecturerName'
              type='text'
              placeholder='Nhập tên giảng viên'
              required
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='major' value='Khoa' />
            </div>
            <Select id='gender' required>
              <option>MMT&TT</option>
              <option>ATTT</option>
              <option>KTPM</option>
              <option>KTTT</option>
            </Select>
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='department' value='Ngày bắt đầu học' />
            </div>
            <Datepicker></Datepicker>
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='department' value='Ngày kết thúc' />
            </div>
            <Datepicker></Datepicker>
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='creditLT' value='Số tín chỉ LT' />
            </div>
            <TextInput
              id='creditLT'
              type='number'
              placeholder='Nhập số tín chỉ LT'
              required
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='creditTH' value='Số tín chỉ TH' />
            </div>
            <TextInput
              id='creditTH'
              type='number'
              placeholder='Nhập số tín chỉ TH'
              required
            />
          </div>
        </div>
        <div className='mt-4'>
          <Button type='submit' color='failure'>
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;

function setCurrentPage(page: number) {
  throw new Error('Function not implemented.');
}
