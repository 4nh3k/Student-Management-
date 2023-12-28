import { FloatingLabel, Dropdown, Datepicker } from 'flowbite-react';
import Breadcrumbs from 'src/components/Breadcrumb/Breadcrumb';

const AddStudentForm = () => {
  return (
    <div className='items-center'>
      <div id='main-body' className='space-y-5 p-10'>
        <Breadcrumbs />
        <div
          id='student-table-container'
          className='w-full bg-white p-5 shadow-lg'
        >
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
      </div>
    </div>
  );
};

export default AddStudentForm;
