import { URL_GET_HOC_KY } from 'src/constants/url';
import HocPhan from 'src/types/hoc-phan.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';
import { calculateSemesterFilter } from 'src/utils/utils';

export const semesterApi = {
  getCurrentSemester(offset: number, limit: number, signal?: AbortSignal) {
    const urlWithParams = `${URL_GET_HOC_KY}?offset=${offset}&limit=${limit}`;
    const rawBody = calculateSemesterFilter();
    console.log(rawBody);
    return http.post<SuccessResponse<HocPhan[]>>(urlWithParams, rawBody, {
      signal
    });
  }
};
