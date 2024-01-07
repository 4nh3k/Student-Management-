/* eslint-disable prettier/prettier */
import { URL_CREATE_FEE, URL_GET_ALL_FEES, URL_GET_TUTION_FEE, URL_UPDATE_FEE } from 'src/constants/url';
import TutionFee from 'src/types/tution-fee';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const tuitionFeeApi = {
  getStudentTutionFee(
    offset: number,
    limit: number,
    studentId: number,
    signal?: AbortSignal,
    semesterId?: number
  ) {
    const urlWithParams = `${URL_GET_TUTION_FEE}?offset=${offset}&limit=${limit}`;
    const rawBody = semesterId
      ? {
          filterBy: {
            maSinhVien: studentId,
            maHocKyNamHoc: semesterId
          }
        }
      : {
          filterBy: {
            maSinhVien: studentId
          }
        };
    console.log(rawBody);
    return http.post<SuccessResponse<TutionFee[]>>(urlWithParams, rawBody, {
      signal
    });
  },

  getAllTuitionFees(offset: number, limit: number, signal?: AbortSignal) {
    const urlWithParams = `${URL_GET_ALL_FEES}?offset=${offset}&limit=${limit}`;
    const rawBody = {
      filterBy: {

      }
    }
    return http.post<SuccessResponse<TutionFee[]>>(urlWithParams, rawBody, {
      signal
    });
  },

  createTuitionFee(studentFee: TutionFee) {
    const rawBody = {
      itemsToAdd: [studentFee],
      returnJustIds: true
    };

    return http.post<SuccessResponse<TutionFee>>(URL_CREATE_FEE, rawBody);
  },

  updateTuitionFee(
    studentFee: TutionFee,
    studentId: number,
    semesterId: number
  ) {
    const rawBody = {
      filterBy: {
        maSinhVien: studentId,
        maHocKyNamHoc: semesterId
      },
      updateTo: studentFee
    };
    return http.put<SuccessResponse<TutionFee>>(`${URL_UPDATE_FEE}`, rawBody);
  },

  deleteTuitionFee(studentId: number, semesterId: number) {
    const rawBody = {
      filterBy: {
        maSinhVien: studentId,
        maHocKyNamHoc: semesterId
      },
      returnJustIds: true
    };
    return http.delete<SuccessResponse<TutionFee>>(
      `${URL_UPDATE_FEE}`,
      {
        data: JSON.stringify(rawBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
