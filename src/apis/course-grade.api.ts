import { Transcript } from 'src/types/transcript.type';
import http from 'src/utils/http';

export const courseGradeApi = {
  getTranscriptBySemester(
    studentID: number,
    semesterID: number,
    signal?: AbortSignal
  ) {
    const urlWithParams = `/ket-qua-hoc-tap/bang-diem-chi-tiet?ma-sinh-vien=${studentID}&ma-hoc-ky-nam-hoc=${semesterID}`;
    return http.get<Transcript>(urlWithParams, { signal });
  }
};
