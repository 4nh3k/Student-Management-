import { Semester } from './semester.type';
import Student from './student.type';

export default interface Reward {
  maKhenThuong: number;
  xepLoaiKhenThuong: string;
  maHocKyNamHoc: number;
  maSinhVien: number;
  hocKyNamHoc: Semester;
  sinhVien: Student;
}
