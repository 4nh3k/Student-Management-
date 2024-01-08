import {
  URL_CREATE_HOC_PHAN,
  URL_DELETE_HOC_PHAN,
  URL_GET_ALL_HINH_THUC_THI,
  URL_GET_ALL_LOAI_HOC_PHAN,
  URL_GET_HOC_PHAN,
  URL_GET_MON_HOC,
  URL_UPDATE_HOC_PHAN
} from 'src/constants/url';
import HocPhan from 'src/types/hoc-phan.type';
import MonHoc from 'src/types/mon-hoc.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const courseApi = {
  getAllCourseData(
    offset: number,
    limit: number,
    maMonHoc?: number,
    signal?: AbortSignal
  ) {
    const urlWithParams = `${URL_GET_HOC_PHAN}?offset=${offset}&limit=${limit}`;
    const rawBody = {
      filterBy: {
        maMonHoc: maMonHoc
      }
    };
    return http.post<SuccessResponse<HocPhan[]>>(urlWithParams, rawBody, {
      signal
    });
  },

  createCourse(course: HocPhan) {
    const rawBody = {
      itemsToAdd: [course],
      returnJustIds: true
    };

    return http.post<SuccessResponse<HocPhan>>(URL_CREATE_HOC_PHAN, rawBody);
  },

  updateCourse(course: HocPhan, id?: number) {
    const rawBody = {
      filterBy: {
        maHocPhan: id
      },
      updateTo: course
    };
    return http.put<SuccessResponse<HocPhan>>(
      `${URL_UPDATE_HOC_PHAN}`,
      rawBody
    );
  },

  deleteCourse(id?: number) {
    const rawBody = {
      filterBy: {
        maHocPhan: id
      },
      returnJustIds: true
    };
    return http.delete<SuccessResponse<HocPhan>>(`${URL_DELETE_HOC_PHAN}`, {
      data: JSON.stringify(rawBody),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },

  getAllCourseDataInASemester(
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
  },

  getAllMonHocs(offset: number, limit: number, signal?: AbortSignal){
    const urlWithParams = `${URL_GET_MON_HOC}?offset=${offset}&limit=${limit}`;
    const rawBody = {
      filterBy: {}
    };
    return http.post<SuccessResponse<MonHoc[]>>(urlWithParams, rawBody, {
      signal
    });
  },

  getAllHinhThucThis(){
    return http.get<SuccessResponse<string[]>>(URL_GET_ALL_HINH_THUC_THI);
  },
  getAllLoaiHocPhans(){
    return http.get<SuccessResponse<string[]>>(URL_GET_ALL_LOAI_HOC_PHAN);
  }
};
