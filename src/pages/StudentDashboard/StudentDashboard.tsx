import { Table } from 'flowbite-react';
import React, { useState } from 'react';

const StudentDashboard = () => {
  const studentDataIndex = {
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

  const feeDataIndex = {
    totalCredit: 'Số TC học phí',
    fee: 'Học phí phải đóng',
    paidFee: 'Học phí đã đóng',
    remainer: 'Học phí còn nợ',
    deadline: 'Hạn đóng'
  };

  const feeData = {
    totalCredit: 22,
    fee: '16,000,000đ',
    paidFee: '16,000,000đ',
    remainer: '0đ',
    deadline: '15/11/2023'
  }

  const [semester, setSemester] = useState<number>(1);
  const [year, setYear] = useState<string>('2023-2024')

  return (
    <div
      id='student-dashboard-container'
      className='w-full bg-white p-5 shadow-lg'
    >
      <div id='student-basic-info-container' className='flex flex-col'>
        <span className='text-center text-3xl font-semibold text-primary mb-5'>
          BẢNG ĐIỀU KHIỂN SINH VIÊN
        </span>
        <Table>
          <Table.Body className='divide-y'>
            {Object.keys(studentDataIndex).map(key => (
              <Table.Row
                key={key}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <Table.Cell className='w-96 whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {studentDataIndex[key]}
                </Table.Cell>
                <Table.Cell>{studentData[key]}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div id='latest-fee-info-container' className='flex flex-col mt-10'>
        <span className='ml-5 mb-5 text-2xl font-semibold text-secondary'>
          THÔNG TIN HỌC PHÍ HỌC KỲ {semester} NĂM {year}
        </span>
        <Table>
          <Table.Body className='divide-y'>
            {Object.keys(feeDataIndex).map(key => (
              <Table.Row
                key={key}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <Table.Cell className='w-96 whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {feeDataIndex[key]}
                </Table.Cell>
                <Table.Cell>{feeData[key]}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default StudentDashboard;
