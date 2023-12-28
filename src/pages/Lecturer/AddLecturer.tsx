import { Button, Label, Select, TextInput } from 'flowbite-react';

const AddLecturer = () => {
  return (
    <form
      id='student-table-container'
      className='w-full bg-white p-5 shadow-lg'
    >
      <h1 className='text-lg font-semibold'>Thêm giảng viên mới</h1>
      <div className='mt-4 grid grid-cols-4 gap-8'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='name' value='Tên' />
          </div>
          <TextInput
            id='name'
            type='text'
            placeholder='Nhập tên giảng viên'
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='gender' value='Giới tính' />
          </div>
          <Select id='gender' required>
            <option>Nam</option>
            <option>Nữ</option>
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='department' value='Khoa' />
          </div>
          <Select id='department' required>
            <option>Nam</option>
            <option>Nữ</option>
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='major' value='Ngành' />
          </div>
          <Select id='major' required>
            <option>Nam</option>
            <option>Nữ</option>
          </Select>
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
