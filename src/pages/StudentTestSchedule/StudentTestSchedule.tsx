import { useEffect, useMemo, useState } from 'react';

import { useQueries } from '@tanstack/react-query';
import { Label, Select } from 'flowbite-react';
import { testScheduleApi } from 'src/apis/test-schedule.api';
import LoadingIndicator from 'src/components/LoadingIndicator';
import Table from 'src/components/Table';
import useStudentSemeseterCourse from 'src/hooks/useStudentSemesterCourse';
import { calculateSemesterFilter, isoStringToDdMmYyyy } from 'src/utils/utils';
const headers = [
  { title: 'Mã lịch thi', dataIndex: 'examID' },
  { title: 'Mã môn học', dataIndex: 'courseID' },
  { title: 'Ngày thi', dataIndex: 'examDate' },
  { title: 'Phòng thi', dataIndex: 'roomID' },
  { title: 'Ca thi', dataIndex: 'examPhase' },
  { title: 'Thứ thi', dataIndex: 'examWeekday' },
  { title: 'Ghi chú', dataIndex: 'note' }
];

const firstSecondTermValues = [
  { data: 'Học kỳ 1', value: 'kỳ 1' },
  { data: 'Học kỳ 2', value: 'kỳ 2' },
  { data: 'Học kỳ hè', value: 'kỳ hè' }
];
const StudentTestSchedule = () => {
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
  const {
    maHocPhanList,
    semesterData,
    studentSemesterData,
    isLoadingSemesterData,
    isLoadingStudentSemester
  } = useStudentSemeseterCourse();

  const { data: testSchedulesData, isLoading: isLoadingtestSchedulesData } =
    useQueries({
      queries: maHocPhanList
        ? maHocPhanList?.map((item: number) => {
            return {
              queryKey: ['testSchedules', item],
              queryFn: ({ signal }) =>
                testScheduleApi.getAllTestSchedule(0, 1000, signal, item),
              select: data => {
                console.log(data.data.result, item);
                return data.data.result.map(testSchedule => {
                  return {
                    examID: testSchedule.maBuoiThi,
                    courseID: testSchedule.maHocPhan,
                    examDate: isoStringToDdMmYyyy(testSchedule.ngayThi),
                    roomID: testSchedule.maPhongThi,
                    examWeekday: testSchedule.thuThi,
                    examPhase: testSchedule.caThi,
                    note: testSchedule.ghiChu
                  };
                });
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
      console.log(
        data
          .map(item => item.danhSachDangKyHocPhans.map(i => i.maHocPhan))
          .flat()
      );
      setSelectedSemesterCourse(
        data
          .map(item => item.danhSachDangKyHocPhans.map(i => i.maHocPhan))
          .flat()
      );
    }
  }, [currentSemesterID, studentSemesterData]);

  if (
    isLoadingtestSchedulesData ||
    isLoadingSemesterData ||
    isLoadingStudentSemester
  )
    return <LoadingIndicator />;
  return (
    <div>
      <div
        id='student-course-container'
        className='w-full bg-white p-5 shadow-lg'
      >
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
        <Table
          headers={headers}
          data={testSchedulesData.filter(item =>
            selectedSemesterCourse.includes(item?.courseID)
          )}
          className='border-input mt-4 border-2'
        />
      </div>
    </div>
  );
};

export default StudentTestSchedule;
