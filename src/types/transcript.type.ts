import MonHoc from './mon-hoc.type';
import { Semester } from './semester.type';
import Student from './student.type';
interface BangDiemChiTietTungMonHoc {
  monHoc: MonHoc;
  diemQuaTrinh: number;
  diemThucHanh: number;
  diemGiuaKy: number;
  diemCuoiKy: number;
  diemTongKet: number;
}

export interface Transcript {
  sinhVien: Student;
  hocKyNamHoc: Semester;
  diemTrungBinhHocKy: number;
  danhSachBangDiemChiTietTungMonHoc: BangDiemChiTietTungMonHoc[];
}
