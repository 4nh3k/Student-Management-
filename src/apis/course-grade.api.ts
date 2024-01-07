import {
  URL_GET_ALL_COURSES_GRADE,
  URL_GET_HOC_PHAN,
  URL_GET_MON_HOC
} from 'src/constants/url';
import DiemHocPhan from 'src/types/diem-hoc-phan.type';
import HocPhan from 'src/types/hoc-phan.type';
import MonHoc from 'src/types/mon-hoc.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const courseGradeApi = {
  getBangDiemHocPhan(
    id: number,
    offset: number,
    limit: number,
    signal?: AbortSignal
  ) {
    const rawBody = {
      filterBy: {
        maSinhVien: id
      }
    };
    const urlWithParams = `${URL_GET_ALL_COURSES_GRADE}?offset=${offset}&limit=${limit}`;
    return http.post<SuccessResponse<DiemHocPhan[]>>(urlWithParams, rawBody, {
      signal
    });
  },
  getHocPhanData(
    id: number,
    offset: number,
    limit: number,
    signal?: AbortSignal
  ) {
    const urlWithParams = `${URL_GET_HOC_PHAN}?offset=${offset}&limit=${limit}`;
    const rawBody = {
      filterBy: {
        maHocPhan: id
      }
    };
    return http.post<SuccessResponse<HocPhan[]>>(urlWithParams, rawBody, {
      signal
    });
  },
  getMonHocData(
    id: number,
    offset: number,
    limit: number,
    signal?: AbortSignal
  ) {
    const urlWithParams = `${URL_GET_MON_HOC}?offset=${offset}&limit=${limit}`;
    const rawBody = {
      filterBy: {
        maMonHoc: id
      }
    };
    return http.post<SuccessResponse<MonHoc>>(urlWithParams, rawBody, {
      signal
    });
  }
};
