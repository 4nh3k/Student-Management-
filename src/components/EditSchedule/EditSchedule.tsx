import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { courseApi } from 'src/apis/course.api';
import { scheduleApi } from 'src/apis/schedule.api';
import HocPhan from 'src/types/hoc-phan.type';
import { Schedule } from 'src/types/schedule.type';
import LoadingIndicator from '../LoadingIndicator';

interface EditScheduleProps {
  id: number | undefined;
}

export default function EditSchedule({ id }: EditScheduleProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string | null>('');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('');
  const [selectedPhase, setSelectedPhase] = useState<string | null>('');
  const [selectedClassPeriod, setSelectedClassPeriod] = useState<string | null>(
    ''
  );
  const [selectedWeekSpacing, setSelectedWeekSpacing] = useState<string | null>(
    ''
  );
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
    updateScheduleMutation.mutate(data);
  };
  const queryClient = useQueryClient();
  const updateScheduleMutation = useMutation({
    mutationFn: (data: Schedule) => scheduleApi.updateSchedule(data, id),
    onSuccess: () => {
      toast.success('Sửa buổi học thành công');
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
    onError: () => {
      toast.error('Sửa buổi học thất bại');
    }
  });
  const deleteScheduleMutation = useMutation({
    mutationFn: (id: number) => scheduleApi.deleteSchedule(id),
    onSuccess: () => {
      toast.success('Xóa buổi học thành công');
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
    onError: () => {
      toast.error('Xóa buổi học thất bại');
    }
  });
  const onDeleteSchedule = () => {
    if (id) {
      deleteScheduleMutation.mutate(id);
    }
  };
  const { data: courseData, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: ({ signal }) => courseApi.getAllCourseData(0, 10000, signal),
    select: data => {
      return data.data.result;
    }
  });
  const { data: scheduleData, isLoading: isLoadingSchedule } = useQuery({
    queryKey: ['schedules', id],
    queryFn: ({ signal }) => scheduleApi.getScheduleById(id ?? 0),
    select: data => {
      return data.data.result[0];
    },
    enabled: !!id
  });

  useEffect(() => {
    if (scheduleData) {
      setSelectedCourseId(scheduleData.maHocPhan);
      setSelectedDate(scheduleData.thuHoc);
      setSelectedRoomId(scheduleData.maPhongHoc);
      setSelectedPhase(scheduleData.caHoc);
      setSelectedClassPeriod(scheduleData.soTietHoc);
      setSelectedWeekSpacing(scheduleData.soTuanHocCachNhau);
    }
  }, [scheduleData]);

  if (isLoading || isLoadingSchedule) return <LoadingIndicator />;
  return (
    <form id='add-course-container' onSubmit={handleSubmit}>
      <div className='mt-4 grid grid-cols-3 gap-8'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='courseName' value='Mã học phần' />
          </div>
          <Select
            id='courseName'
            value={selectedCourseId}
            onChange={e => setSelectedCourseId(+e.target.value)}
            required
          >
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
          <Select
            id='dateOfWeek'
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            required
          >
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
          <Select
            id='roomID'
            value={selectedRoomId}
            onChange={e => setSelectedRoomId(e.target.value)}
            required
          >
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
          <Select
            id='phase'
            value={selectedPhase}
            onChange={e => setSelectedPhase(e.target.value)}
            required
          >
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
            value={selectedClassPeriod}
            onChange={e => setSelectedClassPeriod(e.target.value)}
            placeholder='Nhập tiết học, viết liền nhau'
            required
          />{' '}
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='weekSpacing' value='Học cách tuần' />
          </div>
          <Select
            id='weekSpacing'
            value={selectedWeekSpacing}
            onChange={e => setSelectedWeekSpacing(e.target.value)}
            required
          >
            <option>Cách 1 tuần</option>
            <option>Cách 2 tuần</option>
          </Select>
        </div>
      </div>
      <div className='mt-6 flex space-x-4'>
        <Button type='submit' color='failure'>
          Lưu
        </Button>
        <Button onClick={onDeleteSchedule} className='bg-sidebar'>
          Xóa
        </Button>
      </div>
    </form>
  );
}
