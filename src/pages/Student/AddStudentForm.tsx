import { Datepicker, Dropdown, FloatingLabel } from 'flowbite-react';

const AddStudentForm = () => {
  return (
    <div id='student-table-container' className='w-full bg-white p-5 shadow-lg'>
      <h1>Thêm sinh viên mới</h1>
      <div className='grid grid-cols-4'>
        <FloatingLabel variant='filled' label='Tên' />
        <Dropdown
          className='text-xl font-bold'
          label='Chọn khoa'
          dismissOnClick={true}
          inline
        >
          <Dropdown.Item key={'male'}>{'Nam'}</Dropdown.Item>
          <Dropdown.Item key={'female'}>{'Nữ'}</Dropdown.Item>
        </Dropdown>
        <Datepicker></Datepicker>
      </div>
    </div>
  );
};

export default AddStudentForm;
