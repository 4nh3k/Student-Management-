import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import TutionFee from 'src/types/tution-fee';
import { tuitionFeeApi } from 'src/apis/tution-fee.api';
import TestSchedule from 'src/types/test-schedule';
import { testScheduleApi } from 'src/apis/test-schedule.api';

const useTestSchdule = () => {
  const queryClient = useQueryClient();

  const createTestScheduleMutation = useMutation({
    mutationFn: (body: TestSchedule) =>
      testScheduleApi.createTestSchedule(body),
    onSuccess: data => {
      toast.success('Thêm buổi thi thành công');
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error('Thêm buổi thi thất bại');
    }
  });

  const updateTestScheduleMutation = useMutation({
    mutationFn: (data: { testSchedule: TestSchedule; id: number }) =>
      testScheduleApi.updateTestSchedule(data.testSchedule, data.id),
    onSuccess: data => {
      toast.success('Cập nhật buổi thi thành công');
      queryClient.invalidateQueries({ queryKey: ['testSchedules'] });
      console.log(data);
    },
    onError: (error: unknown) => {
      toast.error('Cập nhật buổi thi gặp lỗi !');
      console.log(error);
    }
  });

  // if the api bug, may consider change it to string params

  const deleteTestScheduleMutation = useMutation({
    mutationFn: (data: { id: number }) =>
    testScheduleApi.deleteTestSchedule(data.id),
    onSuccess: data => {
      toast.success('Xóa buổi thi thành công!');
      queryClient.invalidateQueries({ queryKey: ['fees'] });
      console.log(data);
    },
    onError: (error: unknown) => {
      toast.error('Xóa buổi thi gặp lỗi');
      console.log(error);
    }
  });

  return {
    createTestScheduleMutation,
    updateTestScheduleMutation,
    deleteTestScheduleMutation
  };
};

export default useTestSchdule;
