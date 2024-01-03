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

const StudentTestSchedule = () => {
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

  const midEndTermValues = [
    { data: 'Giữa kỳ', dataIndex: 'midTerm' },
    { data: 'Cuối kỳ', dataIndex: 'endTerm' }
  ];

  const firstSecondTermValues = [
    { data: 'Học kỳ 1', dataIndex: 'firstSemester' },
    { data: 'Học kỳ 2', dataIndex: 'secondSemester' }
  ];

  const [selectedMidEndTermValue, setSelectedMidEndTermValue] =
    useState<string>('');
  const [selectedFirstSecondTermValue, setSelectedFirstSecondTermValue] =
    useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);

  const handleSelectedMidEndTermValue = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMidEndTermValue(e.target.value);
  };

  const handleSelectedFirstSecondTermValue = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedFirstSecondTermValue(e.target.value);
  };

  return (
    <div>
      <div
        id='student-course-container'
        className='w-full bg-white p-5 shadow-lg'
      >
        <div id='input-row' className=' flex items-center'>
          <div className='flex space-x-10'>
            <div className='space-y-2'>
              <Label>Kỳ thi GK/CK</Label>
              <Select
                id='filter'
                value={selectedMidEndTermValue}
                onChange={handleSelectedMidEndTermValue}
                required
              >
                {midEndTermValues.map(values => {
                  return (
                    <option key={values.dataIndex} value={values.dataIndex}>
                      {values.data}
                    </option>
                  );
                })}
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Học kỳ</Label>
              <Select
                id='filter'
                value={selectedFirstSecondTermValue}
                onChange={handleSelectedFirstSecondTermValue}
                required
              >
                {firstSecondTermValues.map(values => {
                  return (
                    <option key={values.dataIndex} value={values.dataIndex}>
                      {values.data}
                    </option>
                  );
                })}
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Năm học</Label>
              <Select
                id='filter'
                value={selectedFirstSecondTermValue}
                onChange={handleSelectedFirstSecondTermValue}
                required
              >
                <option key={'year'} value={'2022-2023'}>
                  {'2022-2023'}
                </option>
                <option key={'year'} value={'2023-2024'}>
                  {'2023-2024'}
                </option>
              </Select>
            </div>
          </div>
        </div>

        <Button className='my-5 bg-sidebar'>Xem</Button>

        <Table
          headers={headers}
          data={data}
          className='border-input mt-2 border-2'
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default StudentTestSchedule;

function setCurrentPage(page: number) {
  throw new Error('Function not implemented.');
}
