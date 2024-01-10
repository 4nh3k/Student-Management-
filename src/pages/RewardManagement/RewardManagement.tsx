import { useQuery } from '@tanstack/react-query';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { rewardApi } from 'src/apis/reward.api';
import { semesterApi } from 'src/apis/semester.api';
import { studentApi } from 'src/apis/student.api';
import LoadingIndicator from 'src/components/LoadingIndicator';
import Table from 'src/components/Table';
import useReward from 'src/hooks/useReward';
import Reward from 'src/types/reward.type';
('use client');

const RewardManagement = () => {
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
  const studentIds = students?.map(student => student.maSinhVien);

  const rewardArray = studentIds?.map(maSinhVien => ({
    maSinhVien: maSinhVien,
    maHocKyNamHoc: semesterId
  }));

  const { data: rewardData, isLoading: isLoadingReward } = useQuery({
    queryKey: ['rewards'],
    queryFn: () => rewardApi.getAllReward(0, 1000),
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

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    const selectedOption = semesters.find(
      semester => semester.tenHocKy + ' ' + semester.tenNamHoc === value
    );
    setSemester(value);
    setSemesterId(selectedOption?.maHocKyNamHoc);
  };

  const { createRewardMutation } = useReward();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted file:', rewardArray);

    createRewardMutation.mutate(rewardArray, {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSuccess: data => {
        setSemesterId(1);
        setSemester('kỳ 1 2005-2006');
      },
      onError: error => {
        toast.error(error.response.data.message);
      }
    });
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
      <form
        id='student-table-container'
        className='mb-5 w-full bg-white p-5 shadow-lg'
        onSubmit={onSubmit}
      >
        <h1 className='text-lg font-semibold'>Thêm khen thưởng sinh viên</h1>
        <div className='mt-4 grid grid-cols-4 gap-8'>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='hocKyNamHoc' value='Học kỳ năm học' />
            </div>
            <Select
              id='education-selection'
              required
              value={semester}
              onChange={handleSemesterChange}
            >
              {!isSemesterLoading &&
                semesters.map(semester => (
                  <option key={semesters.maHocKyNamHoc}>
                    {semester.tenHocKy + ' ' + semester.tenNamHoc}
                  </option>
                ))}
            </Select>
          </div>
        </div>
        <div className='mt-7 flex space-x-5'>
          {createRewardMutation.isPending && <LoadingIndicator />}
          {!createRewardMutation.isPending && (
            <Button type='submit' color='failure'>
              Thêm
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RewardManagement;
