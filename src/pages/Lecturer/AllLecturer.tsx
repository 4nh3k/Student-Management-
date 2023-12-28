import { Button, FloatingLabel, Select } from 'flowbite-react';
import Breadcrumbs from 'src/components/Breadcrumb/Breadcrumb';
import Pagination from 'src/components/Pagination';
import Table from 'src/components/Table';
const AllLecturer = () => {
  const courseMajor = ['KTPM', 'KHMT', 'ATTT', 'MMT&TT'];
  const headers = [
    { title: 'Mã số sinh viên', dataIndex: 'ID' },
    { title: 'Tên', dataIndex: 'studentName' },
    { title: 'Giới tính', dataIndex: 'gender' },
    { title: 'Lớp', dataIndex: 'class' },
    { title: 'Khoa', dataIndex: 'status' }
  ];
  const data = [
    {
      ID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    },
    {
      ID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    },
    {
      ID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    },
    {
      ID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    },
    {
      ID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    }
  ];

  return (
    <div className='items-center'>
      <div id='main-body' className='space-y-5 p-10'>
        <Breadcrumbs />
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
            <Select id='major' required>
              <option>Nam</option>
              <option>Nữ</option>
            </Select>
            <Button className='bg-primary'>Tìm kiếm</Button>
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
            onPageChange={(data: { selected: number }) => {
              console.log(data);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AllLecturer;
