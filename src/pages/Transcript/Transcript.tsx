import { Link } from 'react-router-dom';
import Table, { Header } from 'src/components/Table/Table';
import path from 'src/constants/path';

const data = [
  {
    ID: {
      content: 'Học kỳ 2 - Năm học 2023 - 2024',
      colSpan: 8,
      className: 'px-4 py-3 font-bold'
    }
  },
  {
    ID: 'IS201',
    courseName: 'Phân tích thiết kế hệ thống thông tin',
    credit: 4,
    progressGrade: null,
    midtermGrade: null,
    practicalGrade: 8,
    finalGrade: 7,
    averageGrade: 7.5
  },
  {
    ID: 'SE101',
    courseName: 'Phương pháp mô hình hóa',
    credit: 3,
    progressGrade: 7,
    midtermGrade: null,
    practicalGrade: null,
    finalGrade: 7,
    averageGrade: 7
  },
  {
    ID: 'SE104',
    courseName: 'Nhập môn Công nghệ phần mềm',
    credit: 4,
    progressGrade: null,
    midtermGrade: null,
    practicalGrade: 9,
    finalGrade: 9,
    averageGrade: 9
  },
  {
    ID: 'SE114',
    courseName: 'Nhập môn ứng dụng di động',
    credit: 3,
    progressGrade: null,
    midtermGrade: null,
    practicalGrade: 6,
    finalGrade: 9.5,
    averageGrade: 8.5
  },
  {
    ID: 'SE346',
    courseName: 'Lập trình trên thiết bị di động',
    credit: 4,
    progressGrade: null,
    midtermGrade: null,
    practicalGrade: 7.5,
    finalGrade: 7,
    averageGrade: 7.2
  },
  {
    ID: 'SS007',
    courseName: 'Triết học Mác – Lênin',
    credit: 3,
    progressGrade: 6,
    midtermGrade: null,
    practicalGrade: null,
    finalGrade: 8,
    averageGrade: 7
  },
  {
    ID: 'SS009',
    courseName: 'Chủ nghĩa xã hội khoa học',
    credit: 2,
    progressGrade: 9,
    midtermGrade: null,
    practicalGrade: null,
    finalGrade: 8.5,
    averageGrade: 8.8
  },
  {
    ID: null,
    courseName: {
      content: 'Trung bình học kỳ',
      className: 'px-4 py-3 font-bold'
    },
    credit: {
      content: 20,
      className: 'px-4 py-3 font-bold'
    },
    progressGrade: null,
    midtermGrade: null,
    practicalGrade: null,
    finalGrade: null,
    averageGrade: {
      content: 8,
      className: 'px-4 py-3 font-bold'
    }
  },
  {
    courseName: {
      content: 'Số tín chỉ đã học',
      colSpan: 2,
      className: 'px-4 py-3 font-bold'
    },
    credit: {
      content: 83,
      className: 'px-4 py-3 font-bold'
    },
    progressGrade: null,
    midtermGrade: null,
    practicalGrade: null,
    finalGrade: null,
    averageGrade: null
  },
  {
    courseName: {
      content: 'Số tín chỉ tích lũy',
      colSpan: 2,
      className: 'px-4 py-3 font-bold'
    },
    credit: {
      content: 83,
      className: 'px-4 py-3 font-bold'
    },
    progressGrade: null,
    midtermGrade: null,
    practicalGrade: null,
    finalGrade: null,
    averageGrade: null
  },
  {
    courseName: {
      content: 'Điểm trung bình chung',
      colSpan: 2,
      className: 'px-4 py-3 font-bold'
    },
    credit: null,
    progressGrade: null,
    midtermGrade: null,
    practicalGrade: null,
    finalGrade: null,
    averageGrade: {
      content: 8,
      colSpan: 2,
      className: 'px-4 py-3 font-bold'
    }
  },
  {
    courseName: {
      content: 'Điểm trung bình chung tích luỹ',
      colSpan: 2,
      className: 'px-4 py-3 font-bold'
    },
    credit: null,
    progressGrade: null,
    midtermGrade: null,
    practicalGrade: null,
    finalGrade: null,
    averageGrade: {
      content: 8,
      colSpan: 2,
      className: 'px-4 py-3 font-bold'
    }
  }
];

// Now you can use 'data' and 'Header' in your application.

const header: Header[] = [
  { title: 'Mã môn học', dataIndex: 'ID' },
  { title: 'Tên môn học', dataIndex: 'courseName' },
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
  return (
    <div id='student-table-container' className='w-full bg-white p-5 shadow-lg'>
      <div className='relative'>
        <h1 className='w-full text-center text-2xl font-semibold'>Bảng điểm</h1>
        <div className='absolute right-0 top-0 ml-auto'>
          <Link
            hidden={isPrint}
            to={path.print_transcript}
            className='rounded-lg bg-primary px-2 py-1 font-normal text-white'
          >
            In bảng điểm
          </Link>
        </div>
      </div>
      <div className='mb-4 mt-6 grid grid-cols-6 gap-2 font-normal'>
        <span>Họ và tên:</span>
        <span className='font-bold'>Nguyễn Văn A</span>
        <span>Ngày sinh:</span>
        <span className='font-bold'>01/01/2001</span>
        <span>Giới tính:</span>
        <span className='font-bold'>Nam</span>
        <span>MSSV:</span>
        <span className='font-bold'>19520000</span>
        <span>Lớp:</span>
        <span className='font-bold'>IS203</span>
        <span>Khoa</span>
        <span className='font-bold'>Công nghệ thông tin</span>
        <span>Bậc đào tạo</span>
        <span className='font-bold'>Đại học</span>
        <span>Hệ đào tạo</span>
        <span className='font-bold'>Chính quy</span>
      </div>
      <Table data={data} headers={header} tableStyle='transcript' />
    </div>
  );
}

export default Transcript;
