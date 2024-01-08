import HocPhan from './hoc-phan.type';

export interface Schedule {
  maBuoiHoc: number;
  maHocPhan: number;
  thuHoc: string | null;
  caHoc: string | null;
  soTietHoc: string | null;
  soTuanHocCachNhau: string | null;
  maPhongHoc: string | null;
  hocPhan: HocPhan;
}
