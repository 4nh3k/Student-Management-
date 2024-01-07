import { useQuery } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import { useState } from 'react';
import { studentApi } from 'src/apis/student.api';
import { tuitionFeeApi } from 'src/apis/tution-fee.api';
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

  const feeDataIndex = {
    totalCredit: 'Số TC học phí',
    tuitionAcrodintToRegulation: 'Học phí theo quy định',
    fee: 'Học phí phải đóng',
    paidFee: 'Học phí đã đóng',
    remainer: 'Số tiền dư',
    deadline: 'Hạn đóng'
  };

  const [semester, setSemester] = useState<number>(1);
  const [year, setYear] = useState<string>('2023-2024');

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

  const { data: feeData, isLoading: studentFeeIsLoading } = useQuery({
    queryKey: ['studentFee', id, currentSemester?.maHocKyNamHoc],
    queryFn: ({ signal }) =>
      tuitionFeeApi.getStudentTutionFee(
        0,
        100,
        id,
        currentSemester?.maHocKyNamHoc,
        signal
      ),
    enabled: !!currentSemester?.maHocKyNamHoc,
    select: data => {
      return {
        totalCredit: 22,
        tuitionAcrodintToRegulation:
          data.data.result[0].soTienHocPhiTheoQuyDinh,
        fee: data.data.result[0].soTienPhaiDong,
        paidFee: data.data.result[0].soTienDaDong,
        remainer: data.data.result[0].soTienDu,
        deadline: isoStringToDdMmYyyy(
          data.data.result[0].thoiDiemThanhToanHocPhi
        )
      };
    }
  });

  if (isLoadingStudentData || currentSemesterIsLoading || studentFeeIsLoading)
    return <div>Loading...</div>;
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

      {feeData && (
        <div id='latest-fee-info-container' className='mt-10 flex flex-col'>
          <span className='mb-5 ml-5 text-2xl font-semibold text-secondary'>
            THÔNG TIN HỌC PHÍ HỌC KỲ {semester} NĂM {year}
          </span>
          <Table>
            <Table.Body className='divide-y'>
              {Object.keys(feeDataIndex).map(key => (
                <Table.Row
                  key={key}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell className='w-96 whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {feeDataIndex[key as keyof typeof feeDataIndex]}
                  </Table.Cell>
                  <Table.Cell>
                    {feeData[key as keyof typeof feeData]}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
