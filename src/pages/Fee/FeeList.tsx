import React, { useState } from 'react';
import { Select, TextInput } from 'flowbite-react';
import Table from 'src/components/Table';
import { useQuery } from '@tanstack/react-query';
import { tuitionFeeApi } from 'src/apis/tution-fee.api';

const FeeList = () => {
  const headers = [
    { title: 'Mã thông tin học phí', dataIndex: 'maThongTinHocPhi' },
    { title: 'Mã học kỳ năm học', dataIndex: 'maHocKyNamHoc' },
    { title: 'Mã sinh viên', dataIndex: 'maSinhVien' },
    {
      title: 'Số tiền học phí theo quy định',
      dataIndex: 'soTienHocPhiTheoQuyDinh'
    },
    { title: 'Số tiền phải đóng', dataIndex: 'soTienPhaiDong' },
    { title: 'Số tiền đã đóng', dataIndex: 'soTienDaDong' },
    { title: 'Số tiền dư', dataIndex: 'soTienDu' },
    {
      title: 'Tên ngân hàng thanh toán học phí',
      dataIndex: 'tenNganHangThanhToanHocPhi'
    },
    {
      title: 'Thời điểm thanh toán học phí',
      dataIndex: 'thoiDiemThanhToanHocPhi'
    },

    { title: 'Ghi chú bổ sung', dataIndex: 'ghiChuBoSung' },

  ];

  const { data: getStudentFee, isLoading: isStudentFeeLoading } = useQuery({
    queryKey: ['fees'],
    queryFn: ({ signal }) => tuitionFeeApi.getAllTuitionFees(0, 1000, signal)
  });
  const studentFeeData = getStudentFee?.data.result;

  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearchVal] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };
  const handleSelectedValueChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
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

      {!isStudentFeeLoading && (
        <Table
          headers={headers}
          data={studentFeeData}
          className='border-input mt-2 border-2'
          filters={{ [selectedValue]: search }}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};

export default FeeList;

function setCurrentPage(page: number) {
  throw new Error('Function not implemented.');
}
