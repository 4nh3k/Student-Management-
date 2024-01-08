import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Button, Label, Select } from 'flowbite-react';
import { semesterApi } from 'src/apis/semester.api';
import { testScheduleApi } from 'src/apis/test-schedule.api';
import LoadingIndicator from 'src/components/LoadingIndicator';
import Table from 'src/components/Table';
import { Semester } from 'src/types/semester.type';
import { isoStringToDdMmYyyy } from 'src/utils/utils';

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

  const midEndTermValues = [
    { data: 'Giữa kỳ', dataIndex: 'midTerm' },
    { data: 'Cuối kỳ', dataIndex: 'endTerm' }
  ];

  const firstSecondTermValues = [
    { data: 'Học kỳ 1', value: 'kỳ 1' },
    { data: 'Học kỳ 2', value: 'kỳ 2' },
    { data: 'Học kỳ hè', value: 'kỳ hè' }
  ];
  const { data: semesterData, isLoading: isLoadingSemesterData } = useQuery({
    queryKey: ['semester'],
    queryFn: ({ signal }) => semesterApi.getAllSemester(0, 10000, signal),
    select: data => {
      const semester: Semester[] = data.data.result;
      console.log(semester);
      return semester;
    }
  });
  // wait api to load by semester
  const { data: testScheduleData, isLoading: isLoadingSchedule } = useQuery({
    queryKey: ['testSchedules'],
    queryFn: () => testScheduleApi.getAllTestSchedule(0, 1000),
    select: data => {
      console.log(data);
      return data.data.result.map(testSchedule => {
        return {
          examID: testSchedule.maBuoiThi,
          courseID: testSchedule.maHocPhan,
          examDate: isoStringToDdMmYyyy(testSchedule.ngayThi),
          roomID: testSchedule.maPhongThi,
          examWeekday: testSchedule.thuThi,
          examPhase: testSchedule.caThi,
          note: testSchedule.ghiChu
        };
      });
    }
  });
  const [selectedFirstSecondTermValue, setSelectedFirstSecondTermValue] =
    useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);

  const handleSelectedFirstSecondTermValue = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedFirstSecondTermValue(e.target.value);
  };
  if (isLoadingSchedule) return <LoadingIndicator />;
  return (
    <div>
      <div
        id='student-course-container'
        className='w-full bg-white p-5 shadow-lg'
      >
        <div id='input-row' className='flex items-end space-x-4'>
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
            <Select id='filter' required>
              {semesterData
                ?.filter(
                  (item, index, self) =>
                    self.findIndex(s => s.tenNamHoc === item.tenNamHoc) ===
                    index
                )
                .map(item => {
                  return (
                    <option key={item.tenNamHoc} value={item.tenNamHoc}>
                      {item.tenNamHoc}
                    </option>
                  );
                })}
            </Select>
          </div>
          <Button color='failure'>Xem</Button>
        </div>
        <Table
          headers={headers}
          data={testScheduleData}
          className='border-input mt-4 border-2'
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
