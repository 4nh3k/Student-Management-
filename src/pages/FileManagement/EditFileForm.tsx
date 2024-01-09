import { useQuery } from '@tanstack/react-query';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { lecturerApi } from 'src/apis/lecturer.api';
import { studentFileApi } from 'src/apis/student-file.api';
import useLecturer from 'src/hooks/useLecturer';
import useStudentFile from 'src/hooks/useStudentFile';
import CreateLecturerDto from 'src/types/create-lecturer.dto';
import StudentFile from 'src/types/student-file.type';
import { validateName } from 'src/utils/utils';

const EditFileForm = ({ id }) => {
  const [file, setFile] = useState<StudentFile>({
    maHoSo: 0,
    hoanThanh: false,
    ghiChu: '',
    loaiHoSo: '',
    danhSachDinhKem: [],
    maSinhVien: 0
  });

  const { data: getAllStudentFileTypes, isLoading: isLoadingFileTypes } =
    useQuery({
      queryKey: ['studentFileTypes'],
      queryFn: () => studentFileApi.getAllStudentFileTypes()
    });

  const studentFileTypes = getAllStudentFileTypes?.data.result;

  const { data: getFileData, isLoading: isLoadingFile } = useQuery({
    queryKey: ['file', id],
    queryFn: ({ signal }) => studentFileApi.getAllStudentFiles(0, 1000, id)
  });

  const fileData = getFileData?.data.result;

  useEffect(() => {
    if (!isLoadingFile && fileData) {
      setFile({
        maHoSo: fileData[0].maHoSo,
        hoanThanh: fileData[0].hoanThanh,
        ghiChu: fileData[0].ghiChu,
        loaiHoSo: fileData[0].loaiHoSo,
        danhSachDinhKem: fileData[0].danhSachDinhKem,
        maSinhVien: fileData[0].maSinhVien
      });
    }
  }, [fileData, isLoadingFile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFile(prevFile => ({ ...prevFile, [id]: value }));
  };

  const { updateStudentFileMutation, deleteStudentFileMutation } =
    useStudentFile();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted file:', file);

    updateStudentFileMutation.mutate(
      { studentFile: file, id: parseInt(id) },
      {
        onSuccess: data => {
          setFile({
            maHoSo: 0,
            hoanThanh: false,
            ghiChu: '',
            loaiHoSo: '',
            danhSachDinhKem: [],
            maSinhVien: 0
          });
        },
        onError: error => {
          toast.error(error.response.data.message);
        }
      }
    );
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
            <Label htmlFor='maHoSo' value='Mã hồ sơ' />
          </div>
          <TextInput
            id='maHoSo'
            type='number'
            placeholder='Nhập mã hồ sơ'
            value={file.maHoSo}
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='loaiHoSo' value='Loại hồ sơ' />
          </div>
          <Select id='loaiHoSo-selection' required value={file.loaiHoSo}>
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
          <Select id='trangThaiHoSo' onChange={handleFileStatusChange}>
            <option>Đã duyệt</option>
            <option>Chưa duyệt</option>
          </Select>
        </div>
      </div>
      <div className='mt-7 flex space-x-5'>
        <Button type='submit' color='failure'>
          Lưu
        </Button>
        <Button className='bg-sidebar' onClick={onDeleteStudentFile}>
          Xóa
        </Button>
      </div>
    </form>
  );
};

export default EditFileForm;
