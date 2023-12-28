import { Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import Table from 'src/components/Table';
import { Header } from 'src/components/Table/Table';
('use client');

interface LecturerData {
  ID: string;
  lecturerName: string;
  gender: string;
  class: string;
  status: string;
}

const AllLecturer = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('ID');
  const [pageSize, setPageSize] = useState<number>(10);

  const courseMajor = ['KTPM', 'KHMT', 'ATTT', 'MMT&TT'];
  const headers: Header[] = [
    { title: 'Mã số sinh viên', dataIndex: 'ID', sortable: true },
    { title: 'Tên', dataIndex: 'lecturerName', sortable: true },
    { title: 'Giới tính', dataIndex: 'gender', sortable: true },
    { title: 'Lớp', dataIndex: 'class', sortable: true },
    { title: 'Khoa', dataIndex: 'status', sortable: true }
  ];
  const data: LecturerData[] = [
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bả0',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520621',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    },
    {
      ID: '21520620',
      lecturerName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'CNPM'
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSelectedValueChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className='w-full bg-white p-5 shadow-lg'>
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
      <Table
        headers={headers}
        data={data}
        pageSize={pageSize}
        filters={{ [selectedValue]: search }}
        className='border-input mt-2 border-2'
      />
    </div>
  );
};

export default AllLecturer;
