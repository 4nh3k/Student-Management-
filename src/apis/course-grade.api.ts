import { URL_GET_ALL_COURSES_GRADE } from 'src/constants/url';
import { CourseTranscript } from 'src/types/course-transcipt.type';
import { Transcript } from 'src/types/transcript.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const courseGradeApi = {
  getTranscriptBySemester(
    studentID: number,
    semesterID: number,
    signal?: AbortSignal
  ) {
    const urlWithParams = `/ket-qua-hoc-tap/bang-diem-chi-tiet?ma-sinh-vien=${studentID}&ma-hoc-ky-nam-hoc=${semesterID}`;
    return http.get<Transcript>(urlWithParams, { signal });
  },
  getTranscriptByCourse(courseID: number, signal?: AbortSignal) {
    const urlWithParams = `${URL_GET_ALL_COURSES_GRADE}?offset=0&limit=10000`;
    const rawBody = {
      filterBy: {
        maHocPhan: courseID
      }
    };
    console.log(rawBody);
    return http.post<SuccessResponse<CourseTranscript[]>>(
      urlWithParams,
      rawBody,
      { signal }
    );
  },
  updateCourseTranscript(
    transcript: Partial<CourseTranscript>,
    signal?: AbortSignal
  ) {
    const urlWithParams = `/bang-diem-hoc-phan/update-many`;
    const rawBody = {
      filterBy: {
        maBangDiemHocPhan: transcript.maBangDiemHocPhan
      },
      updateTo: {
        maBangDiemHocPhan: transcript.maBangDiemHocPhan,
        maHocPhan: transcript.maHocPhan,
        maSinhVien: transcript.maSinhVien,
        diemQuaTrinh: transcript.diemQuaTrinh,
        diemGiuaKy: transcript.diemGiuaKy,
        diemThucHanh: transcript.diemThucHanh,
        diemCuoiKy: transcript.diemCuoiKy,
        diemTong: transcript.diemTong
      },
      returnJustIds: true
    };
    console.log(rawBody);
    return http.put<{
      numberOfRowsAffected: number;
      resultJustIds: number[];
    }>(urlWithParams, rawBody, { signal });
  }
};
