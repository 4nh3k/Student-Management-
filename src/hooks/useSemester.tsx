import { useQuery } from '@tanstack/react-query';
import { courseRegistrationApi } from 'src/apis/course-registration.api';
import { semesterApi } from 'src/apis/semester.api';
import { getProfileFromLS } from 'src/utils/auth';

const useSemester = () => {
  const { data: currentSemester, isLoading: currentSemesterIsLoading } =
    useQuery({
      queryKey: ['currentSemester'],
      queryFn: ({ signal }) => semesterApi.getCurrentSemester(0, 100, signal),
      select: data => {
        return data.data.result[0];
      },
      staleTime: 1000 * 60 * 60
    });
  const studentID = getProfileFromLS().userId;
  const studentSemesterQuery = useQuery({
    queryKey: ['studentSemester', studentID],
    queryFn: ({ signal }) =>
      courseRegistrationApi.getAllSemeseterStudentLearning(
        studentID,
        0,
        10000,
        signal
      ),
    select: data => {
      return data.data.result;
    },
    enabled: false
  });
  return {
    currentSemester,
    currentSemesterIsLoading,
    studentSemesterQuery
  };
};

export default useSemester;
