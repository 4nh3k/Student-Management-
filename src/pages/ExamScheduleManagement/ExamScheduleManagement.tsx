import React, { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Button,
  Datepicker,
  Label,
  Modal,
  Select,
  TextInput
} from 'flowbite-react';
import { toast } from 'react-toastify';
import { courseApi } from 'src/apis/course.api';
import { testScheduleApi } from 'src/apis/test-schedule.api';
import ExamSchedule from 'src/components/ExamSchedule/ExamSchedule';
import LoadingIndicator from 'src/components/LoadingIndicator';
import Table from 'src/components/Table';
import useSemester from 'src/hooks/useSemester';
import HocPhan from 'src/types/hoc-phan.type';
import TestSchedule from 'src/types/test-schedule';
import { getWeekday, isoStringToDdMmYyyy } from 'src/utils/utils';

const ExamScheduleManagement = () => {
  const [date, setDate] = useState<Date>(new Date());

  const headers = [
    { title: 'Mã buổi thi', dataIndex: 'maBuoiThi' },
    { title: 'Mã học phần', dataIndex: 'maHocPhan' },
    { title: 'Ngày thi', dataIndex: 'ngayThi' },
    { title: 'Mã phòng thi', dataIndex: 'maPhongThi' },
    { title: 'Thứ thi', dataIndex: 'thuThi' },
    { title: 'Ca thi', dataIndex: 'caThi' },
    { title: 'Ghi chú', dataIndex: 'ghiChu' }
  ];

  const {
    data: getTestScheduleData,
    isLoading: isLoadingSchedule,
    refetch
  } = useQuery({
    queryKey: ['testSchedules'],
    queryFn: () => testScheduleApi.getAllTestSchedule(0, 1000),
    select: data => {
      return data.data.result.map(testSchedule => {
        return {
          maBuoiThi: testSchedule.maBuoiThi,
          maHocPhan: testSchedule.maHocPhan,
          ngayThi: isoStringToDdMmYyyy(testSchedule.ngayThi),
          maPhongThi: testSchedule.maPhongThi,
          thuThi: testSchedule.thuThi,
          caThi: testSchedule.caThi,
          ghiChu: testSchedule.ghiChu
        };
      });
    }
  });

  const createTestScheduleMutation = useMutation({
    mutationFn: (data: Partial<TestSchedule>) =>
      testScheduleApi.createTestSchedule(data),
    onSuccess: () => {
      refetch();
      toast.success('Thêm thành công');
    },
    onError: () => {
      toast.error('Thêm thất bại');
    }
  });

  const { currentSemester, currentSemesterIsLoading } = useSemester();
  const { data: courseData, isLoading } = useQuery({
    queryKey: ['courses', 5],
    queryFn: ({ signal }) =>
      courseApi.getAllCourseDataInASemester(0, 10000, 5, signal),
    select: data => {
      return data.data.result;
    },
    enabled: !!currentSemester?.maHocKyNamHoc
  });

  const [search, setSearchVal] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState<number | undefined>(undefined);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };
  const handleSelectedValueChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
  };
  const handleDateChange = (date: Date) => {
    setDate(date);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      maHocPhan: e.currentTarget['courseName'].value,
      ngayThi: date.toISOString(),
      maPhongThi: e.currentTarget['roomID'].value,
      thuThi: e.currentTarget['examWeekday'].value,
      caThi: e.currentTarget['examPhase'].value,
      ghiChu: e.currentTarget['note'].value
    };
    createTestScheduleMutation.mutate(data);
  };

  const onRowClick = (record: any) => {
    console.log(record);
    setId(record.maBuoiThi);
    setOpenModal(true);
  };

  if (isLoadingSchedule || isLoading || currentSemesterIsLoading)
    return <LoadingIndicator />;

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
        {!isLoadingSchedule && getTestScheduleData && (
          <Table
            headers={headers}
            data={getTestScheduleData}
            className='border-input mt-2 border-2'
            pageSize={pageSize}
            onRowClick={onRowClick}
            filters={{ [selectedValue]: search }}
          />
        )}
      </div>
      <form
        id='add-course-container'
        className='mt-10 w-full bg-white p-5 shadow-lg'
        onSubmit={handleSubmit}
      >
        <div className='mt-4 grid grid-cols-3 gap-8'>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='courseName' value='Mã học phần' />
            </div>
            <Select id='courseName' required>
              {courseData?.map((course: HocPhan) => {
                return (
                  <option key={course.maHocPhan} value={course.maHocPhan}>
                    {course.maHocPhan} ({course.monHoc.tenMonHoc})
                  </option>
                );
              })}
            </Select>
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='examDate' value='Ngày thi' />
            </div>
            <Datepicker
              id='examDate'
              onSelectedDateChanged={handleDateChange}
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='examWeekday' value='Thứ thi' />
            </div>
            <TextInput
              id='examWeekday'
              type='text'
              placeholder=''
              value={getWeekday(date)}
              required
              disabled={true}
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='roomID' value='Phòng thi' />
            </div>
            <Select id='roomID' required>
              <option>B.102</option>
              <option>B.502</option>
              <option>B.402</option>
              <option>C.113</option>
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
              <Label htmlFor='note' value='Ghi chú' />
            </div>
            <TextInput id='note' type='text' placeholder='Nhập ghi chú' />
          </div>
        </div>
        <div className='mt-4'>
          <Button type='submit' color='failure'>
            Thêm
          </Button>
        </div>
      </form>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Sửa/Xoá lịch thi</Modal.Header>
        <Modal.Body>
          <ExamSchedule id={id} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExamScheduleManagement;
