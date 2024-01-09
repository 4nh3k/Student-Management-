import { Checkbox } from 'flowbite-react';
import React, { useState } from 'react';
import { PiArrowDown, PiArrowUp } from 'react-icons/pi';
import Pagination from '../Pagination';
import { TableTheme, getClassName } from './TableStyle';

export type Header = {
  title: string;
  dataIndex: string;
  className?: string;
  sortable?: boolean;
};

export interface TableProps {
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
  checkedList?: any[];
  filters?: any;
  tableStyle?: TableTheme;
  pageSize?: number; // Number of rows per page
  hasCheckbox?: boolean; // Whether to display checkboxes
  onCheck?: (row: any, checked: boolean) => boolean; // Callback when checkbox is checked/unchecked
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  className,
  classNameTable,
  classNameBody,
  classNameHeader,
  checkedList,
  classNameRow,
  classNameRowSelected,
  canSelected,
  onSelect,
  selectedRow,
  onRowClick,
  tableStyle,
  filters,
  pageSize, // Default page size is 10
  hasCheckbox,
  onCheck
}) => {
  const [selected, setSelected] = useState(selectedRow || null);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );
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

  const handlePageChange = (data: { selected: number }) => {
    setCurrentPage(data.selected + 1);
  };
  const handleCheckChange = (index: number, isCheck: boolean) => {
    const updatedCheckedState = checkedState.map((item, i) =>
      i === index ? isCheck : item
    );
    setCheckedState(updatedCheckedState);
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

  const paginatedData = React.useMemo(() => {
    if (pageSize !== undefined) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return sortedData.slice(startIndex, endIndex);
    }

    return sortedData;
  }, [sortedData, pageSize, currentPage]);

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
    <>
      <div className={resolvedStyles.className}>
        <table className={resolvedStyles.classNameTable}>
          <thead>
            <tr className={resolvedStyles.classNameHeader}>
              {hasCheckbox && <th></th>}
              {headers?.map(header => (
                <th
                  className={
                    header.className
                      ? header.className
                      : 'group/header px-4 py-4'
                  }
                  key={header.dataIndex}
                  onClick={() =>
                    header.sortable && handleSort(header.dataIndex)
                  }
                >
                  {header.title}
                  {header.sortable && (
                    <>
                      {sortColumn === header.dataIndex &&
                        sortOrder === 'asc' && (
                          <PiArrowUp size={16} className='ml-1 inline-block' />
                        )}
                      {sortColumn === header.dataIndex &&
                        sortOrder === 'desc' && (
                          <PiArrowDown
                            size={16}
                            className='ml-1 inline-block'
                          />
                        )}
                      {sortColumn !== header.dataIndex && (
                        <PiArrowUp
                          size={16}
                          className='ml-1 inline-block text-transparent group-hover/header:text-black/40'
                        />
                      )}
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={resolvedStyles.classNameBody}>
            {paginatedData?.length === 0 && (
              <tr className='text-center'>
                <td className='py-4' colSpan={100}>
                  Chưa có dữ liệu
                </td>
              </tr>
            )}
            {paginatedData?.map((row, index) => (
              <tr
                className={
                  canSelected && selected === index
                    ? resolvedStyles.classNameRowSelected
                    : resolvedStyles.classNameRow
                }
                key={index}
                onClick={() => handleRowClick(row, index)}
              >
                {hasCheckbox && (
                  <td className='pl-2'>
                    <Checkbox
                      color={'red'}
                      checked={checkedState[index]}
                      onChange={() => {
                        console.log(
                          checkedList?.find(item => item.ID === row.ID)
                        );
                        if (checkedList?.find(item => item.ID === row.ID)) {
                          if (onCheck) {
                            const isCheck = onCheck(row, false);
                            handleCheckChange(index, isCheck);
                          }
                        } else {
                          if (onCheck) {
                            const isCheck = onCheck(row, true);
                            handleCheckChange(index, isCheck);
                          }
                        }
                      }}
                    />
                  </td>
                )}
                {headers?.map(header => {
                  const cellData = row[header.dataIndex];
                  if (cellData === null) return <td />;
                  if (cellData === undefined) return null;
                  if (
                    cellData !== undefined &&
                    cellData.content !== undefined
                  ) {
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

      {pageSize && (
        <div className='mt-5 flex items-center justify-between '>
          <span className='text-sm text-gray-500'>
            Hiển thị {(currentPage - 1) * pageSize + 1} đến{' '}
            {currentPage * pageSize} của {sortedData.length} kết quả
          </span>
          <Pagination
            className='flex justify-end'
            pageCount={Math.ceil(sortedData.length / pageSize)}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default Table;
