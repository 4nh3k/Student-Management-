import InfoCard from 'src/components/InfoCard/InfoCard';
import StudentCircle from 'src/assets/icons/student_circle.svg';
import LecturerCircle from 'src/assets/icons/lecturer_circle.svg';
import CourseCircle from 'src/assets/icons/courses_circle.svg';
import RevenueCircle from 'src/assets/icons/revenue_circle.svg';
import Breadcrumbs from 'src/components/Breadcrumb/Breadcrumb';

const Dashboard = () => {
  return (
    <div className='items-center'>
      <div id='main-body' className='space-y-5 p-10'>
        <Breadcrumbs separator={'>'} />
        <div className='flex space-x-5 '>
          <InfoCard
            icon_src={StudentCircle}
            label={'Sinh viên'}
            value={50000}
          />
          <InfoCard
            icon_src={LecturerCircle}
            label={'Giảng viên'}
            value={1500}
          />
          <InfoCard
            icon_src={CourseCircle}
            label={'Số môn học'}
            value={60000}
          />
          <InfoCard
            icon_src={RevenueCircle}
            label={'Tổng thu'}
            value={'2,000,000,000đ'}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
