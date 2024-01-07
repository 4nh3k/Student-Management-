import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useLecturer from 'src/hooks/useLecturer';
import CreateLecturerDto from 'src/types/create-lecturer.dto';

const AddLecturer = () => {
  const [lecturer, setLecturer] = useState<CreateLecturerDto>({
    maGiangVien: 0,
    tenGiangVien: '',
    hocPhans: [],
    khoaHocs: []
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setLecturer(prevLecturer => ({ ...prevLecturer, [id]: value }));
  };

  const { createLecturerMutation } = useLecturer();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted lecturer:', lecturer);
    createLecturerMutation.mutate(lecturer, {
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
    });
  };

  return (
    <form
      id='student-table-container'
      className='w-full bg-white p-5 shadow-lg' onSubmit={onSubmit}
    >
      <h1 className='text-lg font-semibold'>Thêm giảng viên mới</h1>
      <div className='mt-4 grid grid-cols-4 gap-8'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='name' value='Tên' />
          </div>
          <TextInput
            id='tenGiangVien'
            type='text'
            placeholder='Nhập tên giảng viên'
            required
          />
        </div>
      </div>
      <div className='mt-4'>
        <Button type='submit' color='failure'>
          Thêm
        </Button>
      </div>
    </form>
  );
};

export default AddLecturer;
