import { useQuery } from '@tanstack/react-query';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { lecturerApi } from 'src/apis/lecturer.api';
import { tuitionFeeApi } from 'src/apis/tution-fee.api';
import useLecturer from 'src/hooks/useLecturer';
import useTuitionFee from 'src/hooks/useTuitionFee';
import CreateLecturerDto from 'src/types/create-lecturer.dto';
import TutionFee from 'src/types/tution-fee';

const EditFee = ({ id }) => {
  const [fee, setFee] = useState<TutionFee>({
    maThongTinHocPhi: 0,
    soTienHocPhiTheoQuyDinh: 0,
    soTienPhaiDong: 0,
    soTienDaDong: 0,
    soTienDu: 0,
    tenNganHangThanhToanHocPhi: '',
    thoiDiemThanhToanHocPhi: '',
    ghiChuBoSung: '',
    maThongTinHocPhiHocKyTruoc: null,
    maHocKyNamHoc: 0,
    maSinhVien: 0,
    hocKyNamHoc: '',
    inverseThongTinHocPhiHocKyTruoc: null,
    sinhVien: null,
    thongTinHocKyNamHoc: null,
    thongTinHocPhiHocKyTruoc: null
  });

  const { data: feeFetch, isLoading: isLoadingFee } = useQuery({
    queryKey: ['fee', parseInt(id)],
    queryFn: ({ signal }) =>
      tuitionFeeApi.getAllTuitionFees(0, 1000, signal, id)
  });

  const feeData = feeFetch?.data.result[0];

  useEffect(() => {
    if (!isLoadingFee && feeData) {
      setFee({
        maThongTinHocPhi: feeData?.maThongTinHocPhi,
        soTienHocPhiTheoQuyDinh: feeData.soTienHocPhiTheoQuyDinh,
        soTienPhaiDong: feeData.soTienPhaiDong,
        soTienDaDong: feeData.soTienDaDong,
        soTienDu: feeData.soTienDu,
        tenNganHangThanhToanHocPhi: feeData.tenNganHangThanhToanHocPhi,
        thoiDiemThanhToanHocPhi: feeData.thoiDiemThanhToanHocPhi,
        ghiChuBoSung: feeData.ghiChuBoSung,
        maThongTinHocPhiHocKyTruoc: feeData.maThongTinHocPhiHocKyTruoc,
        maHocKyNamHoc: feeData.maHocKyNamHoc,
        maSinhVien: feeData.maSinhVien,
        hocKyNamHoc: feeData.hocKyNamHoc,
        inverseThongTinHocPhiHocKyTruoc:
          feeData.inverseThongTinHocPhiHocKyTruoc,
        sinhVien: fee.sinhVien,
        thongTinHocKyNamHoc: fee.thongTinHocKyNamHoc,
        thongTinHocPhiHocKyTruoc: fee.thongTinHocPhiHocKyTruoc
      });
    }
  }, [isLoadingFee, feeData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFee(prevFee => ({ ...prevFee, [id]: value }));
  };

  const { updateTuitionFeeMutation, deleteTuitionFeeMutation } =
    useTuitionFee();

  const validateRemainMoney = (
    payAmount: number,
    paidAmount: number,
    remainer: number
  ) => {
    const threshold = 0.0001;
    console.log(payAmount, paidAmount, remainer);
    const isValidValue = payAmount > 0 && paidAmount >= 0 && remainer >= 0;
    console.log(paidAmount - payAmount);
    if (paidAmount > payAmount) {
      return paidAmount - payAmount - remainer < threshold && isValidValue;
    } else {
      return remainer < threshold && isValidValue;
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted lecturer:', fee);

    if (
      !validateRemainMoney(fee.soTienPhaiDong, fee.soTienDaDong, fee.soTienDu)
    ) {
      toast.error('Giá trị hoặc số tiền dư không hợp lệ');
      return;
    }

    updateTuitionFeeMutation.mutate(
      {
        tuitionFee: fee,
        studentId: fee.maSinhVien,
        semesterId: fee.maHocKyNamHoc,
        tuitionId: fee.maThongTinHocPhi
      },
      {
        onSuccess: data => {
          setFee({
            maThongTinHocPhi: 0,
            soTienHocPhiTheoQuyDinh: 0,
            soTienPhaiDong: 0,
            soTienDaDong: 0,
            soTienDu: 0,
            tenNganHangThanhToanHocPhi: '',
            thoiDiemThanhToanHocPhi: '',
            ghiChuBoSung: '',
            maThongTinHocPhiHocKyTruoc: null,
            maHocKyNamHoc: 0,
            maSinhVien: 0,
            hocKyNamHoc: '',
            inverseThongTinHocPhiHocKyTruoc: null,
            sinhVien: null,
            thongTinHocKyNamHoc: null,
            thongTinHocPhiHocKyTruoc: null
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
      'Bạn có thật sự muốn xóa thông tin học phí này không'
    );
    console.log('delete clicked');
    if (confirmBox === true) {
      deleteTuitionFeeMutation.mutate({
        studentId: fee.maSinhVien,
        semesterId: fee.maHocKyNamHoc
      });
    }
  };

  return (
    <form
      id='student-table-container'
      className='w-full bg-white p-5 shadow-lg'
      onSubmit={onSubmit}
    >
      <h1 className='text-lg font-semibold'>Thông tin học phí</h1>
      <div className='mt-4 grid grid-cols-4 gap-8'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='tenGiangVien' value='Số tiền phải đóng' />
          </div>
          {!isLoadingFee && (
            <TextInput
              id='soTienPhaiDong'
              type='number'
              placeholder='Nhập số tiền phải đóng'
              value={fee?.soTienPhaiDong}
              onChange={handleInputChange}
              required
            />
          )}
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='tenGiangVien' value='Số tiền đã đóng' />
          </div>
          {!isLoadingFee && (
            <TextInput
              id='soTienDaDong'
              type='number'
              placeholder='Nhập số tiền đã đóng'
              value={fee?.soTienDaDong}
              onChange={handleInputChange}
              required
            />
          )}
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='tenGiangVien' value='Số tiền dư' />
          </div>
          {!isLoadingFee && (
            <TextInput
              id='soTienDu'
              type='number'
              placeholder='Nhập số tiền dư'
              value={fee?.soTienDu}
              onChange={handleInputChange}
              required
            />
          )}
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='ghiChuBoSung' value='Ghi chú bổ sung' />
          </div>
          {!isLoadingFee && (
            <TextInput
              id='ghiChuBoSung'
              type='text'
              placeholder='Nhập ghi chú bổ sung'
              value={fee?.ghiChuBoSung}
              onChange={handleInputChange}
              required
            />
          )}
        </div>
      </div>
      <div className='mt-7 flex space-x-5'>
        <Button type='submit' color='failure'>
          Lưu
        </Button>
        <Button className='bg-sidebar' onClick={onDeleteLecturer}>
          Xóa
        </Button>
      </div>
    </form>
  );
};

export default EditFee;
