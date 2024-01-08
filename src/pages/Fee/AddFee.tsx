import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import CSVReader from 'react-csv-reader';
import Table from 'src/components/Table';
import useTuitionFee from 'src/hooks/useTuitionFee';
import TutionFee from 'src/types/tution-fee';

const AddFee = () => {
  const headers = [
    { title: 'Mã học kỳ năm học', dataIndex: 'maHocKyNamHoc' },
    { title: 'Mã sinh viên', dataIndex: 'maSinhVien' },
    {
      title: 'Số tiền học phí theo quy định',
      dataIndex: 'soTienHocPhiTheoQuyDinh'
    },
    { title: 'Số tiền phải đóng', dataIndex: 'soTienPhaiDong' },
    { title: 'Số tiền đã đóng', dataIndex: 'soTienDaDong' },
    { title: 'Số tiền dư', dataIndex: 'soTienDu' },
    {
      title: 'Tên ngân hàng thanh toán học phí',
      dataIndex: 'tenNganHangThanhToanHocPhi'
    },
    {
      title: 'Thời điểm thanh toán học phí',
      dataIndex: 'thoiDiemThanhToanHocPhi'
    },

    { title: 'Ghi chú bổ sung', dataIndex: 'ghiChuBoSung' }
  ];

  const [csvData, setCsvData] = useState([]);
  const [jsonResult, setJsonResult] = useState<TutionFee>();

  const handleCsvText = csvText => {
    // Split CSV text into lines
    const lines = csvText.split('\n');

    if (lines.length > 1) {
      const headers = [
        'soTienHocPhiTheoQuyDinh',
        'soTienPhaiDong',
        'soTienDaDong',
        'soTienDu',
        'tenNganHangThanhToanHocPhi',
        'thoiDiemThanhToanHocPhi',
        'ghiChuBoSung',
        'maThongTinHocPhiHocKyTruoc',
        'maHocKyNamHoc',
        'maSinhVien'
      ];

      // Convert CSV data into JSON format
      const jsonResult = lines.slice(1, -1).map(line => {
        const values = line.split(';');
        const obj = {};
        headers.forEach((header, index) => {
          // Check if the value is a date
          if (header === 'maThongTinHocPhiHocKyTruoc'){
            obj[header] = null;
          } else if (header === 'thoiDiemThanhToanHocPhi'){
            obj[header] = values[index];
          } else {
            // Check if the value can be parsed as a float
            const parsedValue = parseFloat(values[index]);
            obj[header] = isNaN(parsedValue) ? values[index] : parsedValue;
          }
        });
        obj['ma']
        return obj;
      });

      console.log('JSON Result:', jsonResult);
      setJsonResult(jsonResult);
    }
  };

  const [pageSize, setPageSize] = useState<number>(10);
  const handleCsvFile = data => {
    console.log('CSV Data:', data);
    handleCsvText(data);
    setCsvData(data);
  };

  const { createTuitionFeeMutation } = useTuitionFee();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted fee:', jsonResult);
    createTuitionFeeMutation.mutate(jsonResult, {
      onError: error => {
        toast.error(error.response.data.message);
      }
    });
  };
  return (
    <form
      id='student-table-container'
      className='w-full bg-white p-5 shadow-lg'
      onSubmit={onSubmit}
    >
      <h1 className='text-lg font-semibold'>Thêm thông tin học phí</h1>

      <div className='mt-5'>
        <input
          type='file'
          accept='.csv'
          onChange={event => {
            const file = event.target.files[0];

            if (file) {
              // Read CSV data immediately when the file is selected
              const reader = new FileReader();
              reader.onload = e => {
                const csvText = e.target.result;
                // Use the CSV text or pass it to the CSV reader component
                console.log('CSV Text:', csvText);

                // Trigger CSV reader component with the parsed data
                handleCsvFile(csvText);
              };
              reader.readAsText(file);
            }
          }}
        ></input>
      </div>
      <div className='mt-4'>
        <Button type='submit' color='failure'>
          Thêm
        </Button>
      </div>
      {jsonResult && (
        <Table
          headers={headers}
          data={jsonResult}
          className='border-input mt-2 border-2'
          pageSize={pageSize}
        />
      )}
    </form>
  );
};

export default AddFee;
