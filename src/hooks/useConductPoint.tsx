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
import ConductPointDto from 'src/types/create-conduct-point.dto';
import { conductPointApi } from 'src/apis/conduct-points.api';
import ConductPoint from 'src/types/conduct-point.type';

const useConductPoint = () => {
  const queryClient = useQueryClient();

  const createConductPointMutation = useMutation({
    mutationFn: (body: ConductPointDto) => conductPointApi.createConductPoint(body),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['conductPoints'] });
      toast.success('Thêm điểm rèn luyện cho sinh viên thành công');
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error('Thêm điểm rèn luyện cho sinh viên thất bại');
    }
  });

  const updateConductPointMutation = useMutation({
    mutationFn: (data: { conductPoint: ConductPoint; id: number }) =>
      conductPointApi.updateConductPoint(data.conductPoint, data.id),
    onSuccess: data => {
      toast.success('Cập nhật thông tin điểm rèn luyện thành công');
      queryClient.invalidateQueries({ queryKey: ['conductPoints'] });
      console.log(data);
    },
    onError: (error: unknown) => {
      toast.error('Cập nhật thông tin điểm rèn luyện gặp lỗi !');
      console.log(error);
    }
  });

  const deleteConductPointMutation = useMutation({
    mutationFn: (id: number) => conductPointApi.deleteConductPoint(id),
    onSuccess: data => {
      toast.success('Xóa thông tin điểm rèn luyện thành công!');
      queryClient.invalidateQueries({ queryKey: ['conductPoints'] });
      console.log(data);
    },
    onError: (error: unknown) => {
      toast.error('Xóa thông tin điểm rèn luyện gặp lỗi');
      console.log(error);
    }
  });

  return {
    createConductPointMutation,
    updateConductPointMutation,
    deleteConductPointMutation
  };
};

export default useConductPoint;
