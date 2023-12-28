import { Button, Label, Select, TextInput } from 'flowbite-react';

const AddFee = () => {
  return (
    <form
      id='student-table-container'
      className='w-full bg-white p-5 shadow-lg'
    >
      <h1 className='text-lg font-semibold'>Thêm thông tin học phí</h1>
      <div className='mt-4 grid grid-cols-4 gap-8'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='name' value='Tên' />
          </div>
          <TextInput
            id='fee_value'
            type='number'
            placeholder='Nhập số tiền học phí'
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='semester' value='Học kỳ' />
          </div>
          <Select id='semester_select' required>
            <option>I</option>
            <option>II</option>
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='year' value='Năm học' />
          </div>
          <Select id='year' required>
            <option>2022-2023</option>
            <option>2023-2024</option>
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

export default AddFee;
