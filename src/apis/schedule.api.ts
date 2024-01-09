import {
  URL_CREATE_SCHEDULE,
  URL_DELETE_SCHEDULE,
  URL_GET_ALL_SCHEDULE,
  URL_UPDATE_SCHEDULE
} from 'src/constants/url';
import { Schedule } from 'src/types/schedule.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const scheduleApi = {
  addSchedule(schedule: Partial<Schedule>) {
    const rawBody = {
      itemsToAdd: [schedule],
      returnJustIds: true
    };
    return http.post<SuccessResponse<Schedule>>(URL_CREATE_SCHEDULE, rawBody);
  },
  updateSchedule(schedule: Schedule, id?: number) {
    const rawBody = {
      filterBy: {
        maBuoiHoc: id
      },
      updateTo: schedule,
      returnJustIds: true
    };
    console.log(rawBody);
    return http.put<SuccessResponse<Schedule>>(URL_UPDATE_SCHEDULE, rawBody);
  },
  deleteSchedule(id: number) {
    const rawBody = {
      filterBy: {
        maBuoiHoc: id
      },
      returnJustIds: true
    };
    console.log(rawBody);
    return http.delete<SuccessResponse<Schedule>>(URL_DELETE_SCHEDULE, {
      data: rawBody
    });
  },
  getAllSchedule() {
    const urlWithParams = `${URL_GET_ALL_SCHEDULE}?offset=0&limit=10000`;
    const rawBody = {
      filterBy: {}
    };
    return http.post<SuccessResponse<Schedule[]>>(urlWithParams, rawBody);
  },
  getScheduleById(id: number) {
    const urlWithParams = `${URL_GET_ALL_SCHEDULE}?offset=0&limit=1000`;
    const rawBody = {
      filterBy: {
        maBuoiHoc: id
      }
    };
    return http.post<SuccessResponse<Schedule[]>>(urlWithParams, rawBody);
  },
  getCourseSchedule(id: number, signal?: AbortSignal) {
    const urlWithParams = `${URL_GET_ALL_SCHEDULE}?offset=0&limit=1000`;
    const rawBody = {
      filterBy: {
        maHocPhan: id
      }
    };
    console.log(rawBody);
    return http.post<SuccessResponse<Schedule[]>>(urlWithParams, rawBody, {
      signal
    });
  }
};
