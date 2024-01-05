import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';
import Student from 'src/types/student.type';
import { URL_GET_ALL_STUDENTS } from 'src/constants/url';

export const studentApi = {
  getAllStudents(offset: number, limit: number, signal?: AbortSignal) {
    const rawBody = {
      filterBy: {}
    };
    const urlWithParams = `${URL_GET_ALL_STUDENTS}?offset=${offset}&limit=${limit}`;
    return http.post<SuccessResponse<{ result: Student[] }>>(
      urlWithParams,
      rawBody,
      {
        signal
      }
    );
  }
};
