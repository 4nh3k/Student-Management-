import { URL_GET_THONG_TIN_DANG_KY_HOC_PHAN } from 'src/constants/url';
import { CourseRegistered } from 'src/types/course-registed.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const courseRegistrationApi = {
  getAllSemeseterStudentLearning(
    id: number,
    offset: number,
    limit: number,
    signal?: AbortSignal
  ) {
    {
      const urlWithParams = `${URL_GET_THONG_TIN_DANG_KY_HOC_PHAN}?offset=${offset}&limit=${limit}`;
      const rawBody = {
        filterBy: {
          maSinhVien: id
        }
      };
      return http.post<SuccessResponse<CourseRegistered[]>>(
        urlWithParams,
        rawBody,
        {
          signal
        }
      );
    }
  }
};
