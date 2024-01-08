import { URL_CREATE_SCHEDULE } from 'src/constants/url';
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
  }
};
