import ReactPaginate from 'react-paginate';
import './Pagination.css';
interface PaginationProps {
  pageCount: number;
  pageRangeDisplayed?: number;
  className?: string;
  onPageChange: (data: { selected: number }) => void;
}
// https://www.npmjs.com/package/react-paginate
export default function Pagination({
  pageCount,
  pageRangeDisplayed,
  onPageChange,
  className
}: PaginationProps) {
  return (
    <div className={!className ? `pagination ` : `pagination ` + className}>
      <ReactPaginate
        className='space-x-2 text-sm'
        pageClassName='border-primary h-8 w-8 border rounded-lg bg-white text-center '
        pageLinkClassName='h-full w-full flex items-center justify-center'
        breakLabel='...'
        nextLabel='Trang sau'
        initialPage={0}
        onPageChange={onPageChange}
        pageRangeDisplayed={pageRangeDisplayed}
        pageCount={pageCount}
        previousLabel='Trang trước'
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
