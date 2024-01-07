import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { studentApi } from 'src/apis/student.api';
import Student from 'src/types/student.type';
import CreateStudentDto from 'src/types/create-student.dto';

const useStudent = () => {
  const createStudentMutation = useMutation({
    mutationFn: (body: CreateStudentDto) => studentApi.createStudent(body),
    onSuccess: data => {
      toast.success('Thêm sinh viên mới thành công');
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error('Thêm sinh viên thất bại');
    }
  });

  return {
    createStudentMutation
  };
};

export default useStudent;
