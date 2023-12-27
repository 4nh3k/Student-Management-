import React, { useState } from 'react';
import { TableTheme, getClassName } from './TableStyle';
import { ArrowUp } from '@phosphor-icons/react';
import { ArrowDown } from '@phosphor-icons/react/dist/ssr';

interface Header {
  title: string;
  dataIndex: string;
  className?: string;
  sortable?: boolean;
}

interface TableProps {
  headers: Header[];
  data: any[];
  className?: string;
  classNameTable?: string;
  classNameHeader?: string;
  classNameBody?: string;
  classNameRow?: string;
  classNameRowSelected?: string;
  canSelected?: boolean;
  onSelect?: (row: any) => void;
  selectedRow?: number;
  onRowClick?: (row: any) => void;
  filters?: any;
  tableStyle?: TableTheme;
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  className,
  classNameTable,
  classNameBody,
  classNameHeader,
  classNameRow,
  classNameRowSelected,
  canSelected,
  onSelect,
  selectedRow,
  onRowClick,
  tableStyle,
  filters // the filters you want to apply
}) => {
  const [selected, setSelected] = useState(selectedRow || null);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleRowClick = (row: any, index: number) => {
    setSelected(index);
    if (onRowClick) {
      onRowClick(row);
    }
    if (onSelect) {
      onSelect(row);
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const filteredData = React.useMemo(() => {
    if (filters) {
      return data.filter(row => {
        // Check each header individually
        return headers.every(header => {
          if (!filters[header.dataIndex]) {
            return true; // No filter applied for this header
          }

          const cellData = row[header.dataIndex];

          const filterValue = filters[header.dataIndex];
          if (typeof cellData === 'string') {
            return cellData.toLowerCase().includes(filterValue.toLowerCase());
          } else if (typeof cellData === 'number') {
            // Numeric type filtering
            return cellData === parseFloat(filterValue);
          }

          return false;
        });
      });
    }

    return data;
  }, [data, headers, filters]);

  const sortedData = React.useMemo(() => {
    if (sortColumn) {
      const sorted = [...filteredData].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortOrder === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      });

      return sorted;
    }

    return filteredData;
  }, [filteredData, sortColumn, sortOrder]);

  const resolvedStyles = getClassName(
    className,
    classNameTable,
    classNameBody,
    classNameHeader,
    classNameRow,
    classNameRowSelected,
    tableStyle
  );

  return (
    <div className={resolvedStyles.className}>
      <table className={resolvedStyles.classNameTable}>
        <thead>
          <tr className={resolvedStyles.classNameHeader}>
            {headers?.map(header => (
              <th
                className={
                  header.className ? header.className : 'group/header px-4 py-4'
                }
                key={header.dataIndex}
                onClick={() => header.sortable && handleSort(header.dataIndex)}
              >
                {header.title}
                {header.sortable && (
                  <>
                    {sortColumn === header.dataIndex && sortOrder === 'asc' && (
                      <ArrowUp size={16} className='ml-1 inline-block' />
                    )}
                    {sortColumn === header.dataIndex &&
                      sortOrder === 'desc' && (
                        <ArrowDown size={16} className='ml-1 inline-block' />
                      )}
                    {sortColumn !== header.dataIndex && (
                      <ArrowUp
                        size={16}
                        className='ml-1 hidden text-black/40 group-hover/header:inline-block'
                      />
                    )}
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={resolvedStyles.classNameBody}>
          {sortedData?.map((row, index) => (
            <tr
              className={
                canSelected && selected === index
                  ? resolvedStyles.classNameRowSelected
                  : resolvedStyles.classNameRow
              }
              key={index}
              onClick={() => handleRowClick(row, index)}
            >
              {headers?.map(header => {
                const cellData = row[header.dataIndex];

                if (cellData !== undefined && cellData.content !== undefined) {
                  const colSpan = cellData.colSpan || 1;

                  return (
                    <td
                      className={
                        cellData.className ? cellData.className : 'px-4 py-3'
                      }
                      colSpan={colSpan}
                      key={header.dataIndex}
                    >
                      {typeof cellData.content === 'object' ? (
                        <>{cellData.content}</>
                      ) : (
                        cellData.content
                      )}
                    </td>
                  );
                }
                if (cellData === undefined) return null;
                return (
                  <td
                    className={
                      row[header.dataIndex]?.className
                        ? row[header.dataIndex]?.className
                        : 'px-4 py-3'
                    }
                    key={header.dataIndex}
                  >
                    {typeof row[header.dataIndex] === 'object' ? (
                      <>{row[header.dataIndex]}</>
                    ) : (
                      row[header.dataIndex]
                    )}
                  </td>
                ); // or handle undefined data as needed
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

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
