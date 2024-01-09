import {
  URL_CREATE_TEST_SCHEDULE,
  URL_DELETE_TEST_SCHEDULE,
  URL_GET_ALL_TEST_SCHEDULE,
  URL_UPDATE_TEST_SCHEDULE
} from 'src/constants/url';
import TestSchedule from 'src/types/test-schedule';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const testScheduleApi = {
  getAllTestSchedule(
    offset: number,
    limit: number,
    signal?: AbortSignal,
    id?: number
  ) {
    const rawBody = {
      filterBy: {
        maHocPhan: id
      }
    };
    console.log(rawBody);
    const urlWithParams = `${URL_GET_ALL_TEST_SCHEDULE}?offset=${offset}&limit=${limit}`;
    return http.post<SuccessResponse<TestSchedule[]>>(urlWithParams, rawBody, {
      signal
    });
  },

  createTestSchedule(testSchedule: Partial<TestSchedule>) {
    const rawBody = {
      itemsToAdd: [testSchedule],
      returnJustIds: true
    };

    return http.post<SuccessResponse<TestSchedule>>(
      URL_CREATE_TEST_SCHEDULE,
      rawBody
    );
  },

  updateTestSchedule(testSchedule: TestSchedule, id?: number) {
    const rawBody = {
      filterBy: {
        maBuoiThi: id
      },
      updateTo: testSchedule
    };
    return http.put<SuccessResponse<TestSchedule>>(
      `${URL_UPDATE_TEST_SCHEDULE}`,
      rawBody
    );
  },

  deleteTestSchedule(id?: number) {
    const rawBody = {
      filterBy: {
        maBuoiThi: id
      },
      returnJustIds: true
    };
    return http.delete<SuccessResponse<TestSchedule>>(
      `${URL_DELETE_TEST_SCHEDULE}`,
      {
        data: JSON.stringify(rawBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
