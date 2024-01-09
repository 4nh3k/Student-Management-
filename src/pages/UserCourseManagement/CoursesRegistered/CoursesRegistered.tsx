import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { courseRegistrationApi } from 'src/apis/course-registration.api';
import LoadingIndicator from 'src/components/LoadingIndicator';
import Table from 'src/components/Table';
import { Header } from 'src/components/Table/Table';
import useSemester from 'src/hooks/useSemester';
import { getProfileFromLS } from 'src/utils/auth';
import { isoStringToDdMmYyyy } from 'src/utils/utils';

const headers: Header[] = [
  { title: 'Mã lớp', dataIndex: 'ID' },
  { title: 'Môn học', dataIndex: 'courseName' },
  { title: 'Số TC', dataIndex: 'credits' },
  { title: 'Thời gian học', dataIndex: 'duration' },
  { title: 'Đã ĐK/Sĩ số', dataIndex: 'registered' }
];
interface TableData {
  ID: number;
  courseName: string;
  credits: number;
  duration: string;
  transcriptId: number;
  courseRegistrationID: number;
  registered: number;
}

export default function CoursesRegistered() {
  const [courseSelected, setCourseSelected] = useState<TableData[]>([]);

  const handleOnCheck = (row: TableData, checked: boolean) => {
    console.log(row, checked);
    if (checked) {
      setCourseSelected([...courseSelected, row]);
      return true;
    } else {
      setCourseSelected(courseSelected.filter(item => item.ID !== row.ID));
      return false;
    }
  };

  const {
    studentCurrentSemesterQuery,
    currentSemesterIsLoading,
    currentSemester
  } = useSemester();
  const { data: studentCurrentSemester, isLoading } =
    studentCurrentSemesterQuery;
  console.log(studentCurrentSemester);
  const queryClient = useQueryClient();

  const deleteCourseTranscriptMutation = useMutation({
    mutationFn: (id: number) =>
      courseRegistrationApi.removeCourseTranscript(id),
    onSuccess: () => {
      const id = getProfileFromLS().userId;
      queryClient.invalidateQueries({
        queryKey: [
          'studentCurrentSemester',
          id,
          currentSemester?.maHocKyNamHoc ?? 0
        ]
      });
      toast.success('Huỷ đăng ký môn học thành công');
    },
    onError: () => {
      toast.error('Huỷ đăng ký thất bại');
    }
  });

  const deleteCourseRegisteredMutation = useMutation({
    mutationFn: (data: { id: number; courseRegistrationID: number }) =>
      courseRegistrationApi.removeCourseRegistered(
        data.id,
        data.courseRegistrationID
      )
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    courseSelected.forEach(item => {
      console.log(item);
      deleteCourseRegisteredMutation.mutateAsync(
        {
          id: item.ID,
          courseRegistrationID: item.courseRegistrationID
        },
        {
          onSuccess: () => {
            console.log(item.transcriptId);
          },
          onError: () => {
            toast.error('Huỷ đăng ký thất bại');
          }
        }
      );
      deleteCourseTranscriptMutation.mutateAsync(item.transcriptId);
    });

    console.log(courseSelected);
  };

  if (isLoading || currentSemesterIsLoading) return <LoadingIndicator />;
  const data = studentCurrentSemester?.danhSachDangKyHocPhans.map(item => {
    return {
      ID: item.maHocPhan,
      courseName: item.hocPhan.monHoc.tenMonHoc,
      credits:
        item.hocPhan.monHoc.soTinChiLyThuyet +
        item.hocPhan.monHoc.soTinChiThucHanh,
      transcriptId: item.maBangDiemHocPhan,
      courseRegistrationID: item.maThongTinDangKyHocPhan,
      duration:
        isoStringToDdMmYyyy(item.hocPhan.thoiDiemBatDau) +
        ' - ' +
        isoStringToDdMmYyyy(item.hocPhan.thoiDiemKetThuc),
      registered: item.hocPhan.siSoSinhVien
    };
  });
  return (
    <div className=' w-full bg-white p-5 pb-20 shadow-lg'>
      <Table
        headers={headers}
        hasCheckbox={true}
        onCheck={handleOnCheck}
        checkedList={courseSelected}
        data={data}
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
          Huỷ đăng ký
        </Button>
      </form>
    </div>
  );
}
