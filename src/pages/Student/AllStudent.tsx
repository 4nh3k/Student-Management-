import { Button, Modal, Select, TextInput } from 'flowbite-react';
import Student from 'src/types/student.type';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import { studentApi } from 'src/apis/student.api';
import Table from 'src/components/Table';
import AddStudentForm from './AddStudentForm';
import EditStudentForm from './EditStudentForm';

const AllStudent = () => {
  const courseMajor = ['KTPM', 'KHMT', 'ATTT', 'MMT&TT'];

  const [pageSize, setPageSize] = useState<number>(5);
  const [search, setSearchVal] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('ID');
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleSelectedValueChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
  };

  const { data: studentData, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: ({ signal }) => studentApi.getAllStudents(0, 1000, signal),
    select: data => {
      return data.data.result.map((item: Student) => {
        return {
          maSinhVien: item.maSinhVien,
          hoTenSinhVien: item.hoTenSinhVien,
          maKhoaHoc: item.maKhoaHoc,
          maChuyenNganh: item.maChuyenNganh,
          maHeDaoTao: item.maHeDaoTao,
          tinhTrangHocTap: capitalizeFirstLetter(item.tinhTrangHocTap),
          ngaySinh: format(item.ngaySinh, 'dd/MM/yyyy'),
          gioiTinh: item.gioiTinh === 'Nam' ? 'Nam' : 'Nữ'
        };
      });
    }
  });

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const headers = [
    { title: 'Mã sinh viên', dataIndex: 'maSinhVien' },
    { title: 'Họ tên sinh viên', dataIndex: 'hoTenSinhVien' },
    { title: 'Mã khóa học', dataIndex: 'maKhoaHoc' },
    { title: 'Mã chuyên ngành', dataIndex: 'maChuyenNganh' },
    { title: 'Mã hệ đào tạo', dataIndex: 'maHeDaoTao' },
    { title: 'Tình trạng học tập', dataIndex: 'tinhTrangHocTap' },
    { title: 'Ngày sinh', dataIndex: 'ngaySinh' },
    { title: 'Giới tính', dataIndex: 'gioiTinh' }
  ];
  console.log(studentData); //to test the data load successfully
  const students = studentData;

  const handleRowClick = (row: any) => {
    setSelectedRow(row.maSinhVien);
    setOpenModal(true);
  };

  return (
    <div id='student-table-container' className='w-full bg-white p-5 shadow-lg'>
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
      {!isLoading && students && (
        <Table
          headers={headers}
          data={students}
          onRowClick={handleRowClick}
          className='border-input mt-2 border-2'
          filters={{ [selectedValue]: search }}
          pageSize={pageSize}
        />
      )}
      <Modal
        size={'6xl'}
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Sửa / Xóa sinh viên</Modal.Header>
        <Modal.Body>
          <EditStudentForm id={selectedRow} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllStudent;
