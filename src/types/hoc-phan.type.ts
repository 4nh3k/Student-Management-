import MonHoc from './mon-hoc.type';

type HocPhan = {
  maHocPhan: number;
  maMonHoc: number;
  maHeDaoTao: number;
  hinhThucThi: string;
  loaiHocPhan: string;
  maGiangVien: number;
  siSoSinhVien: number;
  thoiDiemBatDau: string;
  thoiDiemKetThuc: string;
  maHocKyNamHoc: number;
  ghiChu: string;
  bangDiemHocPhans: any[];
  buoiHocs: any[];
  buoiThis: any[];
  danhSachDangKyHocPhans: any[];
  giangVien: {
    maGiangVien: number;
    tenGiangVien: string;
    hocPhans: null;
    khoaHocs: any[];
  };
  heDaoTao: null;
  hocKyNamHoc: null;
  monHoc: MonHoc;
};
export default HocPhan;
