import { useQueries } from '@tanstack/react-query';
import { semesterApi } from 'src/apis/semester.api';
import { CourseRegistered } from 'src/types/course-registed.type';
import { Semester } from 'src/types/semester.type';
import useSemester from './useSemester';

const useStudentSemeseterCourse = () => {
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
  return {
    semesterData,
    isLoadingSemesterData,
    studentSemesterData,
    isLoadingStudentSemester,
    maHocPhanList
  };
};
export default useStudentSemeseterCourse;
