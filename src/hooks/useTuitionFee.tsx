import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import TutionFee from 'src/types/tution-fee';
import { tuitionFeeApi } from 'src/apis/tution-fee.api';

const useTuitionFee = () => {
  const queryClient = useQueryClient();

  const createTuitionFeeMutation = useMutation({
    mutationFn: (body: TutionFee) => tuitionFeeApi.createTuitionFee(body),
    onSuccess: data => {
      toast.success('Thêm học phí mới cho sinh viên thành công');
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error('Thêm học phí mới cho sinh viên thất bại');
    }
  });

  const updateTuitionFeeMutation = useMutation({
    mutationFn: (data: {
      tuitionFee: TutionFee;
      studentId: number;
      semesterId: number;
    }) =>
      tuitionFeeApi.updateTuitionFee(
        data.tuitionFee,
        data.studentId,
        data.semesterId
      ),
    onSuccess: data => {
      toast.success('Cập nhật thông tin học phí sinh viên thành công');
      queryClient.invalidateQueries({ queryKey: ['fees'] });
      console.log(data);
    },
    onError: (error: unknown) => {
      toast.error('Cập nhật thông tin học phí sinh viên gặp lỗi !');
      console.log(error);
    }
  });

  // if the api bug, may consider change it to string params

  const deleteTuitionFeeMutation = useMutation({
    mutationFn: (data: { studentId: number; semesterId: number }) =>
      tuitionFeeApi.deleteTuitionFee(data.studentId, data.semesterId),
    onSuccess: data => {
      toast.success('Xóa thông tin học phí sinh viên thành công!');
      queryClient.invalidateQueries({ queryKey: ['fees'] });
      console.log(data);
    },
    onError: (error: unknown) => {
      toast.error('Xóa thông tin học phí sinh viên gặp lỗi');
      console.log(error);
    }
  });

  return {
    createTuitionFeeMutation,
    updateTuitionFeeMutation,
    deleteTuitionFeeMutation
  };
};

export default useTuitionFee;
