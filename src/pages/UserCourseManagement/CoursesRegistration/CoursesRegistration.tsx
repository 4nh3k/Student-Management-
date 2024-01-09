import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { courseRegistrationApi } from 'src/apis/course-registration.api';
import { courseApi } from 'src/apis/course.api';
import LoadingIndicator from 'src/components/LoadingIndicator';
import Table, { Header } from 'src/components/Table/Table';
import useSemester from 'src/hooks/useSemester';
import HocPhan from 'src/types/hoc-phan.type';
import { getProfileFromLS } from 'src/utils/auth';
import { capitalizeFirstLetter, isoStringToDdMmYyyy } from 'src/utils/utils';

interface TableData {
  ID: number;
  courseName: string;
  courseId: number;
  credits: number;
  duration: string;
  examType: string;
  registered: number;
  credit: {
    soTinChiLyThuyet: number;
    soTinChiThucHanh: number;
  };
}

export default function CoursesRegistration() {
  const [search, setSearchVal] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('ID');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleSelectedValueChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
  };
  const headers: Header[] = [
    { title: 'Mã lớp', dataIndex: 'ID' },
    { title: 'Môn học', dataIndex: 'courseName' },
    { title: 'Số TC', dataIndex: 'credits' },
    { title: 'Thời gian học', dataIndex: 'duration' },
    { title: 'Hình thức thi', dataIndex: 'examType' },
    { title: 'Đã ĐK/Sĩ số', dataIndex: 'registered' }
  ];

  const [courseSelected, setCourseSelected] = useState<TableData[]>([]);
  const id = getProfileFromLS().userId;
  const { currentSemester, currentSemesterIsLoading } = useSemester();
  console.log(id);
  const registerCourseMutation = useMutation({
    mutationFn: () =>
      courseRegistrationApi.registerCourse(
        id,
        currentSemester?.maHocKyNamHoc ?? 0,
        courseSelected.map(item => item.ID)
      ),
    onSuccess: () => {
      toast.success('Đăng ký thành công');
    },
    onError: () => {
      toast.error('Đăng ký thất bại');
    }
  });

  const { data: courseData, isLoading } = useQuery({
    queryKey: ['courses', 5],
    queryFn: ({ signal }) =>
      courseApi.getAllCourseDataInASemester(0, 10000, 5, signal),
    select: data => {
      return data.data.result.map((item: HocPhan) => {
        return {
          ID: item.maHocPhan,
          courseName: item.monHoc.tenMonHoc,
          credits:
            item.hinhThucThi === 'bài kiểm tra thực hành cuối kỳ'
              ? item?.monHoc?.soTinChiThucHanh
              : item?.monHoc?.soTinChiLyThuyet, // TODO: fix this later,
          credit: {
            soTinChiLyThuyet: item?.monHoc?.soTinChiLyThuyet,
            soTinChiThucHanh: item?.monHoc?.soTinChiThucHanh
          },
          courseId: item.monHoc.maMonHoc,
          duration: isoStringToDdMmYyyy(item.thoiDiemBatDau),
          examType: capitalizeFirstLetter(item.hinhThucThi),
          registered: item.siSoSinhVien
        };
      });
    },
    enabled: !!currentSemester?.maHocKyNamHoc
  });
  const isCourseSelected = (row: TableData): boolean => {
    return courseSelected.some(item => {
      console.log(item.courseId, row.courseId, item.examType, row.examType);
      return item.courseId === row.courseId && item.examType === row.examType;
    });
  };
  const checkNeedToRegister = () => {
    courseSelected.forEach(selectedCourse => {
      const { examType } = selectedCourse;
      console.log(selectedCourse);
      console.log(
        examType,
        selectedCourse.credit?.soTinChiLyThuyet,
        courseSelected.find(
          item =>
            item.examType === 'Bài kiểm tra lý thuyết cuối kỳ' &&
            item.courseId === selectedCourse.courseId
        )
      );
      if (
        examType === 'Bài kiểm tra thực hành cuối kỳ' &&
        selectedCourse.credit?.soTinChiLyThuyet &&
        !courseSelected.find(
          item =>
            item.examType === 'Bài kiểm tra lý thuyết cuối kỳ' &&
            item.courseId === selectedCourse.courseId
        )
      ) {
        toast.error('Bạn cần đăng ký học phần lý thuyết của môn học');
        return false;
      } else if (
        examType !== 'Bài kiểm tra thực hành cuối kỳ' &&
        selectedCourse.credit?.soTinChiThucHanh &&
        !courseSelected.find(
          item =>
            item.examType === 'Bài kiểm tra thực hành cuối kỳ' &&
            item.courseId === selectedCourse.courseId
        )
      ) {
        toast.error('Bạn cần đăng ký học phần thực hành của môn học');
        return false;
      }
    });
    return true;
  };
  const handleOnCheck = (row: TableData, checked: boolean) => {
    console.log(row, checked);
    if (checked) {
      if (isCourseSelected(row)) {
        toast.error('Môn học đã được chọn');
        return false;
      }
      console.log([...courseSelected, row]);
      setCourseSelected([...courseSelected, row]);
      return true;
    } else {
      console.log(courseSelected.filter(item => item.ID !== row.ID));
      setCourseSelected(courseSelected.filter(item => item.ID !== row.ID));
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkNeedToRegister()) {
      registerCourseMutation.mutate();
    }
    console.log(courseSelected);
  };

  if (isLoading || currentSemesterIsLoading) return <LoadingIndicator />;

  return (
    <div className=' w-full bg-white p-5 pb-20 shadow-lg'>
      <div className='flex'>
        <div className='w-full'>
          <TextInput
            placeholder='Tìm kiếm...'
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className='ml-4'>
          <Select
            id='filter'
            value={selectedValue}
            onChange={handleSelectedValueChange}
            required
          >
            {headers.map(header => {
              return (
                <option key={header.dataIndex} value={header.dataIndex}>
                  {header.title}
                </option>
              );
            })}
          </Select>
        </div>
      </div>
      <Table
        headers={headers}
        hasCheckbox={true}
        onCheck={handleOnCheck}
        checkedList={courseSelected}
        filters={{ [selectedValue]: search }}
        data={courseData}
        className='border-input mt-2 border-2'
      />
      <form
        onSubmit={handleSubmit}
        className=' fixed bottom-0 right-0 z-10 flex items-center  border-t border-solid border-gray-300 bg-gray-100 py-2 text-center lg:w-[calc(100%-16rem)]'
      >
        {courseSelected.length === 0 ? (
          <p className='ml-auto text-sm'>Vui lòng chọn lớp để xoá</p>
        ) : (
          <p className='ml-auto text-sm'>
            Đã chọn {courseSelected.length} môn học:{' '}
            {courseSelected.map(item => item.ID).join(', ')}
          </p>
        )}
        <Button type='submit' className='ml-auto mr-10' color='failure'>
          Đăng ký
        </Button>
      </form>
    </div>
  );
}
