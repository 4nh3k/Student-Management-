import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { studentApi } from 'src/apis/student.api';
import Student from 'src/types/student.type';
import CreateStudentDto from 'src/types/create-student.dto';

const useBook = () => {
  const createStudentMutation = useMutation({
    mutationFn: (body: CreateStudentDto) => studentApi.createBook(body)
  });

  return {
    createBookMutation
  };
};

export default useBook;
