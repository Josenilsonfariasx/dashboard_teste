import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 1);
    
    if (endPage - startPage < 3 && startPage > 1) {
      startPage = Math.max(1, endPage - 3);
    }
    
    if (endPage - startPage < 3 && endPage < totalPages) {
      endPage = Math.min(totalPages, startPage + 3);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center my-4">
      <a
        href="#"
        onClick={() => onPageChange(currentPage === 1 ? totalPages : currentPage - 1)}
        className={`px-4 py-2 mx-1 ${currentPage === 1 ? "text-gray-500 cursor-not-allowed" : "text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white"}`}
      >
        <div className="flex items-center -mx-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-1 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span className="mx-1">Anterior</span>
        </div>
      </a>

      {getPageNumbers().map(page => (
        <a
          key={page}
          href="#"
          onClick={() => onPageChange(page)}
          className={`hidden px-4 py-2 mx-1 ${page === currentPage ? "bg-red-500 text-white" : "text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white"}`}
        >
          {page}
        </a>
      ))}

      <a
        href="#"
        onClick={() => onPageChange(currentPage === totalPages ? 1 : currentPage + 1)}
        className={`px-4 py-2 mx-1 ${currentPage === totalPages ? "text-gray-500 cursor-not-allowed" : "text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white"}`}
      >
        <div className="flex items-center -mx-1">
          <span className="mx-1">Proxima</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-1 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </a>
    </div>
  );
};

export default Pagination;