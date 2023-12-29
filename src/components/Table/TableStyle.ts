export type TableTheme = 'default' | 'transcript';

export type TableStyle = {
  className?: string;
  classNameTable?: string;
  classNameBody?: string;
  classNameHeader?: string;
  classNameRow?: string;
  classNameRowSelected?: string;
};

const defautStyle: TableStyle = {
  className: 'border-input border-2',
  classNameTable: 'w-full border-collapse table-auto bg-white text-center ',
  classNameBody: 'divide-y-2 divide-input border-t-2 border-input ',
  classNameHeader: 'font-bold text-primary',
  classNameRow: 'hover:bg-[#F7F6FE] cursor-pointer py-4 text-base ',
  classNameRowSelected: 'bg-primary/10'
};

const transcriptStyle: TableStyle = {
  className: 'border-input border-2',
  classNameTable:
    'w-full border-collapse table-auto bg-white text-left text-sm',
  classNameBody: 'divide-y-2 divide-input border-t-2 border-input ',
  classNameHeader: 'font-bold  divide-x-2 divide-input ',
  classNameRow:
    'hover:bg-[#F7F6FE] divide-x-2 divide-input cursor-pointer py-4 font-normal',
  classNameRowSelected: 'bg-primary/10'
};

export const getClassName = (
  propClassName: string | undefined,
  propClassNameTable: string | undefined,
  propClassNameBody: string | undefined,
  propClassNameHeader: string | undefined,
  propClassNameRow: string | undefined,
  propClassNameRowSelected: string | undefined,
  propTableStyle: TableTheme | undefined
): TableStyle => {
  const style = propTableStyle === 'transcript' ? transcriptStyle : defautStyle;
  return {
    className: propClassName || style.className,
    classNameTable: propClassNameTable || style.classNameTable,
    classNameBody: propClassNameBody || style.classNameBody,
    classNameHeader: propClassNameHeader || style.classNameHeader,
    classNameRow: propClassNameRow || style.classNameRow,
    classNameRowSelected: propClassNameRowSelected || style.classNameRowSelected
  };
};

// SAMPLE DATA

// const header = [
//   {
//     title: 'Name',
//     dataIndex: 'name'
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     sortable: true
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address'
//   }
// ];

// const data = [
//   {
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park'
//   },
//   {
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park'
//   },
//   {
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park'
//   }
// ];

// const transcriptData = [
//   {
//     name: {
//       content: <p className='font-bold'> Học kỳ 2 - Năm học 2023 - 2024</p>,
//       colSpan: 3
//     }
//   },
//   {
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park'
//   },
//   {
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park'
//   },
//   {
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park'
//   },
//   {
//     name: {
//       content: <p className='font-bold'> Số tín chỉ đã học</p>,
//       colSpan: 2
//     },
//     address: 32
//   }
// ];
// const filters = {
//   name: 'j',
//   age: 32,
//   address: 'park'
// };
