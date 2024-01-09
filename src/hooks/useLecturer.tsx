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

const useLecturer = () => {
  const queryClient = useQueryClient();

  const createLecturerMutation = useMutation({
    mutationFn: (body: CreateLecturerDto) => lecturerApi.createLecturer(body),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['lecturers'] });
      toast.success('Thêm giảng viên mới thành công');
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error('Thêm giảng viên thất bại');
    }
  });

  const updateLecturerMutation = useMutation({
    mutationFn: (data: { lecturer: CreateLecturerDto; id: number }) =>
      lecturerApi.updateLecturer(data.lecturer, data.id),
    onSuccess: (data, params) => {
      toast.success('Cập nhật thông tin giảng viên thành công');
      queryClient.invalidateQueries({ queryKey: ['lecturers'] });
      queryClient.invalidateQueries({ queryKey: ['lecturer', params.id] });
      console.log(data);
    },
    onError: (error: unknown) => {
      toast.error('Cập nhật sinh viên gặp lỗi !');
      console.log(error);
    }
  });

  const deleteLecturerMutation = useMutation({
    mutationFn: (id: string) => lecturerApi.deleteLecturer(id),
    onSuccess: data => {
      toast.success('Xóa giảng viên thành công!');
      queryClient.invalidateQueries({ queryKey: ['lecturers'] });
      console.log(data);
    },
    onError: (error: unknown) => {
      toast.error('Xóa giảng viên gặp lỗi');
      console.log(error);
    }
  });

  return {
    createLecturerMutation,
    updateLecturerMutation,
    deleteLecturerMutation
  };
};

export default useLecturer;
