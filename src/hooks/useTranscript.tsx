import { useQueries, useQuery } from '@tanstack/react-query';
import { courseGradeApi } from 'src/apis/course-grade.api';
import { studentApi } from 'src/apis/student.api';
import { Transcript } from 'src/types/transcript.type';
import { getProfileFromLS } from 'src/utils/auth';
import { capitalizeFirstLetter } from 'src/utils/utils';
import useSemester from './useSemester';

export const transcriptDataMapper = (transcript: Transcript) => {
  return [
    {
      ID: {
        content: (
          <p className='font-bold'>
            {capitalizeFirstLetter(transcript.hocKyNamHoc.tenHocKy)} - Năm học{' '}
            {transcript.hocKyNamHoc.tenNamHoc}
          </p>
        ),
        colSpan: 8
      }
    },
    ...transcript.danhSachBangDiemChiTietTungMonHoc.map(course => {
      return {
        ID: course.monHoc.maMonHoc,
        courseName: course.monHoc.tenMonHoc,
        credit: course.monHoc.soTinChiLyThuyet + course.monHoc.soTinChiThucHanh,
        progressGrade: course.diemQuaTrinh,
        midtermGrade: course.diemGiuaKy,
        practicalGrade: course.diemThucHanh,
        finalGrade: course.diemCuoiKy,
        averageGrade: course.diemTongKet
      };
    }),
    {
      ID: null,
      finalGrade: null,
      practicalGrade: null,
      midtermGrade: null,
      progressGrade: null,
      courseName: <p className='font-bold'>Trung bình học kỳ</p>,
      credit: {
        content: transcript.danhSachBangDiemChiTietTungMonHoc.reduce(
          (acc, item) =>
            acc + item.monHoc.soTinChiLyThuyet + item.monHoc.soTinChiThucHanh,
          0
        ),
        className: 'px-4 py-3 font-bold'
      },
      averageGrade: {
        content: transcript.diemTrungBinhHocKy,
        className: 'px-4 py-3 font-bold'
      }
    }
  ];
};

const useTranscript = () => {
  const semesterID = 55;
  const studentID = getProfileFromLS().userId;
  const { data: studentData, isLoading: studentIsLoading } = useQuery({
    queryKey: ['student', studentID],
    queryFn: ({ signal }) =>
      studentApi.getAllStudents(0, 10000, signal, studentID),
    select: data => {
      return data.data.result[0];
    }
  });

  const { studentSemesterQuery } = useSemester();
  const { data: studentSemesterData } = studentSemesterQuery;
  studentSemesterQuery.refetch();
  console.log(studentSemesterData);

  const { data: transcriptData, isLoading: isLoadingTranscriptData } =
    useQueries({
      queries:
        studentSemesterData?.map(semester => {
          return {
            queryKey: ['transcript', semester.maHocKyNamHoc],
            queryFn: () =>
              courseGradeApi.getTranscriptBySemester(
                studentID,
                semester.maHocKyNamHoc
              ),
            select: data => {
              return transcriptDataMapper(data.data);
            }
          };
        }) ?? [],
      combine: results => {
        const data = [...results.map(result => result.data)].flat();
        const sumProduct = data.reduce((accumulator, currentValue) => {
          if (currentValue && currentValue.ID === null) {
            const credit = currentValue.credit.content || 0;
            const averageGrade = currentValue.averageGrade.content || 0;
            accumulator += averageGrade * credit;
          }
          return accumulator;
        }, 0);
        const sumOfCredit = data.reduce((accumulator, currentValue) => {
          if (currentValue && currentValue.ID !== null) {
            accumulator += currentValue.credit || 0; // Assuming credit may be undefined or null
          }
          return accumulator;
        }, 0);
        const GPA = sumOfCredit === 0 ? 0 : sumProduct / sumOfCredit;

        return {
          data: [
            ...data,
            {
              ID: {
                content: <p className='font-bold'>Số tín chỉ đã học</p>,
                colSpan: 2
              },
              progressGrade: null,
              midtermGrade: null,
              practicalGrade: null,
              finalGrade: null,
              credit: <p className='font-bold'>{sumOfCredit}</p>,
              averageGrade: null
            },
            {
              ID: {
                content: <p className='font-bold'>Điểm chung bình chung</p>,
                colSpan: 2
              },
              progressGrade: null,
              midtermGrade: null,
              practicalGrade: null,
              finalGrade: null,
              credit: null,
              averageGrade: <p className='font-bold'>{GPA}</p>
            }
          ],
          isLoading: results.some(result => result.isLoading)
        };
      }
    });

  return {
    transcriptData,
    isLoadingTranscriptData,
    studentData,
    studentIsLoading
  };
};

export default useTranscript;
