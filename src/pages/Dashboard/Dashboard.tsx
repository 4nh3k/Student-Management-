import CourseCircle from 'src/assets/icons/courses_circle.svg';
import LecturerCircle from 'src/assets/icons/lecturer_circle.svg';
import RevenueCircle from 'src/assets/icons/revenue_circle.svg';
import StudentCircle from 'src/assets/icons/student_circle.svg';
import InfoCard from 'src/components/InfoCard/InfoCard';

const Dashboard = () => {
  return (
    <div id='student-table-container' className='w-full bg-white p-5 shadow-lg'>
    <div className='flex space-x-5 items-center justify-between'>
      <InfoCard icon_src={StudentCircle} label={'Sinh viên'} value={50000} />
      <InfoCard icon_src={LecturerCircle} label={'Giảng viên'} value={1500} />
      <InfoCard icon_src={CourseCircle} label={'Số môn học'} value={60000} />
      <InfoCard
        icon_src={RevenueCircle}
        label={'Tổng thu'}
        value={'2,000,000,000đ'}
      />
    </div>
    </div>
  );
};

export default Dashboard;
