import { useQuery } from '@tanstack/react-query';
import { Modal, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { lecturerApi } from 'src/apis/lecturer.api';
import Table from 'src/components/Table';
import { Header } from 'src/components/Table/Table';
import Lecturer from 'src/types/lecturer.type';
import EditStudentForm from '../Student/EditStudentForm';
import { studentFileApi } from 'src/apis/student-file.api';
import StudentFile from 'src/types/student-file.type';
('use client');

const StudentFileManagement = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('ID');
  const [pageSize, setPageSize] = useState<number>(10);
  const headers = [
    { title: 'Mã hồ sơ', dataIndex: 'maHoSo' },
    { title: 'Loại hồ sơ', dataIndex: 'loaiHoSo' },
    { title: 'Mã sinh viên', dataIndex: 'maSinhVien'},
    { title: 'Ghi chú', dataIndex: 'ghiChu'},
    { title: 'Trạng thái hồ sơ', dataIndex: 'hoanThanh'}
  ];

  const { data: fileData, isLoading: isFileLoading } = useQuery({
    queryKey: ['files'],
    queryFn: ({ signal }) => studentFileApi.getAllStudentFiles(0, 1000),
    select: data => {
      return data.data.result.map((file: StudentFile) => {
        return {
          maHoSo: file.maHoSo,
          loaiHoSo: file.loaiHoSo,
          maSinhVien: file.maSinhVien,
          ghiChu: file.ghiChu,
          hoanThanh: file.hoanThanh === true ? 'Đã duyệt' : 'Chưa duyệt'
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

  const [openModal, setOpenModal] = useState(false);

  const [selectedRow, setSelectedRow] = useState<string>('');

  const handleRowClick = (row: any) => {
    setSelectedRow(row.maHoSo);
    setOpenModal(true);
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
      {!isFileLoading && (
        <Table
          headers={headers}
          data={fileData}
          pageSize={pageSize}
          filters={{ [selectedValue]: search }}
          className='border-input mt-2 border-2'
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default StudentFileManagement;
