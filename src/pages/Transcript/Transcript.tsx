import { Link } from 'react-router-dom';
import LoadingIndicator from 'src/components/LoadingIndicator';
import Table, { Header } from 'src/components/Table/Table';
import path from 'src/constants/path';
import useTranscript from 'src/hooks/useTranscript';
import { isoStringToDdMmYyyy } from 'src/utils/utils';
// Now you can use 'data' and 'Header' in your application.

const header: Header[] = [
  { title: 'Mã HP', dataIndex: 'ID' },
  { title: 'Tên học phần', dataIndex: 'courseName' },
  { title: 'Tín chỉ', dataIndex: 'credit' },
  { title: 'Điểm QT', dataIndex: 'progressGrade' },
  { title: 'Điểm GK', dataIndex: 'midtermGrade' },
  { title: 'Điểm TH', dataIndex: 'practicalGrade' },
  { title: 'Điểm CK', dataIndex: 'finalGrade' },
  { title: 'Điểm HP', dataIndex: 'averageGrade' }
];

interface TranscriptProps {
  isPrint?: boolean;
}

function Transcript({ isPrint = false }: TranscriptProps) {
  const { data, isLoading, studentData, studentIsLoading } = useTranscript(8);
  if (isLoading || studentIsLoading) return <LoadingIndicator />;
  console.log(studentData);
  return (
    <div id='student-table-container' className='w-full bg-white p-5 shadow-lg'>
      <div className='relative'>
        <h1 className='w-full text-center text-2xl font-semibold'>Bảng điểm</h1>
        <div className='absolute right-0 top-0 ml-auto'>
          <Link
            hidden={isPrint}
            to={path.print_transcript}
            target='_blank'
            rel='noopener noreferrer'
            className='rounded-lg bg-primary px-2 py-1 font-normal text-white'
          >
            In bảng điểm
          </Link>
        </div>
      </div>
      <div className='mb-4 mt-6 grid grid-cols-6 gap-2 font-normal'>
        <span>Họ và tên:</span>
        <span className='font-bold'>{studentData?.hoTenSinhVien}</span>
        <span>Ngày sinh:</span>
        <span className='font-bold'>
          {isoStringToDdMmYyyy(studentData?.ngaySinh)}
        </span>
        <span>Giới tính:</span>
        <span className='font-bold'>{studentData?.gioiTinh}</span>
        <span>MSSV:</span>
        <span className='font-bold'>{studentData?.maSinhVien}</span>
        <span>Lớp:</span>
        <span className='font-bold'>
          {studentData?.khoaHoc?.tenLopSinhHoatChung}
        </span>
        <span>Khoa</span>
        <span className='font-bold'>{studentData?.khoaHoc.tenKhoaHoc}</span>
        <span>Bậc đào tạo</span>
        <span className='font-bold '>Đại học</span>
        <span>Hệ đào tạo</span>
        <span className='font-bold capitalize'>
          {studentData?.heDaoTao?.tenHeDaoTao}
        </span>
      </div>
      <Table data={data} headers={header} tableStyle='transcript' />
    </div>
  );
}

export default Transcript;
