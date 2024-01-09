import { useQuery } from '@tanstack/react-query';
import { Button, Datepicker, Label, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { courseApi } from 'src/apis/course.api';

import { toast } from 'react-toastify';
import { lecturerApi } from 'src/apis/lecturer.api';
import { semesterApi } from 'src/apis/semester.api';
import { studentApi } from 'src/apis/student.api';
import useCourse from 'src/hooks/useCourse';
import CreateHocPhanDto from 'src/types/create-hoc-phan.dto';

const AddCourseForm = () => {
  const decapitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const [monHoc, setMonHoc] = useState<string>('');
  const { data: getMonHocData, isLoading: isLoadingMonHoc } = useQuery({
    queryKey: ['monHocs'],
    queryFn: () => courseApi.getAllMonHocs(0, 1000),
    select: data => {
      return data.data.result.map(monHoc => {
        return {
          maMonHoc: monHoc.maMonHoc,
          tenMonHoc: monHoc.tenMonHoc
        };
      });
    }
  });

  const handleMonHocChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    const selectedOption = getMonHocData.find(
      monHoc => monHoc.tenMonHoc === value
    );
    setMonHoc(value);
    setCourse(prevCourse => ({
      ...prevCourse,
      maMonHoc: selectedOption.maMonHoc
    }));
  };

  const { data: educationTypes, isLoading: isEducationTypeLoading } = useQuery({
    queryKey: ['educationTypes'],
    queryFn: ({ signal }) => studentApi.getAllEducationTypes(0, 1000, signal),
    staleTime: 1000 * 60 * 60
  });

  const educationTypeData = educationTypes?.data.result;

  const [educationType, setEducationType] = useState<string>('đại trà');

  const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    const selectedOption = educationTypeData.find(
      education => education.tenHeDaoTao === decapitalizeFirstLetter(value)
    );
    setEducationType(value);
    setCourse(prevCourse => ({
      ...prevCourse,
      maHeDaoTao: selectedOption.maHeDaoTao
    }));
  };

  const [hinhThucThi, setHinhThucThi] = useState<string>(
    'bài kiểm tra lý thuyết cuối kỳ'
  );
  const { data: getAllHinhThucThi, isLoading: isHinhThucThiLoading } = useQuery(
    {
      queryKey: ['hinhThucThis'],
      queryFn: () => courseApi.getAllHinhThucThis()
    }
  );
  const hinhThucThis = getAllHinhThucThi?.data.result;

  const handleHinhThucThiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    setHinhThucThi(value);
    setCourse(prevCourse => ({
      ...prevCourse,
      hinhThucThi: value
    }));
  };

  const [loaiHocPhan, setLoaiHocPhan] = useState<string>('tự chọn');
  const { data: getAllLoaiHocPhan, isLoading: isLoaiHocPhanLoading } = useQuery(
    {
      queryKey: ['loaiHocPhans'],
      queryFn: () => courseApi.getAllLoaiHocPhans()
    }
  );
  const loaiHocPhans = getAllLoaiHocPhan?.data.result;

  const handleLoaiHocPhanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    setLoaiHocPhan(value);
    setCourse(prevCourse => ({
      ...prevCourse,
      loaiHocPhan: value
    }));
  };

  const [lecturer, setLecturer] = useState<string>('');
  const { data: getAllLecturers, isLoading: isLecturerLoading } = useQuery({
    queryKey: ['lecturers'],
    queryFn: () => lecturerApi.getAllLecturers(0, 1000)
  });
  const lecturers = getAllLecturers?.data.result;

  const handleLecturerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    const selectedOption = lecturers.find(
      lecturer => lecturer.tenGiangVien === value
    );
    setLecturer(value);
    setCourse(prevCourse => ({
      ...prevCourse,
      maGiangVien: selectedOption.maGiangVien
    }));
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
    setCourse(prevCourse => ({
      ...prevCourse,
      maHocKyNamHoc: selectedOption.maHocKyNamHoc
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target.value;
    setCourse(prevCourse => ({
      ...prevCourse,
      ['siSoSinhVien']: parseInt(value)
    }));
  };

  const handleGhiChuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target.value;
    setCourse(prevCourse => ({
      ...prevCourse,
      ['ghiChu']: value
    }));
  };

  const { createCourseMutation } = useCourse();

  const [course, setCourse] = useState<CreateHocPhanDto>({
    maMonHoc: 1,
    maHeDaoTao: 5,
    hinhThucThi: 'bài kiểm tra lý thuyết cuối kỳ',
    maHocPhan: 0,
    loaiHocPhan: 'tự chọn',
    maGiangVien: 2,
    siSoSinhVien: 0,
    thoiDiemBatDau: new Date().toISOString(),
    thoiDiemKetThuc: new Date().toISOString(),
    maHocKyNamHoc: 1,
    ghiChu: ''
  });

  const handleStartDateChange = date => {
    console.log(date);
    setCourse(prevCourse => ({
      ...prevCourse,
      thoiDiemBatDau: date.toISOString()
    }));
  };

  const handleEndDateChange = date => {
    console.log(date);
    setCourse(prevCourse => ({
      ...prevCourse,
      thoiDiemKetThuc: date.toISOString()
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted course:', course);

    if (course.siSoSinhVien <= 0) {
      toast.error('Sĩ số sinh viên phải là số dương');
      return;
    }

    createCourseMutation.mutate(course, {
      onError: error => {
        toast.error(error.response.data.message);
      }
    });
  };
  return (
    <form
      id='add-course-container'
      className='mt-10 w-full bg-white p-5 shadow-lg'
      onSubmit={onSubmit}
    >
      <div className='mt-4 grid grid-cols-3 gap-8'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='monHoc' value='Môn học' />
          </div>
          <Select
            id='maMonHoc'
            required
            value={monHoc}
            onChange={handleMonHocChange}
          >
            {!isLoadingMonHoc &&
              getMonHocData.map(monHoc => (
                <option key={monHoc.maMonHoc}>{monHoc.tenMonHoc}</option>
              ))}
          </Select>
        </div>

        <div>
          <div className='mb-2 block'>
            <Label htmlFor='heDaoTao' value='Hệ đào tạo' />
          </div>
          <Select
            id='education-selection'
            required
            value={educationType}
            onChange={handleEducationChange}
          >
            {!isEducationTypeLoading &&
              educationTypeData.map(educationType => (
                <option key={educationType.maHeDaoTao}>
                  {capitalizeFirstLetter(educationType.tenHeDaoTao)}
                </option>
              ))}
          </Select>
        </div>

        <div>
          <div className='mb-2 block'>
            <Label htmlFor='hinhThucThi' value='Hình thức thi' />
          </div>
          <Select
            id='education-selection'
            required
            value={hinhThucThi}
            onChange={handleHinhThucThiChange}
          >
            {!isHinhThucThiLoading &&
              hinhThucThis.map(hinhThucThi => (
                <option key={hinhThucThi}>{hinhThucThi}</option>
              ))}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label
              htmlFor='loaiHocPhan'
              value='Loại học phần'
              className='mb-2'
            />
          </div>
          <Select
            id='education-selection'
            required
            value={loaiHocPhan}
            onChange={handleLoaiHocPhanChange}
          >
            {!isLoaiHocPhanLoading &&
              loaiHocPhans.map(loaiHocPhan => (
                <option key={loaiHocPhan}>{loaiHocPhan}</option>
              ))}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='giangVien' value='Giảng viên' />
          </div>
          <Select
            id='education-selection'
            required
            value={lecturer}
            onChange={handleLecturerChange}
          >
            {!isLecturerLoading &&
              lecturers.map(lecturer => (
                <option key={lecturer.maGiangVien}>
                  {lecturer.tenGiangVien}
                </option>
              ))}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='siSoSinhVien' value='Sĩ số sinh viên' />
          </div>
          <TextInput
            id='siSoSinhVien'
            type='number'
            placeholder='Nhập sĩ số sinh viên'
            required
            value={course.siSoSinhVien}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='thoiDiemBatDau' value='Thời điểm bắt đầu' />
          </div>
          <Datepicker
            id='thoiDiemBatDau'
            value={new Date(course.thoiDiemBatDau).toLocaleDateString('en-GB')}
            onSelectedDateChanged={handleStartDateChange}
          ></Datepicker>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='thoiDiemKetThuc' value='Thời điểm kết thúc' />
          </div>
          <Datepicker
            id='thoiDiemKetThuc'
            value={new Date(course.thoiDiemKetThuc).toLocaleDateString('en-GB')}
            onSelectedDateChanged={handleEndDateChange}
          ></Datepicker>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='maHocKyNamHoc' value='Học kỳ năm học' />
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
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='ghiChu' value='Ghi chú' />
          </div>
          <TextInput
            id='ghiChu'
            type='text'
            placeholder='Nhập ghi chú'
            required
            value={course.ghiChu}
            onChange={handleGhiChuChange}
          />
        </div>
      </div>
      <div className='mt-4'>
        <Button type='submit' color='failure'>
          Thêm
        </Button>
      </div>
    </form>
  );
};

export default AddCourseForm;
