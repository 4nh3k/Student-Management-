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

const ExamScheduleManagement = () => {
  const [totalPage, setTotalPage] = useState(50);
  const [pageRange, setPageRange] = useState(5);
  const onPageChange = (page: number) => setCurrentPage(page);
  const courseMajor = ['KTPM', 'KHMT', 'ATTT', 'MMT&TT'];

  const headers = [
    { title: 'Mã lịch thi', dataIndex: 'examID' },
    { title: 'Mã môn học', dataIndex: 'courseID' },
    { title: 'Ngày thi', dataIndex: 'examDate' },
    { title: 'Phòng thi', dataIndex: 'roomID' },
    { title: 'Ca thi', dataIndex: 'examPhase' },
    { title: 'Thứ thi', dataIndex: 'examWeekday' },
    { title: 'Ghi chú', dataIndex: 'note' }
  ];

  const data = [
    {
      examID: 1,
      courseID: 'SE121.O11',
      examDate: '04/01/2024',
      roomID: 'E7.06',
      examPhase: 1,
      examWeekday: 5,
      note: 'A'
    },
    {
      examID: 2,
      courseID: 'SE121.O11',
      examDate: '04/01/2024',
      roomID: 'E7.06',
      examPhase: 2,
      examWeekday: 5,
      note: 'B'
    },
    {
      examID: 3,
      courseID: 'SE121.O11',
      examDate: '04/01/2024',
      roomID: 'E7.06',
      examPhase: 3,
      examWeekday: 5,
      note: 'C'
    },
    {
      examID: 4,
      courseID: 'SE121.O11',
      examDate: '04/01/2024',
      roomID: 'E7.06',
      examPhase: 4,
      examWeekday: 5,
      note: 'D'
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
              <Label htmlFor='examID' value='Mã lịch thi' />
            </div>
            <TextInput
              id='examID'
              type='text'
              placeholder='Nhập mã lịch thi'
              required
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='courseName' value='Mã môn học' />
            </div>
            <TextInput
              id='courseName'
              type='text'
              placeholder='Nhập mã môn học'
              required
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='examDate' value='Ngày thi' />
            </div>
            <Datepicker></Datepicker>
          </div>

          <div>
            <div className='mb-2 block'>
              <Label htmlFor='roomID' value='Phòng thi' />
            </div>
            <Select id='roomID' required>
              <option>B.102</option>
              <option>C.113</option>
              <option>B.402</option>
              <option>C.304</option>
            </Select>
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='examPhase' value='Ca thi' />
            </div>
            <Select id='examPhase' required>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </Select>
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='examWeekday' value='Thứ thi' />
            </div>
            <TextInput
              id='examWeekday'
              type='number'
              placeholder=''
              required
              disabled={true}
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='note' value='Ghi chú' />
            </div>
            <TextInput
              id='note'
              type='number'
              placeholder='Nhập ghi chú'
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

export default ExamScheduleManagement;

function setCurrentPage(page: number) {
  throw new Error('Function not implemented.');
}
