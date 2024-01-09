import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { studentApi } from 'src/apis/student.api';
import Student from 'src/types/student.type';
import CreateStudentDto from 'src/types/create-student.dto';
import CreateLecturerDto from 'src/types/create-lecturer.dto';
import { lecturerApi } from 'src/apis/lecturer.api';
import CreateRewardDto from 'src/types/create-reward.dto';
import { rewardApi } from 'src/apis/reward.api';

const useReward = () => {
  const queryClient = useQueryClient();

  const createRewardMutation = useMutation({
    mutationFn: (body: CreateRewardDto[]) => rewardApi.createRewards(body),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['rewards'] });
      toast.success('Thêm khen thưởng mới thành công');
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error('Thêm khen thưởng mới thất bại');
    }
  });

  return {
    createRewardMutation,
  };
};

export default useReward;
