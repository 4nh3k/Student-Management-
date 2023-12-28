import { Button, FloatingLabel, Select } from 'flowbite-react';
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
      status: 'CNPM'
    },
    {
      ID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    }
  ];

  return (
    <div id='student-table-container' className='w-full bg-white p-5 shadow-lg'>
      <div
        id='input-row'
        className='flex items-center justify-between align-middle'
      >
        <div className='w-96'>
          <FloatingLabel className='' variant='outlined' label='Tìm bằng tên' />
        </div>
        <Select id='major' required>
          <option>Nam</option>
          <option>Nữ</option>
        </Select>
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
  );
};

export default AllLecturer;
