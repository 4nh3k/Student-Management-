import { useQuery } from '@tanstack/react-query';
import { Label, TextInput, Select, Datepicker, Button } from 'flowbite-react';
import React from 'react';
import { courseApi } from 'src/apis/course.api';
import { useState } from 'react';
import { studentApi } from 'src/apis/student.api';
import { lecturerApi } from 'src/apis/lecturer.api';
import { semesterApi } from 'src/apis/semester.api';

const AddCourseForm = () => {
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
      monHoc => monHoc.tenChuyenNganh === value
    );
    setMonHoc(value);
    // set(prevStudent => ({
    //   ...prevStudent,
    //   maChuyenNganh: selectedOption.maChuyenNganh,
    //   chuyenNganh: value
    // }));
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
    // const selectedOption = educationTypeData.find(
    //   education => education.tenHeDaoTao === decapitalizeFirstLetter(value)
    // );
    setEducationType(value);
    // setStudent(prevStudent => ({
    //   ...prevStudent,
    //   maHeDaoTao: selectedOption.maHeDaoTao,
    //   heDaoTao: decapitalizeFirstLetter(value)
    // }));
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
  };

  const [lecturer, setLecturer] = useState<string>('');
  const { data: getAllLecturers, isLoading: isLecturerLoading } = useQuery({
    queryKey: ['lecturers'],
    queryFn: () => lecturerApi.getAllLecturers(0, 1000)
  });
  const lecturers = getAllLecturers?.data.result;

  const handleLecturerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    setLecturer(value);
  };

  const [semester, setSemester] = useState<string>('');
  const { data: getAllSemesters, isLoading: isSemesterLoading } = useQuery({
    queryKey: ['semesters'],
    queryFn: () => semesterApi.getAllSemester(0, 1000)
  });
  const semesters = getAllSemesters?.data.result;

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    setSemester(value);
  };
  return (
    <div
      id='add-course-container'
      className='mt-10 w-full bg-white p-5 shadow-lg'
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
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='thoiDiemBatDau' value='Thời điểm bắt đầu' />
          </div>
          <Datepicker
            id='thoiDiemBatDau'
            // value={new Date(student.ngaySinh).toLocaleDateString('en-GB')}
            // onSelectedDateChanged={handleDateOfBirthChange}
          ></Datepicker>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='thoiDiemKetThuc' value='Thời điểm kết thúc' />
          </div>
          <Datepicker
            id='thoiDiemKetThuc'
            // value={new Date(student.ngaySinh).toLocaleDateString('en-GB')}
            // onSelectedDateChanged={handleDateOfBirthChange}
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
          />
        </div>
      </div>
      <div className='mt-4'>
        <Button type='submit' color='failure'>
          Thêm
        </Button>
      </div>
    </div>
  );
};

export default AddCourseForm;
