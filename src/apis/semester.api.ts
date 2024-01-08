import { URL_GET_HOC_KY } from 'src/constants/url';
import { Semester } from 'src/types/semester.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';
import { calculateSemesterFilter } from 'src/utils/utils';

export const semesterApi = {
  getCurrentSemester(offset: number, limit: number, signal?: AbortSignal) {
    const urlWithParams = `${URL_GET_HOC_KY}?offset=${offset}&limit=${limit}`;
    const rawBody = calculateSemesterFilter();
    console.log(rawBody);
    return http.post<SuccessResponse<Semester[]>>(urlWithParams, rawBody, {
      signal
    });
  },
  getSemesterById(id: number, signal?: AbortSignal) {
    const urlWithParams = `${URL_GET_HOC_KY}?offset=0&limit=1`;
    const rawBody = {
      filterBy: {
        maHocKyNamHoc: id
      }
    };
    console.log(rawBody);
    return http.post<SuccessResponse<Semester[]>>(urlWithParams, rawBody, {
      signal
    });
  },
  getAllSemester(offset: number, limit: number, signal?: AbortSignal) {
    const urlWithParams = `${URL_GET_HOC_KY}?offset=${offset}&limit=${limit}`;
    const rawBody = {
      filterBy: {}
    };
    return http.post<SuccessResponse<Semester[]>>(urlWithParams, rawBody, {
      signal
    });
  }
};
