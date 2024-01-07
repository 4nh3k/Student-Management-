import {
  URL_CREATE_STUDENT,
  URL_GET_ALL_COURSES,
  URL_GET_ALL_EDUCATION_TYPES,
  URL_GET_ALL_FACULTY,
  URL_GET_ALL_MAJORS,
  URL_GET_ALL_STUDENTS
} from 'src/constants/url';
import Course from 'src/types/course.type';
import CreateStudentDto from 'src/types/create-student.dto';
import Major from 'src/types/major.type';
import Student from 'src/types/student.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const studentApi = {
  getStudent(id: number, signal?: AbortSignal) {
    const rawBody = {
      filterBy: {
        maSinhVien: id
      }
    };
    const urlWithParams = `${URL_GET_ALL_STUDENTS}?offset=${0}&limit=${10}`;
    return http.post<SuccessResponse<Student[]>>(urlWithParams, rawBody, {
      signal
    });
  },
  getAllStudents(offset: number, limit: number, signal?: AbortSignal) {
    const rawBody = {
      filterBy: {}
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
    return http.post<SuccessResponse<{ result: Major[] }>>(
      urlWithParams,
      rawBody,
      {
        signal
      }
    );
  },
  createStudent(student: CreateStudentDto) {
    return http.post<SuccessResponse<{ doc: CreateStudentDto }>>(
      URL_CREATE_STUDENT,
      student
    );
  }
};
