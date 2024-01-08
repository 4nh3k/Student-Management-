import React, { useState } from 'react';
import Pagination from 'src/components/Pagination';

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
import { useQuery } from '@tanstack/react-query';
import { courseApi } from 'src/apis/course.api';

const CourseManagement = () => {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const decapitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  const [totalPage, setTotalPage] = useState(50);
  const [pageRange, setPageRange] = useState(5);
  const onPageChange = (page: number) => setCurrentPage(page);
  const courseMajor = ['KTPM', 'KHMT', 'ATTT', 'MMT&TT'];

  const headers = [
    { title: 'Mã học phần', dataIndex: 'maHocPhan' },
    // { title: 'Mã môn học', dataIndex: 'maMonHoc' },
    // { title: 'Mã hệ đào tạo', dataIndex: 'maHeDaoTao' },
    { title: 'Tên môn học', dataIndex: 'tenMonHoc' },
    { title: 'Còn mở lớp', dataIndex: 'conMoLop' },
    { title: 'Loại môn học', dataIndex: 'loaiMonHoc' },
    { title: 'Số tín chỉ lý thuyết', dataIndex: 'soTinChiLyThuyet' },
    { title: 'Số tín chỉ thực hành', dataIndex: 'soTinChiThucHanh' },
    { title: 'Hình thức thi', dataIndex: 'hinhThucThi' },
    { title: 'Loại học phần', dataIndex: 'loaiHocPhan' },
    { title: 'Mã giảng viên', dataIndex: 'maGiangVien' },
    { title: 'Sĩ số sinh viên', dataIndex: 'siSoSinhVien' },
    { title: 'Thời điểm bắt đầu', dataIndex: 'thoiDiemBatDau' },
    { title: 'Thời điểm kết thúc', dataIndex: 'thoiDiemKetThuc' },
    { title: 'Mã học kỳ năm học', dataIndex: 'maHocKyNamHoc' },
    { title: 'Ghi chú', dataIndex: 'ghiChu' }
  ];

  const { data: getCourseData, isLoading: isLoadingCourse } = useQuery({
    queryKey: ['courses'],
    queryFn: ({ signal }) => courseApi.getAllCourseData(0, 1000),
    select: data => {
      return data.data.result.map(course => {
        return {
          maHocPhan: course.maHocPhan,
          maMonHoc: course.maMonHoc,
          maHeDaoTao: course.maHeDaoTao,
          tenMonHoc: course.monHoc.tenMonHoc,
          conMoLop: course.monHoc.conMoLop === true ? 'Còn mở' : 'Đóng',
          loaiMonHoc: course.monHoc.loaiMonHoc,
          soTinChiLyThuyet: course.monHoc.soTinChiLyThuyet,
          soTinChiThucHanh: course.monHoc.soTinChiThucHanh,
          hinhThucThi: capitalizeFirstLetter(course.hinhThucThi),
          loaiHocPhan: capitalizeFirstLetter(course.loaiHocPhan),
          maGiangVien: course.maGiangVien,
          siSoSinhVien: course.siSoSinhVien,
          thoiDiemBatDau: course.thoiDiemBatDau,
          thoiDiemKetThuc: course.thoiDiemKetThuc,
          maHocKyNamHoc: course.maHocKyNamHoc,
          ghiChu: course.ghiChu
        };
      });
    }
  });

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
        {!isLoadingCourse && getCourseData && (
          <Table
            headers={headers}
            data={getCourseData}
            className='border-input mt-2 border-2 overflow-x-auto'
            pageSize={pageSize}
            filters={{ [selectedValue]: search }}
          />
        )}
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
