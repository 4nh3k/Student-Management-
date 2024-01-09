import { useQuery } from '@tanstack/react-query';
import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import Table from 'src/components/Table';
import { studentFileApi } from 'src/apis/student-file.api';
import StudentFile from 'src/types/student-file.type';
import { rewardApi } from 'src/apis/reward.api';
import Reward from 'src/types/reward.type';
import { semesterApi } from 'src/apis/semester.api';
import { capitalizeFirstLetter } from 'src/utils/utils';
import { format } from 'date-fns';
import Student from 'src/types/student.type';
import { studentApi } from 'src/apis/student.api';
import useReward from 'src/hooks/useReward';
import { getProfileFromLS } from 'src/utils/auth';
('use client');

const StudentRewardManagement = () => {
  const id = getProfileFromLS().userId;
  console.log(id);
  const [semesterId, setSemesterId] = useState<number>(1);
  const [semester, setSemester] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('ID');
  const [pageSize, setPageSize] = useState<number>(10);

  const headers = [
    { title: 'Mã khen thưởng', dataIndex: 'maKhenThuong' },
    { title: 'Xếp loại khen thưởng', dataIndex: 'xepLoaiKhenThuong' },
    { title: 'Học kỳ năm học', dataIndex: 'hocKyNamHoc' },
    { title: 'Sinh viên', dataIndex: 'sinhVien' }
  ];

  const { data: getAllSemesters, isLoading: isSemesterLoading } = useQuery({
    queryKey: ['semesters'],
    queryFn: () => semesterApi.getAllSemester(0, 1000)
  });

  const semesters = getAllSemesters?.data.result;

  const { data: studentData, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: ({ signal }) => studentApi.getAllStudents(0, 1000, signal),
    enabled: !!getAllSemesters // Only fetch data when getAllSemesters is available
  });

  const students = studentData?.data.result;

  const { data: rewardData, isLoading: isLoadingReward } = useQuery({
    queryKey: ['rewards'],
    queryFn: () => rewardApi.getAllRewardOfAStudent(0, 1000, id),
    enabled: !!studentData,
    select: data => {
      return data.data.result.map((reward: Reward) => {
        const semester = semesters?.find(
          semester => semester.maHocKyNamHoc === reward.maHocKyNamHoc
        );
        const student = students?.find(
          student => student.maSinhVien === reward.maSinhVien
        );
        return {
          maKhenThuong: reward.maKhenThuong,
          maHocKyNamHoc: reward.maHocKyNamHoc,
          xepLoaiKhenThuong: reward.xepLoaiKhenThuong,
          sinhVien: student?.maSinhVien + ' - ' + student?.hoTenSinhVien,
          hocKyNamHoc: semester?.tenHocKy + ' ' + semester?.tenNamHoc
        };
      });
    }
  });

  console.log(rewardData);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSelectedValueChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div>
      <div className='mb-5 w-full bg-white p-5 shadow-lg'>
        <div id='input-row' className='flex items-center'>
          <div className='w-96'>
            <TextInput
              placeholder='Tìm kiếm...'
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className='ml-4'>
            <Select
              id='filter'
              value={selectedValue}
              onChange={handleSelectedValueChange}
              required
            >
              {headers.map(header => {
                return (
                  <option key={header.dataIndex} value={header.dataIndex}>
                    {header.title}
                  </option>
                );
              })}
            </Select>
          </div>
          <div className='ml-auto flex items-center'>
            <span className='mr-2 text-gray-500'>Hiển thị</span>
            <Select
              id='pageSize'
              value={pageSize}
              onChange={e => setPageSize(+e.target.value)}
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </Select>
            <span className='ml-2 text-gray-500'>kết quả</span>
          </div>
        </div>
        {!isLoadingReward && rewardData && (
          <Table
            headers={headers}
            data={rewardData}
            pageSize={pageSize}
            filters={{ [selectedValue]: search }}
            className='border-input mt-2 border-2'
          />
        )}
      </div>
    </div>
  );
};

export default StudentRewardManagement;
