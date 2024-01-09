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

const useStudent = () => {
  const queryClient = useQueryClient();

  const createStudentMutation = useMutation({
    mutationFn: (body: CreateStudentDto) => studentApi.createStudent(body),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Thêm sinh viên mới thành công');
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error('Thêm sinh viên thất bại');
    }
  });

  const updateStudentMutation = useMutation({
    mutationFn: (data: { student: CreateStudentDto; id: number }) =>
      studentApi.updateStudent(data.student, data.id),
    onSuccess: data => {
      toast.success('Cập nhật thông tin sinh viên thành công');
      queryClient.invalidateQueries({ queryKey: ['students'] });
      console.log(data);
    },
    onError: (error: unknown) => {
      toast.error('Cập nhật sinh viên gặp lỗi !');
      console.log(error);
    }
  });

  const deleteStudentMutation = useMutation({
    mutationFn: (id: string) => studentApi.deleteStudent(id),
    onSuccess: data => {
      toast.success('Xóa sinh viên thành công!');
      queryClient.invalidateQueries({ queryKey: ['students'] });
      console.log(data);
    },
    onError: (error: unknown) => {
      toast.error('Xóa sinh viên gặp lỗi');
      console.log(error);
    }
  });

  const createStudentImageMutation = useMutation({
    mutationFn: (data: { id: string; image: File }) => studentApi.updateImageBook(data),
    onSuccess: data => {
      toast.success('Tạo ảnh thành công');
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error(error.respone.data.message);
    }
  });

  return {
    createStudentMutation,
    updateStudentMutation,
    deleteStudentMutation,
    createStudentImageMutation
  };
};

export default useStudent;
