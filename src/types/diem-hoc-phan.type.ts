import Student from './student.type';

type DiemHocPhan = {
  maBangDiemHocPhan: number;
  maHocPhan: number;
  maSinhVien: number;
  diemQuaTrinh: number;
  diemGiuaKy: number;
  diemThucHanh: number;
  diemCuoiKy: number;
  danhSachDangKyHocPhan: null;
  hocPhan: null;
  sinhVien: Student | null;
};
export default DiemHocPhan;
