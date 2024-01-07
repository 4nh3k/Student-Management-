import { useQuery } from '@tanstack/react-query';
import { tuitionFeeApi } from 'src/apis/tution-fee.api';
import LoadingIndicator from 'src/components/LoadingIndicator';
import StudentFeeInfoCard from 'src/components/StudentFeeInfoCard';
import { getProfileFromLS } from 'src/utils/auth';

const StudentFeeInfo = () => {
  const feeDataIndex = {
    totalCredit: 'Số TC học phí',
    fee: 'Học phí phải đóng',
    paidFee: 'Học phí đã đóng',
    remainer: 'Học phí còn nợ',
    deadline: 'Hạn đóng'
  };

  const feeData = {
    totalCredit: 22,
    fee: '16,000,000đ',
    paidFee: '16,000,000đ',
    remainer: '0đ',
    deadline: '15/11/2023'
  };
  const id = getProfileFromLS().userId;
  const { data: studentFeeData, isLoading: studentFeeIsLoading } = useQuery({
    queryKey: ['studentFee', id],
    queryFn: ({ signal }) =>
      tuitionFeeApi.getStudentTutionFee(0, 100, id, signal),
    enabled: !!id,
    select: data => {
      return data.data.result;
    }
  });
  if (studentFeeIsLoading) return <LoadingIndicator />;
  return (
    <div
      id='student-dashboard-container'
      className='w-full bg-white p-5 shadow-lg'
    >
      <div className='w-full text-center'>
        <span className='mb-5 text-3xl font-semibold uppercase text-primary'>
          Thông tin học phí
        </span>
      </div>
      {studentFeeData && (
        <div className='space-y-2'>
          {studentFeeData.map((item: TutionFee) => {
            return (
              <StudentFeeInfoCard key={item.maHocKyNamHoc} studentFee={item} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentFeeInfo;
