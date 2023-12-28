import { Breadcrumb, FloatingLabel } from 'flowbite-react';
import Pagination from 'src/components/Pagination';
import Breadcrumbs from 'src/components/Breadcrumb/Breadcrumb';
import Header from 'src/components/Header/Header';
import { Spinner } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';
import { Button } from 'flowbite-react';
import Table from 'src/components/Table';
import { useState } from 'react';
import theme from './../../constants/theme';
const AllStudent = () => {
  const courseMajor = ['KTPM', 'KHMT', 'ATTT', 'MMT&TT'];
  const headers = [
    { title: 'Mã số sinh viên', dataIndex: 'studentID' },
    { title: 'Tên', dataIndex: 'studentName' },
    { title: 'Giới tính', dataIndex: 'gender' },
    { title: 'Lớp', dataIndex: 'class' },
    { title: 'Trạng thái học tập', dataIndex: 'status' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Ngày sinh', dataIndex: 'dateOfBirth' }
  ];
  const data = [
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    }
  ];

  const [totalPage, setTotalPage] = useState(50);
  const [pageRange, setPageRange] = useState(5);
  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className='items-center'>
      <div id='main-body' className='space-y-5 p-10'>
        <Breadcrumbs></Breadcrumbs>
        <div
          id='student-table-container'
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
                label='Tìm bằng tên'
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
            <Button className='bg-primary'>Tìm kiếm</Button>
          </div>
          <Table
            headers={headers}
            data={data}
            className='border-input mt-2 border-2'
          />
          <Pagination
            className='mt-5 flex justify-end'
            pageCount={totalPage}
            pageRange={pageRange}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AllStudent;
function setCurrentPage(page: number) {
  throw new Error('Function not implemented.');
}
