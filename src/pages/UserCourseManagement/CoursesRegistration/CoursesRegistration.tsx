import { useQuery } from '@tanstack/react-query';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import { courseApi } from 'src/apis/course.api';
import { semesterApi } from 'src/apis/semester.api';
import LoadingIndicator from 'src/components/LoadingIndicator';
import Table, { Header } from 'src/components/Table/Table';
import HocPhan from 'src/types/hoc-phan.type';

export default function CoursesRegistration() {
  const headers: Header[] = [
    { title: 'Mã lớp', dataIndex: 'ID' },
    { title: 'Môn học', dataIndex: 'courseName' },
    { title: 'Số TC', dataIndex: 'credits' },
    { title: 'Thời gian học', dataIndex: 'duration' },
    { title: 'Đã ĐK/Sĩ số', dataIndex: 'registered' }
  ];

  const [courseSelected, setCourseSelected] = useState<string[]>([]);

  const { data: semesterData, isLoading: isLoadingSemester } = useQuery({
    queryKey: ['currentSemester'],
    queryFn: ({ signal }) => semesterApi.getCurrentSemester(0, 1000, signal),
    select: data => {
      return data.data.result[0];
    }
  });
  const { data: courseData, isLoading } = useQuery({
    queryKey: ['courses', semesterData?.maHocKyNamHoc],
    queryFn: ({ signal }) =>
      courseApi.getAllCourseData(0, 10000, semesterData?.maHocKyNamHoc, signal),
    select: data => {
      return data.data.result.map((item: HocPhan) => {
        return {
          ID: item.maHocPhan,
          courseName: item.monHoc.tenMonHoc,
          credits:
            item.hinhThucThi === 'bài kiểm tra thực hành cuối kỳ'
              ? item?.monHoc?.soTinChiThucHanh
              : item?.monHoc?.soTinChiLyThuyet, // TODO: fix this later
          duration: item.thoiDiemBatDau,
          registered: item.siSoSinhVien
        };
      });
    },
    enabled: !!semesterData?.maHocKyNamHoc
  });

  const handleOnCheck = (row: any, checked: boolean) => {
    console.log(row, checked);
    if (checked) {
      setCourseSelected([...courseSelected, row.ID]);
    } else {
      setCourseSelected(courseSelected.filter(item => item !== row.ID));
    }
  };
  if (isLoading || isLoadingSemester) return <LoadingIndicator />;

  return (
    <div className=' w-full bg-white p-5 shadow-lg'>
      <Table
        headers={headers}
        hasCheckbox={true}
        onCheck={handleOnCheck}
        data={courseData}
        className='border-input mt-2 border-2'
      />
      <div className=' fixed bottom-0 right-0 z-10 flex items-center  border-t border-solid border-gray-300 bg-gray-100 py-2 text-center lg:w-[calc(100%-16rem)]'>
        {courseSelected.length === 0 ? (
          <p className='ml-auto text-sm'>Vui lòng chọn lớp để xoá</p>
        ) : (
          <p className='ml-auto text-sm'>
            Đã chọn {courseSelected.length} môn học: {courseSelected.join(', ')}
          </p>
        )}
        <Button className='ml-auto mr-10' color='failure'>
          Huỷ đăng ký
        </Button>
      </div>
    </div>
  );
}
