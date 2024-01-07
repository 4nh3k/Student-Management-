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
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const decapitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  const { data: majorsData, isLoading: isMajorsLoading } = useQuery({
    queryKey: ['majors'],
    queryFn: ({ signal }) => studentApi.getAllMajors(0, 1000, signal),
    staleTime: 1000 * 60 * 60
  });

  const majors = majorsData?.data.result;

  const { data: facultiesData, isLoading: isFacultyLoading } = useQuery({
    queryKey: ['faculties'],
    queryFn: ({ signal }) => studentApi.getAllFaculties(0, 1000, signal),
    staleTime: 1000 * 60 * 60
  });

  const faculties = facultiesData?.data.result;

  const { data: educationTypes, isLoading: isEducationTypeLoading } = useQuery({
    queryKey: ['educationTypes'],
    queryFn: ({ signal }) => studentApi.getAllEducationTypes(0, 1000, signal),
    staleTime: 1000 * 60 * 60
  });

  const educationTypeData = educationTypes?.data.result;

  const { data: learningStatusList, isLoading: isLoadingStatus } = useQuery({
    queryKey: ['status'],
    queryFn: ({ signal }) => studentApi.getAllLearningStatus(signal)
  });

  const learningStatuses = learningStatusList?.data.result;

  const { createStudentMutation } = useStudent();

  const [student, setStudent] = useState<CreateStudentDto>({
    hoTenSinhVien: '',
    maKhoaHoc: 1,
    maChuyenNganh: 1,
    maHeDaoTao: 5,
    tinhTrangHocTap: 'đang học',
    ngaySinh: new Date().toISOString(),
    gioiTinh: 'Nam',
    email: '',
    emailPassword: '',
    username: '',
    usernamePassword: '',
    soTaiKhoanNganHangDinhDanh: '',
    anhTheSinhVien: '',
    ngayNhapHoc: new Date().toISOString(),
    maSinhVien: 0
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
      tinhTrangHocTap: decapitalizeFirstLetter(e.target.value)
    }));
  };

  const [faculty, setFaculty] = useState<string>('Khoa học máy tính');

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    const selectedOption = faculties.find(
      faculty => faculty.tenKhoaDaoTao === value
    );
    setFaculty(value);
    setStudent(prevStudent => ({
      ...prevStudent,
      maKhoaHoc: selectedOption.maKhoaDaoTao
    }));
  };

  const [major, setMajor] = useState<string>('Khoa học máy tính');

  const handleMajorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    const selectedOption = majors.find(
      major => major.tenChuyenNganh === decapitalizeFirstLetter(value)
    );
    setMajor(value);
    setStudent(prevStudent => ({
      ...prevStudent,
      maChuyenNganh: selectedOption.maChuyenNganh,
      chuyenNganh: value
    }));
  };

  const [educationType, setEducationType] = useState<string>('đại trà');

  const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    const selectedOption = educationTypeData.find(
      education => education.tenHeDaoTao === decapitalizeFirstLetter(value)
    );
    setEducationType(value);
    setStudent(prevStudent => ({
      ...prevStudent,
      maHeDaoTao: selectedOption.maHeDaoTao,
      heDaoTao: decapitalizeFirstLetter(value)
    }));
    console.log(student);
  };

  const handleDateOfBirthChange = date => {
    console.log(date);
    setStudent(prevStudent => ({
      ...prevStudent,
      ngaySinh: date.toISOString()
    }));
  };

  const handleLearningStartDateChange = date => {
    console.log(date);
    setStudent(prevStudent => ({
      ...prevStudent,
      ngayNhapHoc: date.toISOString()
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted student:', student);
    createStudentMutation.mutate(student, {
      onSuccess: data => {
        setStudent({
          hoTenSinhVien: '',
          maKhoaHoc: 1,
          maChuyenNganh: 1,
          maHeDaoTao: 5,
          tinhTrangHocTap: 'đang học',
          ngaySinh: new Date().toLocaleDateString('en-GB'),
          gioiTinh: 'Nam',
          email: '',
          emailPassword: '',
          username: '',
          usernamePassword: '',
          soTaiKhoanNganHangDinhDanh: '',
          anhTheSinhVien: '',
          ngayNhapHoc: new Date().toLocaleDateString('en-GB'),
          maSinhVien: 0
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
      <h1>Thông tin sinh viên</h1>
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
            value={new Date(student.ngaySinh).toLocaleDateString('en-GB')}
            onSelectedDateChanged={handleDateOfBirthChange}
          ></Datepicker>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='start-learning-date' value='Ngày nhập học' />
          </div>
          <Datepicker
            id='ngayNhapHoc'
            value={new Date(student.ngayNhapHoc).toLocaleDateString('en-GB')}
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
                  {capitalizeFirstLetter(educationType.tenHeDaoTao)}
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
            {!isLoadingStatus &&
              learningStatuses.map(status => (
                <option key={status}>{capitalizeFirstLetter(status)}</option>
              ))}
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
            value={student.soTaiKhoanNganHangDinhDanh}
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
      <div className='mt-10 flex space-x-5'>
        <Button type='submit' color='failure'>
          Thêm
        </Button>
        {/* <Button type='submit' form='student-form' className='bg-sidebar'>
          Mặc định
        </Button> */}
      </div>
    </form>
  );
};

export default AddStudentForm;
