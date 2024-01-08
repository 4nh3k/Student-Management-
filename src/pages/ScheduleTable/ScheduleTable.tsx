import { useQuery } from '@tanstack/react-query';
import { Button, Label, Select, Table } from 'flowbite-react';
import { scheduleApi } from 'src/apis/schedule.api';
import { semesterApi } from 'src/apis/semester.api';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { Schedule } from 'src/types/schedule.type';
import { Semester } from 'src/types/semester.type';
import { getProfileFromLS } from 'src/utils/auth';
('use client');
const schedule = [
  { time: '7:30 - 8:15', lesson: 'Tiết 1' },
  { time: '8:15 - 9:00', lesson: 'Tiết 2' },
  { time: '9:00 - 9:45', lesson: 'Tiết 3' },
  { time: '10:00 - 10:45', lesson: 'Tiết 4' },
  { time: '10:45 - 11:30', lesson: 'Tiết 5' },
  { time: '13:00 - 13:45', lesson: 'Tiết 6' },
  { time: '13:45 - 14:30', lesson: 'Tiết 7' },
  { time: '14:30 - 15:15', lesson: 'Tiết 8' },
  { time: '15:30 - 16:15', lesson: 'Tiết 9' },
  { time: '16:15 - 17:00', lesson: 'Tiết 10' },
  { time: '17:45 - 20:45', lesson: 'Buổi tối' }
];
const headers = [
  'Thứ / Tiết',
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7'
];
const firstSecondTermValues = [
  { data: 'Học kỳ 1', value: 'kỳ 1' },
  { data: 'Học kỳ 2', value: 'kỳ 2' },
  { data: 'Học kỳ hè', value: 'kỳ hè' }
];
const ScheduleTable = () => {
  const id = getProfileFromLS().userId;

  const { data: semesterData, isLoading: isLoadingSemesterData } = useQuery({
    queryKey: ['semester'],
    queryFn: ({ signal }) => semesterApi.getAllSemester(0, 10000, signal),
    select: data => {
      const semester: Semester[] = data.data.result;
      console.log(semester);
      return semester;
    }
  });

  const { data: scheduleData, isLoading: isLoadingScheduleData } = useQuery({
    queryKey: ['schedule', id],
    queryFn: ({ signal }) => scheduleApi.getStudentSchedule(id, signal),
    select: data => {
      const schedule: Schedule[] = data.data.result;
      console.log(schedule);
      return schedule;
    }
  });

  if (isLoadingScheduleData) return <LoadingIndicator />;

  return (
    <div className='mt-10 w-full bg-white p-5 shadow-lg'>
      <div className='text-center'>
        <span className='mb-5  text-2xl font-semibold text-primary'>
          THỜI KHÓA BIỂU
        </span>
      </div>
      <div className='flex items-end space-x-4'>
        <div className='space-y-2'>
          <Label>Học kỳ</Label>
          <Select id='filter' required>
            {firstSecondTermValues.map(item => {
              return (
                <option key={item.value} value={item.value}>
                  {item.data}
                </option>
              );
            })}
          </Select>
        </div>

        <div className='space-y-2'>
          <Label>Năm học</Label>
          <Select id='filter' required>
            {semesterData
              ?.filter(
                (item, index, self) =>
                  self.findIndex(s => s.tenNamHoc === item.tenNamHoc) === index
              )
              .map(item => {
                return (
                  <option key={item.tenNamHoc} value={item.tenNamHoc}>
                    {item.tenNamHoc}
                  </option>
                );
              })}
          </Select>
        </div>
        <Button color='failure'>Xem</Button>
      </div>
      <Table className='mt-4 border bg-gray-100 text-center'>
        <Table.Head className='w-full'>
          {headers.map(header => (
            <Table.HeadCell className='' key={header}>
              {header}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className='divide-y'>
          {schedule.map((item, index) => (
            <Table.Row key={item.time} className='divide-x'>
              <Table.Cell className='py-2'>
                {item.lesson}
                <br />
                {item.time}
              </Table.Cell>
              {headers.slice(1).map(header => {
                const matchingData = scheduleData?.find(
                  data =>
                    data.thuHoc === header &&
                    data.soTietHoc &&
                    data.soTietHoc.includes(index.toString())
                );
                console.log(matchingData);
                if (
                  matchingData &&
                  matchingData.soTietHoc &&
                  matchingData.soTietHoc[0] === index.toString()
                ) {
                  return (
                    <Table.Cell
                      className='bg-white'
                      key={header}
                      rowSpan={matchingData.soTietHoc.length}
                    >
                      {matchingData.maHocPhan}
                      <br />
                      {matchingData.maPhongHoc}
                    </Table.Cell>
                  );
                } else if (
                  !matchingData?.soTietHoc?.includes(index.toString())
                ) {
                  return <Table.Cell key={header} />;
                }
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ScheduleTable;
