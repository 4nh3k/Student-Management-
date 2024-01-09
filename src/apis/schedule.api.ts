import { URL_CREATE_SCHEDULE, URL_GET_ALL_SCHEDULE } from 'src/constants/url';
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
  // cho dang ky hoc phan, tam thoi lay all
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
