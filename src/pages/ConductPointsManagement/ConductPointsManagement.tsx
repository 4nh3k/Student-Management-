import { useQuery } from '@tanstack/react-query';
import { Modal, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import Table from 'src/components/Table';
import { conductPointApi } from 'src/apis/conduct-points.api';
import ConductPoint from 'src/types/conduct-point.type';
import EditConductForm from './EditConductPointForm';
import AddConductForm from './AddConductPointForm';
('use client');

const ConductPointsManagement = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('ID');
  const [pageSize, setPageSize] = useState<number>(10);
  const headers = [
    { title: 'Mã kết quả rèn luyện', dataIndex: 'maKetQuaRenLuyen' },
    { title: 'Số điểm rèn luyện', dataIndex: 'soDiemRenLuyen' },
    { title: 'Xếp loại rèn luyện', dataIndex: 'xepLoaiRenLuyen' },
    { title: 'Mã học kỳ năm học', dataIndex: 'maHocKyNamHoc' },
    { title: 'Mã sinh viên', dataIndex: 'maSinhVien' }
  ];

  const { data: conductPointData, isLoading: isConductPointLoading } = useQuery(
    {
      queryKey: ['conductPoints'],
      queryFn: () => conductPointApi.getAllConductPoints(0, 1000),
      select: data => {
        return data.data.result.map((item: ConductPoint) => {
          return {
            maKetQuaRenLuyen: item.maKetQuaRenLuyen,
            soDiemRenLuyen: item.soDiemRenLuyen,
            xepLoaiRenLuyen: item.xepLoaiRenLuyen,
            maHocKyNamHoc: item.maHocKyNamHoc,
            maSinhVien: item.maSinhVien
          };
        });
      }
    }
  );

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
    setSelectedRow(row.maKetQuaRenLuyen);
    setOpenModal(true);
  };

  return (
    <div>
      <div className='mb-10 w-full bg-white p-5 shadow-lg'>
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
        {!isConductPointLoading && (
          <Table
            headers={headers}
            data={conductPointData}
            pageSize={pageSize}
            filters={{ [selectedValue]: search }}
            className='border-input mt-2 border-2'
            onRowClick={handleRowClick}
          />
        )}
        <Modal
          size={'6xl'}
          dismissible
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>Cập nhật / Xóa thông tin điểm rèn luyện</Modal.Header>
          <Modal.Body>
            <EditConductForm id={selectedRow}></EditConductForm>
          </Modal.Body>
        </Modal>
      </div>

      <AddConductForm></AddConductForm>
    </div>
  );
};

export default ConductPointsManagement;
