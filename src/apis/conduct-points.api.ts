import {
  URL_CREATE_CONDUCT_POINTS,
  URL_DELETE_CONDUCT_POINTS,
  URL_GET_ALL_CONDUCT_POINTS,
  URL_UPDATE_CONDUCT_POINTS
} from 'src/constants/url';
import { SuccessResponse } from 'src/types/utils.type';
import ConductPoint from 'src/types/conduct-point.type';
import ConductPointDto from 'src/types/create-conduct-point.dto';
import http from 'src/utils/http';

export const conductPointApi = {
  getAllConductPoints(offset: number, limit: number, id?: number) {
    const rawBody = {
      filterBy: {
        maKetQuaRenLuyen: id
      }
    };
    const urlWithParams = `${URL_GET_ALL_CONDUCT_POINTS}?offset=${offset}&limit=${limit}`;
    return http.post<SuccessResponse<ConductPoint[]>>(urlWithParams, rawBody);
  },

  getAllConductPointOfAStudent(
    offset: number,
    limit: number,
    studentId?: number
  ) {
    const rawBody = {
      filterBy: {
        maSinhVien: studentId
      }
    };
    const urlWithParams = `${URL_GET_ALL_CONDUCT_POINTS}?offset=${offset}&limit=${limit}`;
    return http.post<SuccessResponse<ConductPoint[]>>(urlWithParams, rawBody);
  },

  createConductPoint(conductPoint: ConductPointDto) {
    const rawBody = {
      itemsToAdd: [conductPoint],
      returnJustIds: true
    };

    return http.post<SuccessResponse<ConductPointDto>>(
      URL_CREATE_CONDUCT_POINTS,
      rawBody
    );
  },

  updateConductPoint(conductPoint: ConductPoint, id?: number) {
    const rawBody = {
      filterBy: {
        maKetQuaRenLuyen: id
      },
      updateTo: conductPoint
    };
    return http.put<SuccessResponse<ConductPoint>>(
      `${URL_UPDATE_CONDUCT_POINTS}`,
      rawBody
    );
  },

  deleteConductPoint(id?: number) {
    const rawBody = {
      filterBy: {
        maKetQuaRenLuyen: id
      },
      returnJustIds: true
    };
    return http.delete<SuccessResponse<ConductPoint>>(
      `${URL_DELETE_CONDUCT_POINTS}`,
      {
        data: JSON.stringify(rawBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
