import Course from './course.type';

export default interface Student {
  maSinhVien: number;
  hoTenSinhVien: string;
  maKhoaHoc: number;
  maChuyenNganh: number;
  maHeDaoTao: number;
  tinhTrangHocTap: string;
  ngaySinh: string;
  gioiTinh: string;
  email: string;
  emailPassword: string;
  username: string;
  usernamePassword: string;
  soTKDinhDanh: string;
  anhTheSinhVien: string;
  bangDiemHocPhan: null;
  chuyenNganh: {
    khoaDaoTao: null;
    maChuyenNganh: number;
    maKhoaDaoTao: number;
    sinhViens: null;
    tenChuyenNganh: string;
  };
  heDaoTao: {
    hocPhans: [];
    maHeDaoTao: number;
    sinhViens: null;
    tenHeDaoTao: string;
  };
  hoSos: null;
  ketQuaHocTaps: null;
  ketQuaRenLuyens: null;
  khenThuongs: null;
  khoaHoc: Course;
  thongTinDangKyHocPhans: null;
  thongTinHocKyNamHocs: null;
  thongTinHocPhis: null;
}
