import { useQuery } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import { semesterApi } from 'src/apis/semester.api';
import { tuitionFeeApi } from 'src/apis/tution-fee.api';
import { Semester } from 'src/types/semester.type';
import { getProfileFromLS } from 'src/utils/auth';
import { isoStringToDdMmYyyy } from 'src/utils/utils';
import LoadingIndicator from '../LoadingIndicator';

interface StudentFeeInfoCardProp {
  semester?: Semester;
  studentFee?: TutionFee;
}

const StudentFeeInfoCard = ({
  semester,
  studentFee
}: StudentFeeInfoCardProp) => {
  const id = getProfileFromLS().userId;
  const { data: feeFetchData, isLoading: studentFeeIsLoading } = useQuery({
    queryKey: ['studentFee', id, semester?.maHocKyNamHoc],
    queryFn: ({ signal }) =>
      tuitionFeeApi.getStudentTutionFee(
        0,
        100,
        id,
        signal,
        semester?.maHocKyNamHoc ?? 0
      ),
    enabled: !!semester?.maHocKyNamHoc,
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

  const { data: semesterData, isLoading: isLoadingSemester } = useQuery({
    queryKey: ['semester', studentFee?.maHocKyNamHoc],
    queryFn: ({ signal }) =>
      semesterApi.getSemesterById(studentFee?.maHocKyNamHoc ?? 0, signal),
    enabled: !!studentFee?.maHocKyNamHoc,
    select: data => {
      return data.data.result[0];
    }
  });

  const feeDataIndex = {
    totalCredit: 'Số TC học phí',
    tuitionAcrodintToRegulation: 'Học phí theo quy định',
    fee: 'Học phí phải đóng',
    paidFee: 'Học phí đã đóng',
    remainer: 'Số tiền dư',
    deadline: 'Hạn đóng'
  };

  if (studentFeeIsLoading || isLoadingSemester)
    return <LoadingIndicator size='md' />;

  const feeData = feeFetchData ?? {
    tuitionAcrodintToRegulation: studentFee?.soTienHocPhiTheoQuyDinh,
    fee: studentFee?.soTienPhaiDong,
    paidFee: studentFee?.soTienDaDong,
    remainer: studentFee?.soTienDu,
    deadline: isoStringToDdMmYyyy(studentFee?.thoiDiemThanhToanHocPhi ?? '')
  };
  return (
    feeData && (
      <div id='latest-fee-info-container' className='mt-10 flex flex-col'>
        <span
          className={`mb-5 ml-5 text-2xl font-semibold ${
            semester ? 'capitalize' : ''
          } text-secondary`}
        >
          Thông tin học phí{' '}
          {semester ? semester?.tenHocKy : semesterData?.tenHocKy} năm{' '}
          {semester ? semester?.tenNamHoc : semesterData?.tenNamHoc}
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
                <Table.Cell>{feeData[key as keyof typeof feeData]}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  );
};

export default StudentFeeInfoCard;
