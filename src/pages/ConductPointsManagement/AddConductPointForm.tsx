import { useQuery } from '@tanstack/react-query';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { conductPointApi } from 'src/apis/conduct-points.api';
import { semesterApi } from 'src/apis/semester.api';
import { studentApi } from 'src/apis/student.api';
import useConductPoint from 'src/hooks/useConductPoint';
import ConductPoint from 'src/types/conduct-point.type';

const AddConductForm = () => {
  const [conduct, setConduct] = useState<ConductPoint>({
    maKetQuaRenLuyen: 0,
    soDiemRenLuyen: 0,
    xepLoaiRenLuyen: '',
    maHocKyNamHoc: 1,
    maSinhVien: 4
  });

  const { data: getStudentData, isLoading: isLoadingStudent } = useQuery({
    queryKey: ['students'],
    queryFn: ({ signal }) => studentApi.getAllStudents(0, 1000)
  });

  const students = getStudentData?.data.result;

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

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConduct(prev => ({
      ...prev,
      soDiemRenLuyen: parseInt(value)
    }));
  };

  const { createConductPointMutation } = useConductPoint();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted file:', conduct);

    createConductPointMutation.mutate(conduct, {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSuccess: data => {
        setConduct({
          maKetQuaRenLuyen: 0,
          soDiemRenLuyen: 0,
          xepLoaiRenLuyen: '',
          maHocKyNamHoc: 1,
          maSinhVien: 4
        });
      },
      onError: error => {
        toast.error(error.response.data.message);
      }
    });
  };

  const onStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const selectedStudent = students?.find(
      student => student.maSinhVien + ' - ' + student.hoTenSinhVien === value
    );
    setConduct(prev => ({
      ...prev,
      maSinhVien: selectedStudent.maSinhVien
    }));
  };

  return (
    <form
      id='student-table-container'
      className='mb-5 w-full bg-white p-5 shadow-lg'
      onSubmit={onSubmit}
    >
      <h1 className='text-lg font-semibold'>Thêm điểm rèn luyện</h1>
      <div className='mt-4 grid grid-cols-4 gap-8'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='maSinhVien' value='Sinh viên' />
          </div>
          <Select id='education-selection' required onChange={onStudentChange}>
            {!isLoadingStudent &&
              students.map(student => (
                <option key={student.maSinhVien}>
                  {student.maSinhVien + ' - ' + student.hoTenSinhVien}
                </option>
              ))}
          </Select>
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
          Thêm
        </Button>
      </div>
    </form>
  );
};

export default AddConductForm;
