import ReactPaginate from 'react-paginate';
import './Pagination.css';
interface PaginationProps {
  pageCount: number;
  pageRangeDisplayed?: number;
  handlePageClick: (data: { selected: number }) => void;
}
// https://www.npmjs.com/package/react-paginate
export default function Pagination({
  pageCount,
  pageRangeDisplayed,
  handlePageClick
}: PaginationProps) {
  return (
    <div className='pagination'>
      <ReactPaginate
        className='flex items-center justify-center space-x-2 text-sm'
        pageClassName='border-primary h-8 w-8 border bg-white text-center '
        pageLinkClassName='h-full w-full flex items-center justify-center'
        breakLabel='...'
        nextLabel='Trang sau'
        initialPage={0}
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRangeDisplayed}
        pageCount={pageCount}
        previousLabel='Trang trước'
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
