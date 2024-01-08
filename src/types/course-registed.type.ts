import HocPhan from './hoc-phan.type';

export interface CourseRegistered {
  maThongTinDangKyHocPhan: number;
  maHocKyNamHoc: number;
  maSinhVien: number;
  danhSachDangKyHocPhans: DangKyHocPhan[];
  hocKyNamHoc: any;
  sinhVien: any;
  thongTinHocKyNamHoc: any;
}

interface DangKyHocPhan {
  maThongTinDangKyHocPhan: number;
  maHocPhan: number;
  hocLaiHayHocCaiThien: boolean;
  maBangDiemHocPhan: number;
  bangDiemHocPhan: any;
  hocPhan: HocPhan;
  thongTinDangKyHocPhan: any;
}
