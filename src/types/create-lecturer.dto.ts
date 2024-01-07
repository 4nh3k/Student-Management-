import CreateCourseDto from './create-course.dto';
import HocPhan from './hoc-phan.type';

export default interface CreateLecturerDto {
  maGiangVien: number;
  tenGiangVien: string;
  hocPhans: Array<HocPhan>;
  khoaHocs: Array<CreateCourseDto>;
}
