import { useParams } from 'react-router-dom';
import {
  URL_CREATE_STUDENT,
  URL_DELETE_STUDENT,
  URL_GET_ALL_COURSES,
  URL_GET_ALL_EDUCATION_TYPES,
  URL_GET_ALL_FACULTY,
  URL_GET_ALL_LEARNING_STATUS,
  URL_GET_ALL_MAJORS,
  URL_GET_ALL_STUDENTS,
  URL_UPDATE_STUDENT
} from 'src/constants/url';
import Course from 'src/types/course.type';
import CreateStudentDto from 'src/types/create-student.dto';
import Major from 'src/types/major.type';
import Student from 'src/types/student.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const studentApi = {
  getAllStudents(
    offset: number,
    limit: number,
    signal?: AbortSignal,
    id?: number
  ) {
    const rawBody = {
      filterBy: {
        maSinhVien: id
      }
    };
    const urlWithParams = `${URL_GET_ALL_STUDENTS}?offset=${offset}&limit=${limit}`;
    return http.post<SuccessResponse<Student[]>>(urlWithParams, rawBody, {
      signal
    });
  },
  getAllCourses(offset: number, limit: number, signal?: AbortSignal) {
    const rawBody = {
      filterBy: {}
    };
    const urlWithParams = `${URL_GET_ALL_COURSES}?offset=${offset}&limit=${limit}`;
    return http.post<SuccessResponse<Course[]>>(urlWithParams, rawBody, {
      signal
    });
  },

  getAllMajors(offset: number, limit: number, signal?: AbortSignal) {
    const rawBody = {
      filterBy: {}
    };
    const urlWithParams = `${URL_GET_ALL_MAJORS}?offset=${offset}&limit=${limit}`;
    return http.post<SuccessResponse<Major[]>>(urlWithParams, rawBody, {
      signal
    });
  },

  getAllEducationTypes(offset: number, limit: number, signal?: AbortSignal) {
    const rawBody = {
      filterBy: {}
    };
    const urlWithParams = `${URL_GET_ALL_EDUCATION_TYPES}?offset=${offset}&limit=${limit}`;
    return http.post<SuccessResponse<Major[]>>(urlWithParams, rawBody, {
      signal
    });
  },

  getAllFaculties(offset: number, limit: number, signal?: AbortSignal) {
    const rawBody = {
      filterBy: {}
    };
    const urlWithParams = `${URL_GET_ALL_FACULTY}?offset=${offset}&limit=${limit}`;
    return http.post<SuccessResponse<Major[]>>(urlWithParams, rawBody, {
      signal
    });
  },

  getAllLearningStatus(signal?: AbortSignal) {
    const urlWithParams = `${URL_GET_ALL_LEARNING_STATUS}`;
    return http.get<SuccessResponse<string[]>>(urlWithParams, {
      signal
    });
  },

  createStudent(student: CreateStudentDto) {
    const rawBody = {
      itemsToAdd: [student],
      returnJustIds: true
    };

    return http.post<SuccessResponse<CreateStudentDto>>(
      URL_CREATE_STUDENT,
      rawBody
    );
  },

  updateStudent(student: CreateStudentDto, id?: number) {
    const rawBody = {
      filterBy: {
        maSinhVien: id
      },
      updateTo: student
    };
    return http.put<SuccessResponse<CreateStudentDto>>(
      `${URL_UPDATE_STUDENT}`,
      rawBody
    );
  },

  deleteStudent(id?: number) {
    const rawBody = {
      filterBy: {
        maSinhVien: id
      },
      returnJustIds: true
    };
    return http.delete<SuccessResponse<CreateStudentDto>>(
      `${URL_DELETE_STUDENT}`,
      {
        data: JSON.stringify(rawBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
