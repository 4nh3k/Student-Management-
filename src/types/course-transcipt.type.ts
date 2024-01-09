import Student from './student.type';

export type CourseTranscript = {
  maBangDiemHocPhan: number;
  maHocPhan: number;
  maSinhVien: number;
  diemQuaTrinh: number;
  diemGiuaKy: number;
  diemThucHanh: number;
  diemCuoiKy: number;
  diemTong: number;
  danhSachDangKyHocPhan: null;
  hocPhan: null;
  sinhVien: Student;
};
