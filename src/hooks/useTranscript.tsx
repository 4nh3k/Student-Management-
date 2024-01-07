import { useQueries, useQuery } from '@tanstack/react-query';
import { courseGradeApi } from 'src/apis/course-grade.api';
import { studentApi } from 'src/apis/student.api';
import DiemHocPhan from 'src/types/diem-hoc-phan.type';
import HocPhan from 'src/types/hoc-phan.type';
import { averageGrade, formatGrade } from 'src/utils/utils';

const useTranscript = (id: number) => {
  const { data: studentData, isLoading: studentIsLoading } = useQuery({
    queryKey: ['student', id],
    queryFn: ({ signal }) => studentApi.getStudent(id, signal),
    select: data => {
      return data.data.result[0];
    }
  });

  const { data: bangdiemData, isLoading: bangdiemIsLoading } = useQuery({
    queryKey: ['bangdiemhocphan', id],

    queryFn: ({ signal }) =>
      courseGradeApi.getBangDiemHocPhan(id, 0, 1000, signal),

    select: data => {
      console.log(data);
      return data.data.result;
    }
  });

  const { data: hocphanData, isLoading: hocphanIsLoading } = useQueries({
    queries: bangdiemData
      ? bangdiemData?.map((item: DiemHocPhan) => {
          return {
            queryKey: ['hocphan', item.maHocPhan],
            queryFn: ({ signal }) =>
              courseGradeApi.getHocPhanData(item.maHocPhan, 0, 10000, signal),
            select: data => {
              return data.data.result[0];
            }
          };
        })
      : [],
    combine: data => {
      return {
        data: data.map((item: any) => item.data),
        isLoading: data.map((item: any) => item.isLoading)
      };
    }
  });

  const isLoading =
    bangdiemIsLoading || hocphanIsLoading.some(item => item === true);
  if (isLoading) return { data: [], isLoading: true };
  else {
    console.log(bangdiemData, hocphanData);
    const data = bangdiemData.map((item: DiemHocPhan) => {
      const hocphan: HocPhan = hocphanData.find(
        item => item.maHocPhan === item.maHocPhan
      );
      console.log(hocphan);
      return {
        ID: item.maHocPhan,
        courseName: hocphan.monHoc.tenMonHoc,
        credit:
          hocphan.monHoc.soTinChiLyThuyet + hocphan.monHoc.soTinChiThucHanh,
        averageGrade: averageGrade([
          item.diemQuaTrinh,
          item.diemGiuaKy,
          item.diemThucHanh,
          item.diemCuoiKy
        ]),
        progressGrade: formatGrade(item.diemQuaTrinh),
        midtermGrade: formatGrade(item.diemGiuaKy),
        practicalGrade: formatGrade(item.diemThucHanh),
        finalGrade: formatGrade(item.diemCuoiKy)
      };
    });

    return {
      studentData,
      studentIsLoading,
      data,
      isLoading
    };
  }
};

export default useTranscript;
