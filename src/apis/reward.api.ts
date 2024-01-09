import {
  URL_CREATE_LECTURER,
  URL_DELETE_LECTURER,
  URL_GET_ALL_LECTURERS,
  URL_GET_KHEN_THUONG,
  URL_UPDATE_LECTURER,
  URL_XET_KHEN_THUONG
} from 'src/constants/url';
import CreateRewardDto from 'src/types/create-reward.dto';
import Lecturer from 'src/types/lecturer.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';
import Reward from 'src/types/reward.type';

export const rewardApi = {
  getAllReward(offset: number, limit: number, id?: number) {
    const rawBody = {
      filterBy: {
        // maKhenThuong: id
      }
    };
    console.log(rawBody);
    const urlWithParams = `${URL_GET_KHEN_THUONG}?offset=${offset}&limit=${limit}`;
    console.log(urlWithParams)
    return http.post<SuccessResponse<Reward[]>>(urlWithParams, rawBody);
  },

  getAllRewardOfAStudent(offset: number, limit: number, studentId?: number) {
    const rawBody = {
      filterBy: {
        maSinhVien: studentId
      }
    };
    console.log(rawBody);
    const urlWithParams = `${URL_GET_KHEN_THUONG}?offset=${offset}&limit=${limit}`;
    console.log(urlWithParams)
    return http.post<SuccessResponse<Reward[]>>(urlWithParams, rawBody);
  },

  createRewards(sinhViens: CreateRewardDto[]) {
    const rawBody = {
      danhSachXetKhenThuong: sinhViens
    };

    return http.post<SuccessResponse<Reward>>(URL_XET_KHEN_THUONG, rawBody);
  }

  //   createLecturer(lecturer: CreateLecturerDto) {
  //     const rawBody = {
  //       itemsToAdd: [lecturer],
  //       returnJustIds: true
  //     };

  //     return http.post<SuccessResponse<CreateStudentDto>>(
  //       URL_CREATE_LECTURER,
  //       rawBody
  //     );
  //   },

  //   updateLecturer(lecturer: CreateLecturerDto, id?: number) {
  //     const rawBody = {
  //       filterBy: {
  //         maGiangVien: id
  //       },
  //       updateTo: lecturer
  //     };
  //     return http.put<SuccessResponse<CreateStudentDto>>(
  //       `${URL_UPDATE_LECTURER}`,
  //       rawBody
  //     );
  //   },

  //   deleteLecturer(id?: number) {
  //     const rawBody = {
  //       filterBy: {
  //         maGiangVien: id
  //       },
  //       returnJustIds: true
  //     };
  //     return http.delete<SuccessResponse<CreateStudentDto>>(
  //       `${URL_DELETE_LECTURER}`,
  //       {
  //         data: JSON.stringify(rawBody),
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     );
  //   }
};
