import { Button } from 'flowbite-react';
import Table, { Header } from 'src/components/Table/Table';

export default function CoursesConfimation() {
  const headers: Header[] = [
    { title: 'Mã lớp', dataIndex: 'ID' },
    { title: 'Môn học', dataIndex: 'courseName' },
    { title: 'Số TC', dataIndex: 'credits' },
    { title: 'Thời gian học', dataIndex: 'duration' },
    { title: 'Đã ĐK/Sĩ số', dataIndex: 'registered' }
  ];
  const data = [
    {
      ID: 'SE123',
      courseName: 'Nhập môn công nghệ phần mềm',
      credits: '4',
      duration: 'KTPM',
      registered: '80/120'
    },
    {
      ID: 'SE123',
      courseName: 'Nhập môn công nghệ phần mềm',
      credits: '4',
      duration: 'KTPM',
      registered: '80/120'
    },
    {
      ID: 'SE123',
      courseName: 'Nhập môn công nghệ phần mềm',
      credits: '4',
      duration: 'KTPM',
      registered: '80/120'
    },
    {
      ID: 'SE123',
      courseName: 'Nhập môn công nghệ phần mềm',
      credits: '4',
      duration: 'KTPM',
      registered: '80/120'
    },
    {
      ID: 'SE123',
      courseName: 'Nhập môn công nghệ phần mềm',
      credits: '4',
      duration: 'KTPM',
      registered: '80/120'
    },
    {
      ID: 'SE123',
      courseName: 'Nhập môn công nghệ phần mềm',
      credits: '4',
      duration: 'KTPM',
      registered: '80/120'
    },
    {
      ID: 'SE123',
      courseName: 'Nhập môn công nghệ phần mềm',
      credits: '4',
      duration: 'KTPM',
      registered: '80/120'
    },
    {
      ID: 'SE123',
      courseName: 'Nhập môn công nghệ phần mềm',
      credits: '4',
      duration: 'KTPM',
      registered: '80/120'
    }
  ];

  return (
    <div className='w-full bg-white p-5 shadow-lg'>
      <Table
        headers={headers}
        data={data}
        className='border-input mt-2 border-2'
      />
      <Button className='mx-auto mt-4' color='failure'>
        Xác nhận
      </Button>
    </div>
  );
}
