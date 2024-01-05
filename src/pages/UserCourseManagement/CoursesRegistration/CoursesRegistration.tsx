import { Button } from 'flowbite-react';
import { useState } from 'react';
import Table, { Header } from 'src/components/Table/Table';

export default function CoursesRegistration() {
  const headers: Header[] = [
    { title: 'Mã lớp', dataIndex: 'ID' },
    { title: 'Môn học', dataIndex: 'courseName' },
    { title: 'Số TC', dataIndex: 'credits' },
    { title: 'Thời gian học', dataIndex: 'duration' },
    { title: 'Đã ĐK/Sĩ số', dataIndex: 'registered' }
  ];
  const data = [
    {
      ID: 'SE121',
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

  const [courseSelected, setCourseSelected] = useState<string[]>([]);

  const handleOnCheck = (row: any, checked: boolean) => {
    console.log(row, checked);
    if (checked) {
      setCourseSelected([...courseSelected, row.ID]);
    } else {
      setCourseSelected(courseSelected.filter(item => item !== row.ID));
    }
  };

  return (
    <div className=' w-full bg-white p-5 shadow-lg'>
      <Table
        headers={headers}
        hasCheckbox={true}
        onCheck={handleOnCheck}
        data={data}
        className='border-input mt-2 border-2'
      />
      <div className=' fixed bottom-0 right-0 z-10 flex items-center  border-t border-solid border-gray-300 bg-gray-100 py-2 text-center lg:w-[calc(100%-16rem)]'>
        {courseSelected.length === 0 ? (
          <p className='ml-auto text-sm'>Vui lòng chọn lớp để xoá</p>
        ) : (
          <p className='ml-auto text-sm'>
            Đã chọn {courseSelected.length} môn học: {courseSelected.join(', ')}
          </p>
        )}
        <Button className='ml-auto mr-10' color='failure'>
          Huỷ đăng ký
        </Button>
      </div>
    </div>
  );
}
