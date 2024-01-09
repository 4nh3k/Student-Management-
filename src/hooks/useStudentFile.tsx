import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import StudentFile from 'src/types/student-file.type';
import { studentFileApi } from 'src/apis/student-file.api';

const useStudentFile = () => {
  const queryClient = useQueryClient();

  const createStudentFileMutation = useMutation({
    mutationFn: (body: StudentFile) => studentFileApi.createStudentFile(body),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      toast.success('Thêm hồ sơ mới thành công');
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error('Thêm hồ sơ thất bại');
    }
  });

  const updateStudentFileMutation = useMutation({
    mutationFn: (data: { studentFile: StudentFile; id: number }) =>
      studentFileApi.updateStudentFile(data.studentFile, data.id),
    onSuccess: data => {
      toast.success('Cập nhật hồ sơ thành công');
      queryClient.invalidateQueries({ queryKey: ['files'] });
      console.log(data);
    },
    onError: (error: unknown) => {
      toast.error('Cập nhật hồ sơ gặp lỗi !');
      console.log(error);
    }
  });

  const deleteStudentFileMutation = useMutation({
    mutationFn: (id: number) => studentFileApi.deleteStudentFile(id),
    onSuccess: data => {
      toast.success('Xóa hồ sơ thành công!');
      queryClient.invalidateQueries({ queryKey: ['files'] });
      console.log(data);
    },
    onError: (error: unknown) => {
      toast.error('Xóa hồ sơ gặp lỗi');
      console.log(error);
    }
  });

  return {
    createStudentFileMutation,
    updateStudentFileMutation,
    deleteStudentFileMutation
  };
};

export default useStudentFile;
