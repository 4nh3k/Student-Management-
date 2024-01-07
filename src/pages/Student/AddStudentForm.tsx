import { useQuery } from '@tanstack/react-query';
import { Button, Datepicker, Label, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { studentApi } from 'src/apis/student.api';
import ImageLoader from 'src/components/ImageLoader/ImageLoader';
import useStudent from 'src/hooks/useStudent';
import CreateStudentDto from 'src/types/create-student.dto';

interface AddStudentFormProps {
  id?: string;
}

const AddStudentForm = ({ id }: AddStudentFormProps) => {
  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  console.log(id);
  const { data: majorsData, isLoading: isMajorsLoading } = useQuery({
    queryKey: ['majors'],
    queryFn: ({ signal }) => studentApi.getAllMajors(0, 1000, signal)
  });

  const majors = majorsData?.data.result;

  const { data: facultiesData, isLoading: isFacultyLoading } = useQuery({
    queryKey: ['faculties'],
    queryFn: ({ signal }) => studentApi.getAllFaculties(0, 1000, signal)
  });

  const faculties = facultiesData?.data.result;

  const { data: educationTypes, isLoading: isEducationTypeLoading } = useQuery({
    queryKey: ['educationTypes'],
    queryFn: ({ signal }) => studentApi.getAllEducationTypes(0, 1000, signal)
  });

  const educationTypeData = educationTypes?.data.result;

  const { createStudentMutation } = useStudent();

  const [student, setStudent] = useState<CreateStudentDto>({
    hoTenSinhVien: '',
    gioiTinh: 'Nam',
    ngaySinh: new Date().toLocaleDateString('en-GB'),
    maKhoaHoc: 1,
    maChuyenNganh: 1,
    chuyenNganh: 'Khoa học máy tính',
    maHeDaoTao: 0,
    heDaoTao: 'đại trà',
    email: '',
    tinhTrangHocTap: 'Đang học',
    soTKNganHangDinhDanh: '',
    ngayNhapHoc: new Date().toLocaleDateString('en-GB')
    //   anhTheSinhVien: string;
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setStudent(prevStudent => ({ ...prevStudent, [id]: value }));
  };

  const [gender, setGender] = useState<string>('Nam');

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
    setStudent(prevStudent => ({ ...prevStudent, gioiTinh: e.target.value }));
  };

  const [learningStatus, setLearningStatus] = useState<string>('Đang học');

  const handleLearningStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLearningStatus(e.target.value);
    setStudent(prevStudent => ({
      ...prevStudent,
      tinhTrangHocTap: e.target.value
    }));
  };

  const [faculty, setFaculty] = useState<string>('Khoa học máy tính');

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e?.target.selectedIndex;
    const value = e?.target.value;
    setFaculty(value);
    setStudent(prevStudent => ({ ...prevStudent, maKhoaHoc: key }));
  };

  const [major, setMajor] = useState<string>('Khoa học máy tính');

  const handleMajorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e?.target.selectedIndex;
    const value = e?.target.value;
    setMajor(value);
    setStudent(prevStudent => ({
      ...prevStudent,
      maChuyenNganh: key,
      chuyenNganh: value
    }));
  };

  const [educationType, setEducationType] = useState<string>('đại trà');

  const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.selectedIndex;
    const value = e?.target.value;
    setEducationType(value);
    console.log(value);
    setStudent(prevStudent => ({
      ...prevStudent,
      maHeDaoTao: key,
      heDaoTao: value
    }));
    console.log(student);
  };

  const handleDateOfBirthChange = date => {
    console.log(date);
    setStudent(prevStudent => ({
      ...prevStudent,
      ngaySinh: date.toLocaleDateString('en-GB')
    }));
  };

  const handleLearningStartDateChange = date => {
    console.log(date);
    setStudent(prevStudent => ({
      ...prevStudent,
      ngayNhapHoc: date.toLocaleDateString('en-GB')
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted student:', student);
    createStudentMutation.mutate(student, {
      onSuccess: data => {
        setStudent({
          hoTenSinhVien: '',
          gioiTinh: 'Nam',
          ngaySinh: new Date().toLocaleDateString('en-GB'),
          maKhoaHoc: 1,
          maChuyenNganh: 1,
          chuyenNganh: 'Khoa học máy tính',
          maHeDaoTao: 0,
          heDaoTao: 'đại trà',
          email: '',
          tinhTrangHocTap: 'Đang học',
          soTKNganHangDinhDanh: '',
          ngayNhapHoc: new Date().toLocaleDateString('en-GB')
        });
        setMajor('Khoa học máy tính');
        setFaculty('Khoa học máy tính');
        setEducationType('đại trà');
        setGender('Nam');
        setLearningStatus('Đang học');
      },
      onError: error => {
        toast.error(error.response.data.message);
      }
    });
  };

  return (
    <form
      id='student-form'
      className='w-full bg-white p-5 shadow-lg'
      onSubmit={onSubmit}
    >
      <h1>Thêm sinh viên mới</h1>
      <div className='mt-4 grid grid-cols-4 gap-8'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='name' value='Tên' />
          </div>
          <TextInput
            id='hoTenSinhVien'
            type='text'
            placeholder='Nhập tên sinh viên'
            value={student.hoTenSinhVien}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='gioiTinh' value='Giới tính' />
          </div>
          <Select
            id='gioiTinh'
            required
            value={gender}
            onChange={handleGenderChange}
          >
            <option>Nam</option>
            <option>Nữ</option>
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='ngaySinh' value='Ngày sinh' />
          </div>
          <Datepicker
            id='ngaySinh'
            value={student.ngaySinh}
            onSelectedDateChanged={handleDateOfBirthChange}
          ></Datepicker>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='start-learning-date' value='Ngày nhập học' />
          </div>
          <Datepicker
            id='ngayNhapHoc'
            value={student.ngayNhapHoc}
            onSelectedDateChanged={handleLearningStartDateChange}
          ></Datepicker>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='faculty' value='Khoa' />
          </div>
          <Select
            id='faculty-selection'
            required
            value={faculty}
            onChange={handleFacultyChange}
          >
            {!isFacultyLoading &&
              faculties.map(faculty => (
                <option key={faculty.maKhoaDaoTao}>
                  {faculty.tenKhoaDaoTao}
                </option>
              ))}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='major' value='Ngành' />
          </div>
          <Select
            id='major-selection'
            required
            value={major}
            onChange={handleMajorChange}
          >
            {!isMajorsLoading &&
              majors.map(major => (
                <option key={major.maChuyenNganh}>
                  {capitalizeFirstLetter(major.tenChuyenNganh)}
                </option>
              ))}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='education-types' value='Hệ đào tạo' />
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
                  {educationType.tenHeDaoTao}
                </option>
              ))}
          </Select>
        </div>
        {/* <div>
          <div className='mb-2 block'>
            <Label htmlFor='address' value='Địa chỉ' />
          </div>
          <TextInput
            id='address'
            type='text'
            placeholder='Nhập địa chỉ sinh viên'
            required
          />
        </div> */}
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='email' value='Email' />
          </div>
          <TextInput
            id='email'
            type='text'
            placeholder='Nhập email sinh viên'
            value={student.email}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* <div>
          <div className='mb-2 block'>
            <Label htmlFor='phoneNumber' value='Số điện thoại' />
          </div>
          <TextInput
            id='phoneNumber'
            type='text'
            placeholder='Nhập số điện thoại'
            required
          />
        </div> */}
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='learning_status' value='Tình trạng học tập' />
          </div>
          <Select
            id='learning-status'
            required
            value={learningStatus}
            onChange={handleLearningStatusChange}
          >
            <option key={'Đang học'}>Đang học</option>
            <option key={'Đã tốt nghiệp'}>Đã tốt nghiệp</option>
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='account' value='Số tài khoản định danh' />
          </div>
          <TextInput
            id='soTKNganHangDinhDanh'
            type='number'
            placeholder='Nhập số tài khoản định danh'
            value={student.soTKNganHangDinhDanh}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className='mt-5 flex items-center space-x-6 align-middle'>
        <ImageLoader></ImageLoader>
        <div className='flex flex-col space-y-2'>
          <Label
            htmlFor='studentImage'
            value='Tải ảnh sinh viên (150px X 150px)'
          />
          <div className='flex items-center space-x-3 align-middle'>
            <Button color='sidebar'>Chọn ảnh</Button>
            <span>Chựa chọn file</span>
          </div>
        </div>
      </div>
      <div className='mt-4 flex space-x-5'>
        <Button type='submit' color='failure'>
          Thêm
        </Button>
        <Button type='submit' form='student-form' className='bg-sidebar'>
          Mặc định
        </Button>
      </div>
    </form>
  );
};

export default AddStudentForm;
