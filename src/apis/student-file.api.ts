import {
  URL_CREATE_STUDENT_FILES,
  URL_DELETE_STUDENT_FILES,
  URL_GET_ALL_STUDENT_FILES,
  URL_GET_ALL_STUDENT_FILE_TYPES,
  URL_UPDATE_STUDENT_FILES
} from 'src/constants/url';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';
import StudentFile from 'src/types/student-file.type';

export const studentFileApi = {
  getAllStudentFiles(offset: number, limit: number, id?: number) {
    const rawBody = {
      filterBy: {
        maHoSo: id
      }
    };
    const urlWithParams = `${URL_GET_ALL_STUDENT_FILES}?offset=${offset}&limit=${limit}`;
    return http.post<SuccessResponse<StudentFile[]>>(urlWithParams, rawBody);
  },

  getStudentFileByStudentId(offset: number, limit: number, studentId?: number) {
    const rawBody = {
      filterBy: {
        maSinhVien: studentId
      }
    };
    const urlWithParams = `${URL_GET_ALL_STUDENT_FILES}?offset=${offset}&limit=${limit}`;
    return http.post<SuccessResponse<StudentFile[]>>(urlWithParams, rawBody);
  },

  getAllStudentFileTypes(){
    return http.get<SuccessResponse<string[]>>(URL_GET_ALL_STUDENT_FILE_TYPES);
  },

  createStudentFile(studentFile: StudentFile) {
    const rawBody = {
      itemsToAdd: [studentFile],
      returnJustIds: true
    };

    return http.post<SuccessResponse<StudentFile>>(
      URL_CREATE_STUDENT_FILES,
      rawBody
    );
  },

  updateStudentFile(studentFile: StudentFile, id?: number) {
    const rawBody = {
      filterBy: {
        maHoSo: id
      },
      updateTo: studentFile
    };
    return http.put<SuccessResponse<StudentFile>>(
      `${URL_UPDATE_STUDENT_FILES}`,
      rawBody
    );
  },

  deleteStudentFile(id?: number) {
    const rawBody = {
      filterBy: {
        maHoSo: id
      },
      returnJustIds: true
    };
    return http.delete<SuccessResponse<StudentFile>>(
      `${URL_DELETE_STUDENT_FILES}`,
      {
        data: JSON.stringify(rawBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
