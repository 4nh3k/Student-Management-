import { useQuery } from '@tanstack/react-query';
import { Label, TextInput, Select, Datepicker, Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { courseApi } from 'src/apis/course.api';

import { studentApi } from 'src/apis/student.api';
import { lecturerApi } from 'src/apis/lecturer.api';
import { semesterApi } from 'src/apis/semester.api';
import HocPhan from 'src/types/hoc-phan.type';
import CreateHocPhanDto from 'src/types/create-hoc-phan.dto';
import useCourse from 'src/hooks/useCourse';
import CreateCourseDto from 'src/types/create-course.dto';
import { toast } from 'react-toastify';

const EditCourseForm = ({ id }) => {
  const decapitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const { data: courseData, isLoading: isLoadingCourseData } = useQuery({
    queryKey: ['course', id],
    queryFn: ({ signal }) => courseApi.getAllCourseData(0, 1000, parseInt(id)),
    select: data => {
      return data.data.result.map((item: CreateHocPhanDto) => {
        return {
          maMonHoc: item.maMonHoc,
          maHeDaoTao: item.maHeDaoTao,
          hinhThucThi: item.hinhThucThi,
          maHocPhan: item.maHocPhan,
          loaiHocPhan: item.loaiHocPhan,
          maGiangVien: item.maGiangVien,
          siSoSinhVien: item.siSoSinhVien,
          thoiDiemBatDau: item.thoiDiemBatDau,
          thoiDiemKetThuc: item.thoiDiemKetThuc,
          maHocKyNamHoc: item.maHocKyNamHoc,
          ghiChu: item.ghiChu
        };
      });
    }
  });

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
      maGiangVien: selectedOption.maHocKyNamHoc
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target.value;
    setCourse(prevCourse => ({
      ...prevCourse,
      ['siSoSinhVien']: parseInt(value)
    }));
  };

  const { updateCourseMutation, deleteCourseMutation } = useCourse();

  const [course, setCourse] = useState<CreateHocPhanDto>({
    maMonHoc: 1,
    maHeDaoTao: 5,
    hinhThucThi: 'bài kiểm tra lý thuyết cuối kỳ',
    maHocPhan: 0,
    loaiHocPhan: 'tự chọn',
    maGiangVien: 2,
    siSoSinhVien: 0,
    thoiDiemBatDau: new Date().toUTCString(),
    thoiDiemKetThuc: new Date().toUTCString(),
    maHocKyNamHoc: 1,
    ghiChu: ''
  });

  const handleStartDateChange = date => {
    console.log(date);
    setCourse(prevCourse => ({
      ...prevCourse,
      thoiDiemBatDau: date.toUTCString()
    }));
  };

  const handleEndDateChange = date => {
    console.log(date);
    setCourse(prevCourse => ({
      ...prevCourse,
      thoiDiemKetThuc: date.toUTCString()
    }));
  };

  const handleGhiChuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target.value;
    setCourse(prevCourse => ({
      ...prevCourse,
      ['ghiChu']: value
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted course:', course);

    if (course.siSoSinhVien <= 0) {
      toast.error('Sĩ số sinh viên phải là số dương');
      return;
    }

    console.log(course);

    updateCourseMutation.mutate(
      { course: course, id: id },
      {
        onSuccess: data => {
          setCourse({
            maMonHoc: 1,
            maHeDaoTao: 5,
            hinhThucThi: 'bài kiểm tra lý thuyết cuối kỳ',
            maHocPhan: 0,
            loaiHocPhan: 'tự chọn',
            maGiangVien: 2,
            siSoSinhVien: 0,
            thoiDiemBatDau: new Date().toUTCString(),
            thoiDiemKetThuc: new Date().toUTCString(),
            maHocKyNamHoc: 1,
            ghiChu: ''
          });
        },
        onError: error => {
          toast.error(error.response.data.message);
        }
      }
    );
  };

  useEffect(() => {
    if (
      !isEducationTypeLoading &&
      !isHinhThucThiLoading &&
      !isLecturerLoading &&
      !isLoadingCourseData &&
      !isLoadingMonHoc &&
      !isLoaiHocPhanLoading &&
      !isSemesterLoading &&
      courseData
    ) {
      console.log(courseData);
      setCourse({
        maMonHoc: courseData[0].maMonHoc,
        maHeDaoTao: courseData[0].maHeDaoTao,
        hinhThucThi: courseData[0].hinhThucThi,
        maHocPhan: courseData[0].maHocPhan,
        loaiHocPhan: courseData[0].loaiHocPhan,
        maGiangVien: courseData[0].maGiangVien,
        siSoSinhVien: courseData[0].siSoSinhVien,
        thoiDiemBatDau: courseData[0].thoiDiemBatDau,
        thoiDiemKetThuc: courseData[0].thoiDiemKetThuc,
        maHocKyNamHoc: courseData[0].maHocKyNamHoc,
        ghiChu: courseData[0].ghiChu
      });

      const selectedEducationType = educationTypeData.find(
        education => education.maHeDaoTao === courseData[0].maHeDaoTao
      );
      setEducationType(
        capitalizeFirstLetter(selectedEducationType.tenHeDaoTao)
      );

      setHinhThucThi(courseData[0].hinhThucThi);

      const selectedLecturer = lecturers?.find(
        lecturer => lecturer.maGiangVien === courseData[0].maGiangVien
      );

      setLecturer(selectedLecturer?.tenGiangVien);

      const selectedMonHoc = getMonHocData?.find(
        monHoc => monHoc.maMonHoc === courseData[0].maMonHoc
      );

      setMonHoc(selectedMonHoc?.tenMonHoc);

      setLoaiHocPhan(courseData[0].loaiHocPhan);

      const selectedSemester = semesters?.find(
        semester => semester.maHocKyNamHoc === courseData[0].maHocKyNamHoc
      );

      setSemester(selectedSemester.tenHocKy + ' ' + selectedSemester.tenNamHoc);
    }
  }, [
    educationTypeData,
    isEducationTypeLoading,
    isHinhThucThiLoading,
    isLecturerLoading,
    isLoadingCourseData,
    isLoadingMonHoc,
    isLoaiHocPhanLoading,
    isSemesterLoading,
    courseData,
    lecturers,
    getMonHocData,
    semesters
  ]);

  const onDeleteCourse = () => {
    const confirmBox = window.confirm(
      'Bạn có thật sự muốn xóa học phần này không'
    );
    console.log('delete clicked');
    if (confirmBox === true) {
      deleteCourseMutation.mutate(id);
    }
  };

  const [openModal, setOpenModal] = useState(false);

  const [selectedRow, setSelectedRow] = useState<string>('');

  const handleRowClick = (row: any) => {
    setSelectedRow(row.maGiangVien);
    setOpenModal(true);
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
      <div className='mt-4 flex space-x-5'>
        <Button type='submit' color='failure'>
          Lưu
        </Button>
        <Button className='bg-sidebar' onClick={onDeleteCourse}>Xóa</Button>
      </div>
    </form>
  );
};

export default EditCourseForm;
