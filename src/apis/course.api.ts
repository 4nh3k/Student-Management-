import { URL_GET_HOC_PHAN } from 'src/constants/url';
import HocPhan from 'src/types/hoc-phan.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const courseApi = {
  getAllCourseData(
    offset: number,
    limit: number,
    maHocKyNamHoc: number | undefined,
    signal?: AbortSignal
  ) {
    const urlWithParams = `${URL_GET_HOC_PHAN}?offset=${offset}&limit=${limit}`;
    const rawBody = {
      filterBy: {
        maHocKyNamHoc
      }
    };
    return http.post<SuccessResponse<HocPhan[]>>(urlWithParams, rawBody, {
      signal
    });
  },
  getAllBuoiHocs(offset: number, limit: number, signal?: AbortSignal) {
    const urlWithParams = `${URL_GET_HOC_PHAN}?offset=${offset}&limit=${limit}`;
    const rawBody = {
      filterBy: {}
    };
    return http.post<SuccessResponse<HocPhan[]>>(urlWithParams, rawBody, {
      signal
    });
  }
};
