import { Breadcrumb, FloatingLabel } from 'flowbite-react';
import Pagination from 'src/components/Pagination';
import Breadcrumbs from 'src/components/Breadcrumb/Breadcrumb';
import Header from 'src/components/Header/Header';
import { Spinner } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';
import { Button } from 'flowbite-react';
import Table from 'src/components/Table';
import { useState } from 'react';
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
      <Header></Header>
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
            <FloatingLabel
              className='w-96 text-xl '
              variant='outlined'
              label='Tìm bằng tên'
            />
            <Dropdown
              className='text-xl font-bold'
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
          <Table headers={headers} data={data}></Table>
        </div>
      </div>
    </div>
  );
};

export default AllStudent;
function setCurrentPage(page: number) {
  throw new Error('Function not implemented.');
}

