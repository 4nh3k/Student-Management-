import {
  URL_CREATE_HOC_PHAN,
  URL_DELETE_HOC_PHAN,
  URL_GET_ALL_HINH_THUC_THI,
  URL_GET_ALL_LOAI_HOC_PHAN,
  URL_GET_HOC_PHAN,
  URL_GET_MON_HOC,
  URL_UPDATE_HOC_PHAN
} from 'src/constants/url';
import CreateHocPhanDto from 'src/types/create-hoc-phan.dto';
import HocPhan from 'src/types/hoc-phan.type';
import MonHoc from 'src/types/mon-hoc.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const courseApi = {
  getAllCourseData(
    offset: number,
    limit: number,
    signal?: AbortSignal,
    maHocPhan?: number
  ) {
    const urlWithParams = `${URL_GET_HOC_PHAN}?offset=${offset}&limit=${limit}`;
    const rawBody = {
      filterBy: {
        maHocPhan
      }
    };
    console.log(rawBody);
    return http.post<SuccessResponse<HocPhan[]>>(urlWithParams, rawBody, {
      signal
    });
  },

  createCourse(course: CreateHocPhanDto) {
    const rawBody = {
      itemsToAdd: [course],
      returnJustIds: true
    };

    return http.post<SuccessResponse<CreateHocPhanDto>>(
      URL_CREATE_HOC_PHAN,
      rawBody
    );
  },

  updateCourse(course: CreateHocPhanDto, id?: number) {
    const rawBody = {
      filterBy: {
        maHocPhan: id
      },
      updateTo: course,
      returnJustIds: true
    };

    console.log(rawBody);

    return http.put<SuccessResponse<CreateHocPhanDto>>(
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
    return http.delete<SuccessResponse<CreateHocPhanDto>>(
      `${URL_DELETE_HOC_PHAN}`,
      {
        data: JSON.stringify(rawBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
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

  getAllMonHocs(offset: number, limit: number, signal?: AbortSignal) {
    const urlWithParams = `${URL_GET_MON_HOC}?offset=${offset}&limit=${limit}`;
    const rawBody = {
      filterBy: {}
    };
    return http.post<SuccessResponse<MonHoc[]>>(urlWithParams, rawBody, {
      signal
    });
  },

  getAllHinhThucThis() {
    return http.get<SuccessResponse<string[]>>(URL_GET_ALL_HINH_THUC_THI);
  },
  getAllLoaiHocPhans() {
    return http.get<SuccessResponse<string[]>>(URL_GET_ALL_LOAI_HOC_PHAN);
  }
};
