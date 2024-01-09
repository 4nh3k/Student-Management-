import { useQuery } from '@tanstack/react-query';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { studentFileApi } from 'src/apis/student-file.api';
import useStudentFile from 'src/hooks/useStudentFile';
import StudentFile from 'src/types/student-file.type';
import { getProfileFromLS } from 'src/utils/auth';

const AddFileForm = () => {
  const id = getProfileFromLS().userId;
  console.log(id);
  const [file, setFile] = useState<StudentFile>({
    maHoSo: 0,
    hoanThanh: false,
    ghiChu: '',
    loaiHoSo: '',
    danhSachDinhKem: [],
    maSinhVien: id
  });

  const { data: getAllStudentFileTypes, isLoading: isLoadingFileTypes } =
    useQuery({
      queryKey: ['studentFileTypes'],
      queryFn: () => studentFileApi.getAllStudentFileTypes()
    });

  const studentFileTypes = getAllStudentFileTypes?.data.result;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFile(prevFile => ({ ...prevFile, [id]: value }));
  };

  const { createStudentFileMutation } = useStudentFile();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted file:', file);

    createStudentFileMutation.mutate(file, {
      onSuccess: data => {
        setFile({
          maHoSo: 0,
          hoanThanh: false,
          ghiChu: '',
          loaiHoSo: '',
          danhSachDinhKem: [],
          maSinhVien: id
        });
      },
      onError: error => {
        toast.error(error.response.data.message);
      }
    });
  };

  const handleFileStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'Đã duyệt' ? true : false;
    setFile(prevFile => ({ ...prevFile, hoanThanh: value }));
  };

  const onDeleteStudentFile = () => {
    const confirmBox = window.confirm(
      'Bạn có thật sự muốn xóa hồ sơ này không'
    );
    console.log('delete clicked');
    if (confirmBox === true) {
      deleteStudentFileMutation.mutate(id);
    }
  };

  const handleStudentFileTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setFile(prevFile => ({ ...prevFile, loaiHoSo: value }));
  };

  return (
    <form
      id='student-table-container'
      className='w-full bg-white p-5 shadow-lg'
      onSubmit={onSubmit}
    >
      <h1 className='text-lg font-semibold'>Thông tin giảng viên</h1>
      <div className='mt-4 grid grid-cols-4 gap-8'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='loaiHoSo' value='Loại hồ sơ' />
          </div>
          <Select
            id='loaiHoSo-selection'
            required
            value={file.loaiHoSo}
            onChange={handleStudentFileTypeChange}
          >
            {!isLoadingFileTypes &&
              studentFileTypes.map(type => <option key={type}>{type}</option>)}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='maSinhVien' value='Mã sinh viên' />
          </div>
          <TextInput
            id='maSinhVien'
            type='number'
            placeholder='Nhập mã sinh viên'
            value={file.maSinhVien}
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='ghiChu' value='Ghi chú' />
          </div>
          <TextInput
            id='ghiChu'
            type='text'
            placeholder='Nhập ghi chú'
            value={file.ghiChu}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='hoanThanh' value='Trạng thái hồ sơ' />
          </div>
          <Select
            id='trangThaiHoSo'
            value={file.hoanThanh ? 'Đã duyệt' : 'Chưa duyệt'}
          >
            <option>Đã duyệt</option>
            <option>Chưa duyệt</option>
          </Select>
        </div>
      </div>
      <div className='mt-7 flex space-x-5'>
        <Button type='submit' color='failure'>
          Thêm hồ sơ
        </Button>
      </div>
    </form>
  );
};

export default AddFileForm;
