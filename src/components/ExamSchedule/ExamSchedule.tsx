import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Datepicker, Label, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { courseApi } from 'src/apis/course.api';
import { testScheduleApi } from 'src/apis/test-schedule.api';
import useSemester from 'src/hooks/useSemester';
import HocPhan from 'src/types/hoc-phan.type';
import TestSchedule from 'src/types/test-schedule';
import { getWeekday } from 'src/utils/utils';
import LoadingIndicator from '../LoadingIndicator';

interface Props {
  id: number | undefined;
}

export default function ExamSchedule({ id }: Props) {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedCourse, setSelectedCourse] = useState<number>();
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [selectedPhase, setSelectedPhase] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const handleDateChange = (date: Date) => {
    setDate(date);
  };
  const queryClient = useQueryClient();
  const updateTestSchedule = useMutation({
    mutationFn: (data: TestSchedule) =>
      testScheduleApi.updateTestSchedule(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['testSchedules']
      });
      toast.success('Sửa lịch thi thành công');
    },
    onError: () => {
      toast.error('Sửa lịch thi thất bại');
    }
  });
  const deleteTestScheduleMutation = useMutation({
    mutationFn: (id: number) => testScheduleApi.deleteTestSchedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['testSchedules']
      });
      toast.success('Xoá thành công');
    },
    onError: () => {
      toast.error('Xoá thất bại');
    }
  });
  const onDeleteTestSchedule = () => {
    const confirmBox = window.confirm(
      'Bạn có thật sự muốn xóa buổi thi này không'
    );
    if (confirmBox === true) {
      deleteTestScheduleMutation.mutate(id ?? 0);
    }
  };

  const { data: testScheduleData, isLoading: isLoadingSchedule } = useQuery({
    queryKey: ['testSchedules', id],
    queryFn: () => testScheduleApi.getTestScheduleById(id),
    select: data => {
      return data.data.result[0];
    },
    enabled: !!id
  });

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

  useEffect(() => {
    if (testScheduleData) {
      setSelectedCourse(testScheduleData.maHocPhan);
      setSelectedRoom(testScheduleData.maPhongThi);
      setDate(new Date(testScheduleData.ngayThi));
      setSelectedPhase(testScheduleData.caThi);
      setNote(testScheduleData.ghiChu);
    }
  }, [testScheduleData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      maBuoiThi: id ?? 0,
      maHocPhan: e.currentTarget['courseName'].value,
      ngayThi: date.toISOString(),
      maPhongThi: e.currentTarget['roomID'].value,
      thuThi: e.currentTarget['examWeekday'].value,
      caThi: e.currentTarget['examPhase'].value,
      ghiChu: e.currentTarget['note'].value
    };
    updateTestSchedule.mutate(data);
  };
  if (currentSemesterIsLoading || isLoading || isLoadingSchedule)
    return <LoadingIndicator />;
  return (
    <form className=' min-h-[30rem]' onSubmit={handleSubmit}>
      <div className='grid grid-cols-3 gap-8'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='courseName' value='Mã học phần' />
          </div>
          <Select
            id='courseName'
            value={selectedCourse}
            onChange={e => setSelectedCourse(+e.target.value)}
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
            <Label htmlFor='examDate' value='Ngày thi' />
          </div>
          <Datepicker
            id='examDate'
            defaultDate={
              testScheduleData?.ngayThi
                ? new Date(testScheduleData.ngayThi)
                : new Date()
            }
            onSelectedDateChanged={handleDateChange}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='examWeekday' value='Thứ thi' />
          </div>
          <TextInput
            id='examWeekday'
            type='text'
            placeholder=''
            value={getWeekday(date)}
            required
            disabled={true}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='roomID' value='Phòng thi' />
          </div>
          <Select
            id='roomID'
            value={selectedRoom}
            onChange={e => setSelectedRoom(e.target.value)}
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
            <Label htmlFor='examPhase' value='Ca thi' />
          </div>
          <Select
            id='examPhase'
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
            <Label htmlFor='note' value='Ghi chú' />
          </div>
          <TextInput
            id='note'
            type='text'
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder='Nhập ghi chú'
          />
        </div>
      </div>
      <div className='mt-6 flex space-x-4'>
        <Button type='submit' color='failure'>
          Lưu
        </Button>
        <Button onClick={onDeleteTestSchedule} className='bg-sidebar'>
          Xóa
        </Button>
      </div>
    </form>
  );
}
