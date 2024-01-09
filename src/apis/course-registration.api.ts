import {
  URL_CREATE_DANG_KY_HOC_PHAN,
  URL_GET_THONG_TIN_DANG_KY_HOC_PHAN,
  URL_REMOVE_BANG_DIEM,
  URL_REMOVE_DANG_KY_HOC_PHAN
} from 'src/constants/url';
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
  },
  getSemeseterStudentLearning(
    id: number,
    semesterId: number,
    signal?: AbortSignal
  ) {
    {
      const urlWithParams = `${URL_GET_THONG_TIN_DANG_KY_HOC_PHAN}?offset=${0}&limit=${10000}`;
      const rawBody = {
        filterBy: {
          maSinhVien: id,
          maHocKyNamHoc: semesterId
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
  },
  registerCourse(id: number, semesterId: number, courseIds: number[]) {
    {
      const itemsToAdd = courseIds.map(courseId => ({
        maSinhVien: id,
        maHocKyNamHoc: semesterId,
        hocLaiHayHocCaiThien: false,
        maHocPhan: courseId
      }));
      const rawBody = {
        itemsToAdd,
        returnJustIds: true
      };
      console.log(rawBody);
      return http.post<SuccessResponse<CourseRegistered[]>>(
        URL_CREATE_DANG_KY_HOC_PHAN,
        rawBody
      );
    }
  },
  removeCourseRegistered(courseId: number, courseRegistrationId: number) {
    const rawBody = {
      filterBy: {
        maThongTinDangKyHocPhan: courseRegistrationId,
        maHocPhan: courseId
      },
      returnJustIds: true
    };
    return http.delete<SuccessResponse<CourseRegistered[]>>(
      `${URL_REMOVE_DANG_KY_HOC_PHAN}`,
      { data: rawBody }
    );
  },
  removeCourseTranscript(transcriptID: number) {
    const rawBody = {
      filterBy: {
        maBangDiemHocPhan: transcriptID
      },
      returnJustIds: true
    };
    return http.delete<SuccessResponse<CourseRegistered[]>>(
      `${URL_REMOVE_BANG_DIEM}`,
      { data: rawBody }
    );
  }
};
