import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { courseApi } from 'src/apis/course.api';
import { scheduleApi } from 'src/apis/schedule.api';
import EditSchedule from 'src/components/EditSchedule/EditSchedule';
import LoadingIndicator from 'src/components/LoadingIndicator';
import Table from 'src/components/Table';
import HocPhan from 'src/types/hoc-phan.type';
import { Schedule } from 'src/types/schedule.type';

const headers = [
  { title: 'Mã buổi học', dataIndex: 'maBuoiHoc' },
  { title: 'Mã học phần', dataIndex: 'maHocPhan' },
  { title: 'Thứ', dataIndex: 'thuHoc' },
  { title: 'Phòng học', dataIndex: 'maPhongHoc' },
  { title: 'Ca học', dataIndex: 'caHoc' },
  { title: 'Tiết học', dataIndex: 'soTietHoc' },
  { title: 'Số tuần học cách nhau', dataIndex: 'soTuanHocCachNhau' }
];

export default function ScheduleManagement() {
  const [date, setDate] = useState<Date>(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState<number | undefined>(undefined);
  const [search, setSearchVal] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };
  const handleSelectedValueChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
  };
  const { data: courseData, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: ({ signal }) => courseApi.getAllCourseData(0, 10000, signal),
    select: data => {
      return data.data.result;
    }
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
  const { data: scheduleData, isLoading: isLoadingSchedule } = useQuery({
    queryKey: ['schedules'],
    queryFn: ({ signal }) => scheduleApi.getAllSchedule(),
    select: data => {
      return data.data.result;
    }
  });
  const onRowClick = (record: any) => {
    console.log(record);
    setId(record.maBuoiHoc);
    setOpenModal(true);
  };
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

  if (isLoading || isLoadingSchedule) return <LoadingIndicator />;
  console.log(scheduleData);
  return (
    <div>
      <div
        id='student-course-container'
        className='w-full bg-white p-5 shadow-lg'
      >
        <div id='input-row' className='flex items-center'>
          <div className='w-96'>
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
          <div className='ml-auto flex items-center'>
            <span className='mr-2 text-gray-500'>Hiển thị</span>
            <Select
              id='pageSize'
              value={pageSize}
              onChange={e => setPageSize(+e.target.value)}
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </Select>
            <span className='ml-2 text-gray-500'>kết quả</span>
          </div>
        </div>
        {!isLoadingSchedule && scheduleData && (
          <Table
            headers={headers}
            data={scheduleData}
            className='border-input mt-2 border-2'
            pageSize={pageSize}
            onRowClick={onRowClick}
            filters={{ [selectedValue]: search }}
          />
        )}
      </div>
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
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Sửa/Xoá lịch thi</Modal.Header>
        <Modal.Body>
          <EditSchedule id={id} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
