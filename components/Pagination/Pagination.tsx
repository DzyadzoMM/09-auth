import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageCount={totalPages}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.pagination}
      pageClassName={css.li}
      pageLinkClassName={css.link}
      activeClassName={css.active}
      activeLinkClassName={css.activeA}
      previousClassName={css.li} 
      nextClassName={css.li}
      previousLinkClassName={css.link}
      nextLinkClassName={css.link}
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel="..."
    />
  );
}