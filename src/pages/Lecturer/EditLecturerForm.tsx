import { useQuery } from '@tanstack/react-query';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { lecturerApi } from 'src/apis/lecturer.api';
import useLecturer from 'src/hooks/useLecturer';
import CreateLecturerDto from 'src/types/create-lecturer.dto';

const EditLecturer = ({ id }) => {
  const [lecturer, setLecturer] = useState<CreateLecturerDto>({
    maGiangVien: 0,
    tenGiangVien: '',
    hocPhans: [],
    khoaHocs: []
  });

  const { data: lecturerFetch, isLoading: isLoadingLecturer } = useQuery({
    queryKey: ['lecturer', id],
    queryFn: ({ signal }) => lecturerApi.getAllLecturers(0, 1000, signal, id)
  });
  console.log(lecturerFetch);

  const lecturerData = lecturerFetch?.data.result;

  useEffect(() => {
    if (!isLoadingLecturer && lecturerData) {
      setLecturer({
        maGiangVien: lecturerData[0].maGiangVien,
        tenGiangVien: lecturerData[0].tenGiangVien,
        hocPhans: [],
        khoaHocs: []
      });
    }
  }, [isLoadingLecturer, lecturerData, lecturerFetch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setLecturer(prevLecturer => ({ ...prevLecturer, [id]: value }));
  };

  const { updateLecturerMutation, deleteLecturerMutation } = useLecturer();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted lecturer:', lecturer);
    updateLecturerMutation.mutate(
      { lecturer: lecturer, id: parseInt(id) },
      {
        onSuccess: data => {
          setLecturer({
            maGiangVien: 0,
            tenGiangVien: '',
            hocPhans: [],
            khoaHocs: []
          });
        },
        onError: error => {
          toast.error(error.response.data.message);
        }
      }
    );
  };

  const onDeleteLecturer = () => {
    const confirmBox = window.confirm(
      'Bạn có thật sự muốn xóa giảng viên này không'
    );
    console.log('delete clicked');
    if (confirmBox === true) {
      deleteLecturerMutation.mutate(id);
    }
  };

  return (
    <form
      id='student-table-container'
      className='w-full bg-white p-5 shadow-lg'
      onSubmit={onSubmit}
    >
      <h1 className='text-lg font-semibold'>Thông tin giảng viên</h1>
      <div className='mt-4 grid grid-cols-4 gap-8'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='tenGiangVien' value='Tên' />
          </div>
          <TextInput
            id='tenGiangVien'
            type='text'
            placeholder='Nhập tên giảng viên'
            value={lecturer.tenGiangVien}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className='mt-7 flex space-x-5'>
        <Button type='submit' color='failure'>
          Lưu
        </Button>
        <Button className='bg-sidebar' onClick={onDeleteLecturer}>Xóa</Button>
      </div>
    </form>
  );
};

export default EditLecturer;
