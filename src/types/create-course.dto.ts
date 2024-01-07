import CreateStudentDto from "./create-student.dto";

export default interface CreateCourseDto {
  maKhoaHoc: number;
  tenKhoaHoc: string;
  maCoVanHocTap: number;
  tenLopSinhHoatChung: string;
  coVanHocTap: unknown;
  sinhVien: Array<CreateStudentDto>;
}
