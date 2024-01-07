import {
  URL_CREATE_LECTURER,
  URL_DELETE_LECTURER,
  URL_GET_ALL_LECTURERS,
  URL_UPDATE_LECTURER
} from 'src/constants/url';
import CreateStudentDto from 'src/types/create-student.dto';
import CreateLecturerDto from 'src/types/create-lecturer.dto';
import Lecturer from 'src/types/lecturer.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const lecturerApi = {
  getAllLecturers(
    offset: number,
    limit: number,
    signal?: AbortSignal,
    id?: number
  ) {
    const rawBody = {
      filterBy: {
        maGiangVien: id
      }
    };
    const urlWithParams = `${URL_GET_ALL_LECTURERS}?offset=${offset}&limit=${limit}`;
    return http.post<SuccessResponse<Lecturer[]>>(urlWithParams, rawBody, {
      signal
    });
  },

  createLecturer(lecturer: CreateLecturerDto) {
    const rawBody = {
      itemsToAdd: [lecturer],
      returnJustIds: true
    };

    return http.post<SuccessResponse<CreateStudentDto>>(
      URL_CREATE_LECTURER,
      rawBody
    );
  },

  updateLecturer(lecturer: CreateLecturerDto, id?: number) {
    const rawBody = {
      filterBy: {
        maGiangVien: id
      },
      updateTo: lecturer
    };
    return http.put<SuccessResponse<CreateStudentDto>>(
      `${URL_UPDATE_LECTURER}`,
      rawBody
    );
  },

  deleteLecturer(id?: number) {
    const rawBody = {
      filterBy: {
        maGiangVien: id
      },
      returnJustIds: true
    };
    return http.delete<SuccessResponse<CreateStudentDto>>(
      `${URL_DELETE_LECTURER}`,
      {
        data: JSON.stringify(rawBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
