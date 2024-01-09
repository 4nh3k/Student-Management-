import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Select } from 'flowbite-react';
import { useEffect, useState } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { toast } from 'react-toastify';
import { courseGradeApi } from 'src/apis/course-grade.api';
import { courseApi } from 'src/apis/course.api';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { CourseTranscript } from 'src/types/course-transcipt.type';
import numberEditor from './numberEditor';

const columns = [
  { key: 'maBangDiemHocPhan', name: 'ID' },
  { key: 'hoTenSinhVien', name: 'Họ tên sinh viên' },
  { key: 'maSinhVien', name: 'Mã sinh viên' },
  { key: 'diemQuaTrinh', name: 'Điểm quá trình', renderEditCell: numberEditor },
  { key: 'diemGiuaKy', name: 'Điểm giữa kỳ', renderEditCell: numberEditor },
  { key: 'diemThucHanh', name: 'Điểm thực hành', renderEditCell: numberEditor },
  { key: 'diemCuoiKy', name: 'Điểm cuối kỳ', renderEditCell: numberEditor }
];
interface Row {
  maBangDiemHocPhan: number;
  maHocPhan: number;
  diemTong: number;
  hoTenSinhVien: string;
  maSinhVien: number;
  diemQuaTrinh: number;
  diemGiuaKy: number;
  diemThucHanh: number;
  diemCuoiKy: number;
}

export default function StudentTranscriptInput() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [rows, setRows] = useState<Row[]>([]);

  const { data: courseData, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: ({ signal }) => courseApi.getAllCourseData(0, 10000, signal),
    select: data => {
      return data.data.result;
    }
  });
  useEffect(() => {
    console.log(selectedCourse);
  }, [selectedCourse]);
  const queryClient = useQueryClient();
  const updateTranscriptMutation = useMutation({
    mutationFn: (data: Partial<CourseTranscript>) =>
      courseGradeApi.updateCourseTranscript(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['courseDetail', selectedCourse]
      });
      toast.success('Cập nhật điểm thành công');
    },
    onError: () => {
      toast.error('Cập nhật thất bại');
    }
  });
  const { data: courseDetailData } = useQuery({
    queryKey: ['courseDetail', selectedCourse],
    queryFn: ({ signal }) =>
      courseGradeApi.getTranscriptByCourse(+selectedCourse, signal),
    select: data => {
      console.log(data.data.result);
      const rows: CourseTranscript[] = data.data.result;
      return rows
        .map(item => ({
          ...item,
          hoTenSinhVien: item.sinhVien.hoTenSinhVien,
          maSinhVien: item.sinhVien.maSinhVien,
          diemQuaTrinh: item.diemQuaTrinh,
          diemCuoiKy: item.diemCuoiKy,
          diemThucHanh: item.diemThucHanh,
          diemGiuaKy: item.diemGiuaKy
        }))
        .flat();
    },
    enabled: !!selectedCourse
  });
  const handleSave = () => {
    rows.forEach(item => {
      updateTranscriptMutation.mutateAsync(item);
    });
  };

  useEffect(() => {
    if (courseDetailData) {
      setRows(courseDetailData);
    }
  }, [courseDetailData]);

  if (isLoading) return <LoadingIndicator />;
  return (
    <div className='w-full bg-white p-5 shadow-lg'>
      <Select
        id='filter'
        value={selectedCourse}
        onChange={e => setSelectedCourse(e.target.value)}
      >
        {courseData?.map(item => (
          <option key={item?.maHocPhan} value={item?.maHocPhan}>
            {item?.maHocPhan} ({item.monHoc.tenMonHoc})
          </option>
        ))}
      </Select>
      <div className='mt-4'>
        <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />
        <Button onClick={handleSave} className='mt-4' type='submit'>
          Lưu
        </Button>
      </div>
    </div>
  );
}
