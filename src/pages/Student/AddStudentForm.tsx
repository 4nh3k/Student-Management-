import { useQuery } from '@tanstack/react-query';
import { Datepicker, Dropdown, FloatingLabel } from 'flowbite-react';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { studentApi } from 'src/apis/student.api';
import ImageLoader from 'src/components/ImageLoader/ImageLoader';

const AddStudentForm = () => {
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

  return (
    <div id='student-table-container' className='w-full bg-white p-5 shadow-lg'>
      <h1>Thêm sinh viên mới</h1>
      <div className='mt-4 grid grid-cols-4 gap-8'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='name' value='Tên' />
          </div>
          <TextInput
            id='name'
            type='text'
            placeholder='Nhập tên sinh viên'
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='gender' value='Giới tính' />
          </div>
          <Select id='gender' required>
            <option>Nam</option>
            <option>Nữ</option>
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='department' value='Ngày sinh' />
          </div>
          <Datepicker></Datepicker>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='department' value='Ngày nhập học' />
          </div>
          <Datepicker></Datepicker>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='faculty' value='Khoa' />
          </div>
          <Select id='faculty_selection' required>
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
          <Select id='major_selection' required>
            {!isMajorsLoading &&
              majors.map(major => (
                <option key={major.maChuyenNganh}>
                  {major.tenChuyenNganh}
                </option>
              ))}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='training_sys' value='Hệ đào tạo' />
          </div>
          <Select id='education_selection' required>
            {!isEducationTypeLoading &&
              educationTypeData.map(educationType => (
                <option key={educationType.maHeDaoTao}>
                  {educationType.tenHeDaoTao}
                </option>
              ))}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='address' value='Địa chỉ' />
          </div>
          <TextInput
            id='name'
            type='text'
            placeholder='Nhập địa chỉ sinh viên'
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='email' value='Email' />
          </div>
          <TextInput
            id='name'
            type='text'
            placeholder='Nhập email sinh viên'
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='phoneNumber' value='Số điện thoại' />
          </div>
          <TextInput
            id='name'
            type='text'
            placeholder='Nhập số điện thoại'
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='learning_state' value='Tình trạng học tập' />
          </div>
          <Select id='learning_state' required>
            <option key={'Đang học'}>Đang học</option>
            <option key={'Đã tốt nghiệp'}>Đã tốt nghiệp</option>
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='account' value='Số tài khoản định danh' />
          </div>
          <TextInput
            id='account'
            type='number'
            placeholder='Nhập số tài khoản định danh'
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
        <Button type='submit' className='bg-sidebar'>
          Mặc định
        </Button>
      </div>
    </div>
  );
};

export default AddStudentForm;
