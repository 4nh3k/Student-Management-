import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { courseApi } from 'src/apis/course.api';
import { scheduleApi } from 'src/apis/schedule.api';
import LoadingIndicator from 'src/components/LoadingIndicator';
import useSemester from 'src/hooks/useSemester';
import HocPhan from 'src/types/hoc-phan.type';
import { Schedule } from 'src/types/schedule.type';

export default function ScheduleManagement() {
  const [date, setDate] = useState<Date>(new Date());
  const handleDateChange = (date: Date) => {
    setDate(date);
  };
  const { currentSemester, currentSemesterIsLoading } = useSemester();
  const { data: courseData, isLoading } = useQuery({
    queryKey: ['courses', 5],
    queryFn: ({ signal }) =>
      courseApi.getAllCourseDataInASemester(0, 10000, 5, signal),
    select: data => {
      return data.data.result;
    },
    enabled: !!currentSemester?.maHocKyNamHoc
  });

  const addScheduleMutation = useMutation({
    mutationFn: (data: Partial<HocPhan>) => scheduleApi.addSchedule(data),
    onSuccess: () => {
      toast.success('Thêm buổi học thành công');
    },
    onError: () => {
      toast.error('Thêm buổi học thất bại');
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: Partial<Schedule> = {
      maHocPhan: e.currentTarget.courseName.value,
      thuHoc: e.currentTarget.dateOfWeek.value,
      maPhongHoc: e.currentTarget.roomID.value,
      caHoc: e.currentTarget.phase.value,
      soTietHoc: e.currentTarget.classPeriod.value,
      soTuanHocCachNhau: e.currentTarget.weekSpacing.value
    };
    console.log(data);
    addScheduleMutation.mutate(data);
  };

  if (currentSemesterIsLoading || isLoading) return <LoadingIndicator />;
  return (
    <form
      id='add-course-container'
      className='mt-10 w-full bg-white p-5 shadow-lg'
      onSubmit={handleSubmit}
    >
      <div className='mt-4 grid grid-cols-3 gap-8'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='courseName' value='Mã học phần' />
          </div>
          <Select id='courseName' required>
            {courseData?.map((course: HocPhan) => {
              return (
                <option key={course.maHocPhan} value={course.maHocPhan}>
                  {course.maHocPhan} ({course.monHoc.tenMonHoc})
                </option>
              );
            })}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='dateOfWeek' value='Thứ học' />
          </div>
          <Select id='dateOfWeek' required>
            <option>Thứ 2</option>
            <option>Thứ 3</option>
            <option>Thứ 4</option>
            <option>Thứ 5</option>
            <option>Thứ 6</option>
            <option>Thứ 7</option>
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='roomID' value='Phòng thi' />
          </div>
          <Select id='roomID' required>
            <option>B.102</option>
            <option>B.502</option>
            <option>B.402</option>
            <option>C.113</option>
            <option>C.304</option>
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='phase' value='Ca học' />
          </div>
          <Select id='phase' required>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='classPeriod' value='Số tiết' />
          </div>
          <TextInput
            id='classPeriod'
            type='number'
            placeholder='Nhập tiết học, viết liền nhau'
            required
          />{' '}
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='weekSpacing' value='Học cách tuần' />
          </div>
          <Select id='weekSpacing' required>
            <option>Cách 1 tuần</option>
            <option>Cách 2 tuần</option>
          </Select>
        </div>
      </div>
      <div className='mt-4'>
        <Button type='submit' color='failure'>
          Thêm
        </Button>
      </div>
    </form>
  );
}
