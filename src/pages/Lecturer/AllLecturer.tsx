import { useQuery } from '@tanstack/react-query';
import { Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { lecturerApi } from 'src/apis/lecturer.api';
import Table from 'src/components/Table';
import { Header } from 'src/components/Table/Table';
import Lecturer from 'src/types/lecturer.type';
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

  const headers = [
    { title: 'Mã giảng viên', dataIndex: 'maGiangVien' },
    { title: 'Tên giảng viên', dataIndex: 'tenGiangVien' }
  ];

  const { data: lecturerData, isLoading: isLecturerLoading } = useQuery({
    queryKey: ['lecturers'],
    queryFn: ({ signal }) => lecturerApi.getAllLecturers(0, 1000, signal),
    select: data => {
      return data.data.result.map((lecturer: Lecturer) => {
        return {
          maGiangVien: lecturer.maGiangVien,
          tenGiangVien: lecturer.tenGiangVien
        };
      });
    }
  });

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
      {!isLecturerLoading && (
        <Table
          headers={headers}
          data={lecturerData}
          pageSize={pageSize}
          filters={{ [selectedValue]: search }}
          className='border-input mt-2 border-2'
        />
      )}
    </div>
  );
};

export default AllLecturer;
