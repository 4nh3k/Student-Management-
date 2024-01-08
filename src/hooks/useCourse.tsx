import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import HocPhan from 'src/types/hoc-phan.type';
import { courseApi } from 'src/apis/course.api';
import CreateHocPhanDto from 'src/types/create-hoc-phan.dto';

const useCourse = () => {
  const queryClient = useQueryClient();

  const createCourseMutation = useMutation({
    mutationFn: (body: CreateHocPhanDto) => courseApi.createCourse(body),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Thêm học phần mới thành công');
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error('Thêm học phần mới thất bại');
    }
  });

  const updateCourseMutation = useMutation({
    mutationFn: (data: { course: CreateHocPhanDto; id: number }) =>
      courseApi.updateCourse(data.course, data.id),
    onSuccess: data => {
      toast.success('Cập nhật học phần thành công');
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      console.log(data);
    },
    onError: (error: unknown) => {
      toast.error('Cập nhật học phần gặp lỗi !');
      console.log(error);
    }
  });

  const deleteCourseMutation = useMutation({
    mutationFn: (id: string) => courseApi.deleteCourse(id),
    onSuccess: data => {
      toast.success('Xóa học phần thành công!');
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      console.log(data);
    },
    onError: (error: unknown) => {
      toast.error('Xóa học phần gặp lỗi');
      console.log(error);
    }
  });

  return {
    createCourseMutation,
    updateCourseMutation,
    deleteCourseMutation
  };
};

export default useCourse;
