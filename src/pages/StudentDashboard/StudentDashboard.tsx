import { useQuery } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import { studentApi } from 'src/apis/student.api';
import LoadingIndicator from 'src/components/LoadingIndicator';
import StudentFeeInfoCard from 'src/components/StudentFeeInfoCard';
import useSemester from 'src/hooks/useSemester';
import Student from 'src/types/student.type';
import { getProfileFromLS } from 'src/utils/auth';
import { isoStringToDdMmYyyy } from 'src/utils/utils';

const StudentDashboard = () => {
  const id = getProfileFromLS().userId;
  const studentDataIndex = {
    studentName: 'Họ và tên',
    studentID: 'MSSV',
    dateOfBirth: 'Ngày sinh',
    major: 'Khoa',
    educationType: 'Hệ đào tạo',
    class: 'Lớp sinh hoạt'
  };

  const { data: studentData, isLoading: isLoadingStudentData } = useQuery({
    queryKey: ['student', id],
    queryFn: ({ signal }) => studentApi.getAllStudents(0, 1000, signal, id),
    select: data => {
      const student: Student = data.data.result[0];
      console.log(student);
      return {
        studentName: student.hoTenSinhVien,
        studentID: student.maSinhVien,
        dateOfBirth: isoStringToDdMmYyyy(student.ngaySinh),
        major: student.chuyenNganh.tenChuyenNganh,
        educationType: student.heDaoTao.tenHeDaoTao,
        class: student.khoaHoc.tenLopSinhHoatChung
        //status: student.t
      };
    }
  });
  const { currentSemester, currentSemesterIsLoading } = useSemester();

  if (isLoadingStudentData || currentSemesterIsLoading)
    return <LoadingIndicator />;
  return (
    <div
      id='student-dashboard-container'
      className='w-full bg-white p-5 shadow-lg'
    >
      <div id='student-basic-info-container' className='flex flex-col'>
        <span className='mb-5 text-center text-3xl font-semibold text-primary'>
          BẢNG ĐIỀU KHIỂN SINH VIÊN
        </span>
        <Table>
          <Table.Body className='divide-y'>
            {Object.keys(studentDataIndex).map(key => (
              <Table.Row
                key={key}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <Table.Cell className='w-96 whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {studentDataIndex[key as keyof typeof studentDataIndex]}
                </Table.Cell>
                <Table.Cell className='capitalize'>
                  {studentData && studentData[key as keyof typeof studentData]}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {currentSemester && <StudentFeeInfoCard semester={currentSemester} />}
    </div>
  );
};

export default StudentDashboard;
