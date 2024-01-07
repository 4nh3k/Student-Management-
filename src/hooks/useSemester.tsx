import { useQuery } from '@tanstack/react-query';
import { semesterApi } from 'src/apis/semester.api';

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

  return { currentSemester, currentSemesterIsLoading };
};

export default useSemester;
