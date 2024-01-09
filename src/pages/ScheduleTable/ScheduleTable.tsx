import { useQueries } from '@tanstack/react-query';
import { Label, Select, Table } from 'flowbite-react';
import { useEffect, useMemo, useState } from 'react';
import { scheduleApi } from 'src/apis/schedule.api';
import { semesterApi } from 'src/apis/semester.api';
import LoadingIndicator from 'src/components/LoadingIndicator';
import useSemester from 'src/hooks/useSemester';
import { CourseRegistered } from 'src/types/course-registed.type';
import { Schedule } from 'src/types/schedule.type';
import { Semester } from 'src/types/semester.type';
import { calculateSemesterFilter } from 'src/utils/utils';
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
  const currentSemester = calculateSemesterFilter();
  const [selectedTerm, setSelectedTerm] = useState(
    currentSemester.filterBy.tenHocKy
  );
  const [selectedYear, setSelectedYear] = useState(
    currentSemester.filterBy.tenNamHoc
  );
  const [selectedSemesterCourse, setSelectedSemesterCourse] = useState<
    number[]
  >([]);
  const { studentSemesterQuery } = useSemester();
  const { data: studentSemesterData, isLoading: isLoadingStudentSemester } =
    studentSemesterQuery;
  studentSemesterQuery.refetch();

  const { data: semesterData, isLoading: isLoadingSemesterData } = useQueries({
    queries: studentSemesterData
      ? studentSemesterData?.map((item: CourseRegistered) => {
          return {
            queryKey: ['semester', item.maHocKyNamHoc],
            queryFn: ({ signal }) =>
              semesterApi.getSemesterById(item.maHocKyNamHoc, signal),
            select: data => {
              const semester: Semester = data.data.result;
              return semester;
            }
          };
        })
      : [],
    combine: results => {
      return {
        data: results.map(result => result.data).flat(),
        isLoading: results.some(result => result.isLoading)
      };
    }
  });

  const maHocPhanList = studentSemesterData
    ?.map((item: CourseRegistered) =>
      item.danhSachDangKyHocPhans.map(i => i.maHocPhan)
    )
    .flat();
  const { data: scheduleData, isLoading: isLoadingScheduleData } = useQueries({
    queries: maHocPhanList
      ? maHocPhanList?.map((item: number) => {
          return {
            queryKey: ['schedule', item],
            queryFn: ({ signal }) =>
              scheduleApi.getCourseSchedule(item, signal),
            select: data => {
              const schedule: Schedule[] = data.data.result;
              return schedule;
            }
          };
        })
      : [],
    combine: results => {
      return {
        data: results.map(result => result.data).flat(),
        isLoading: results.some(result => result.isLoading)
      };
    }
  });
  const currentSemesterID = useMemo(() => {
    if (semesterData) {
      const currentSemester = semesterData.find(
        item =>
          item?.tenHocKy === selectedTerm && item?.tenNamHoc === selectedYear
      );
      return currentSemester?.maHocKyNamHoc;
    }
  }, [selectedTerm, selectedYear, semesterData]);

  useEffect(() => {
    if (studentSemesterData) {
      const data = studentSemesterData.filter(
        item => item?.maHocKyNamHoc === currentSemesterID
      );
      setSelectedSemesterCourse(
        data
          .map(item => item.danhSachDangKyHocPhans.map(i => i.maHocPhan))
          .flat()
      );
    }
  }, [currentSemesterID, studentSemesterData]);

  if (
    isLoadingScheduleData ||
    isLoadingSemesterData ||
    isLoadingStudentSemester
  )
    return <LoadingIndicator />;
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
          <Select
            id='filter'
            value={selectedTerm}
            onChange={e => setSelectedTerm(e.target.value)}
            required
          >
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
          <Select
            id='filter'
            required
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          >
            {semesterData &&
              semesterData
                ?.filter(
                  (item, index, self) =>
                    self.findIndex(s => s?.tenNamHoc === item?.tenNamHoc) ===
                    index
                )
                .map(item => {
                  return (
                    <option key={item?.tenNamHoc} value={item?.tenNamHoc}>
                      {item?.tenNamHoc}
                    </option>
                  );
                })}
          </Select>
        </div>
      </div>
      {selectedSemesterCourse.length === 0 && (
        <p className='mt-2'>Chưa có dữ liệu</p>
      )}
      {selectedSemesterCourse.length !== 0 && (
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
                      data?.thuHoc === header &&
                      data?.soTietHoc &&
                      data?.soTietHoc.includes(index.toString())
                  );
                  if (
                    matchingData &&
                    matchingData.soTietHoc &&
                    matchingData.soTietHoc[0] === index.toString() &&
                    selectedSemesterCourse.includes(matchingData.maHocPhan)
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
      )}
    </div>
  );
};

export default ScheduleTable;
