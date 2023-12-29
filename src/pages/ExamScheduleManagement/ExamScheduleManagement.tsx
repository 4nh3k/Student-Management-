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

  return (
    <div>
      <div
        id='student-course-container'
        className='w-full bg-white p-5 shadow-lg'
      >
        <div
          id='input-row'
          className='flex items-center justify-between align-middle'
        >
          <div className='w-96'>
            <FloatingLabel
              className=''
              variant='outlined'
              label='Tìm bằng tên môn học'
            />
          </div>
          <Dropdown
            className=' font-bold'
            label='Chọn khoa'
            dismissOnClick={true}
            inline
          >
            {courseMajor.map(major => (
              <Dropdown.Item key={major}>{major}</Dropdown.Item>
            ))}
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
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onPageChange={(data: { selected: number }) => {}}
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
