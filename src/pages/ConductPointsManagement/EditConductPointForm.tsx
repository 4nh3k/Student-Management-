import { useQuery } from '@tanstack/react-query';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { conductPointApi } from 'src/apis/conduct-points.api';
import { semesterApi } from 'src/apis/semester.api';
import useConductPoint from 'src/hooks/useConductPoint';
import ConductPoint from 'src/types/conduct-point.type';

const EditConductForm = ({ id }) => {
  const [conduct, setConduct] = useState<ConductPoint>({
    maKetQuaRenLuyen: 0,
    soDiemRenLuyen: 0,
    xepLoaiRenLuyen: '',
    maHocKyNamHoc: 0,
    maSinhVien: 0
  });

  const { data: getConductPoint, isLoading: isLoadingConductPoint } = useQuery({
    queryKey: ['conductPoint', id],
    queryFn: () => conductPointApi.getAllConductPoints(0, 1000, id),
    select: data => {
      return data.data.result.map(conductPoint => {
        return {
          maKetQuaRenLuyen: conductPoint.maKetQuaRenLuyen,
          soDiemRenLuyen: conductPoint.soDiemRenLuyen,
          xepLoaiRenLuyen: conductPoint.xepLoaiRenLuyen,
          maHocKyNamHoc: conductPoint.maHocKyNamHoc,
          maSinhVien: conductPoint.maSinhVien
        };
      });
    }
  });

  useEffect(() => {
    if (!isLoadingConductPoint && getConductPoint) {
      setConduct({
        maKetQuaRenLuyen: getConductPoint[0].maKetQuaRenLuyen,
        soDiemRenLuyen: getConductPoint[0].soDiemRenLuyen,
        xepLoaiRenLuyen: getConductPoint[0].xepLoaiRenLuyen,
        maHocKyNamHoc: getConductPoint[0].maHocKyNamHoc,
        maSinhVien: getConductPoint[0].maSinhVien
      });
    }
  }, [getConductPoint, isLoadingConductPoint]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setConduct(prevConduct => ({ ...prevConduct, [id]: value }));
  };

  const [semester, setSemester] = useState<string>('');
  const { data: getAllSemesters, isLoading: isSemesterLoading } = useQuery({
    queryKey: ['semesters'],
    queryFn: () => semesterApi.getAllSemester(0, 1000)
  });
  const semesters = getAllSemesters?.data.result;

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    const selectedOption = semesters.find(
      semester => semester.tenHocKy + ' ' + semester.tenNamHoc === value
    );
    setSemester(value);
    setConduct(prev => ({
      ...prev,
      maHocKyNamHoc: selectedOption.maHocKyNamHoc
    }));
  };

  const handlePointChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConduct(prev => ({
        ...prev,
        soDiemRenLuyen: parseInt(value)
    }));
  };

  const { updateConductPointMutation, deleteConductPointMutation } =
    useConductPoint();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted file:', conduct);

    updateConductPointMutation.mutate(
      { conductPoint: conduct, id: parseInt(id) },
      {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSuccess: data => {},
        onError: error => {
          toast.error(error.response.data.message);
        }
      }
    );
  };

  const onDeleteConductPoint = () => {
    const confirmBox = window.confirm(
      'Bạn có thật sự muốn xóa thông tin điểm rèn luyện này không'
    );
    console.log('delete clicked');
    if (confirmBox === true) {
      deleteConductPointMutation.mutate(id);
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
            <Label htmlFor='maKetQuaRenLuyen' value='Mã kết quả rèn luyện' />
          </div>
          <TextInput
            id='maKetQuaRenLuyen'
            type='number'
            placeholder='Nhập mã hồ sơ'
            value={conduct.maKetQuaRenLuyen}
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='maSinhVien' value='Mã sinh viên' />
          </div>
          <TextInput
            id='maSinhVien'
            type='number'
            placeholder='Nhập mã sinh viên'
            value={conduct.maSinhVien}
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='soDiemRenLuyen' value='Số điểm rèn luyện' />
          </div>
          <TextInput
            id='soDiemRenLuyen'
            type='number'
            placeholder='Nhập số điểm rèn luyện'
            value={conduct.soDiemRenLuyen}
            required
            onChange={handlePointChange}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='hocKyNamHoc' value='Học kỳ năm học' />
          </div>
          <Select
            id='education-selection'
            required
            value={semester}
            onChange={handleSemesterChange}
          >
            {!isSemesterLoading &&
              semesters.map(semester => (
                <option key={semesters.maHocKyNamHoc}>
                  {semester.tenHocKy + ' ' + semester.tenNamHoc}
                </option>
              ))}
          </Select>
        </div>
      </div>
      <div className='mt-7 flex space-x-5'>
        <Button type='submit' color='failure'>
          Lưu
        </Button>
        <Button className='bg-sidebar' onClick={onDeleteConductPoint}>
          Xóa
        </Button>
      </div>
    </form>
  );
};

export default EditConductForm;
