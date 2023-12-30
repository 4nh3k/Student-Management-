import React from 'react';
import { Table } from 'flowbite-react';

const StudentDashboard = () => {
  const dataIndex = {
    studentName: 'Họ và tên',
    studentID: 'MSSV',
    dateOfBirth: 'Ngày sinh',
    major: 'Khoa',
    educationType: 'Hệ chính quy',
    class: 'Lớp sinh hoạt',
    status: 'Tình trạng'
  };

  const studentData = {
    studentName: 'Nguyễn Tuấn Bảo',
    studentID: '21520620',
    dateOfBirth: '11/03/2003',
    major: 'CNPM',
    educationType: 'CQUI',
    class: 'KTPM2021',
    status: 'Đang học'
  };

  return (
    <div
      id='student-dashboard-container'
      className='w-full bg-white p-5 shadow-lg'
    >
      <div id='student-basic-info-container' className='flex flex-col'>
        <span className='text-center text-3xl font-semibold text-primary'>
          BẢNG ĐIỀU KHIỂN SINH VIÊN
        </span>
        <Table>
          <Table.Body className='divide-y'>
            {Object.keys(dataIndex).map(key => (
              <Table.Row
                key={key}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {dataIndex[key]}
                </Table.Cell>
                <Table.Cell>{studentData[key]}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default StudentDashboard;
