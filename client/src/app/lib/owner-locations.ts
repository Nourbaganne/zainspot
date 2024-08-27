
export const generatePageNumbers = ({ totalPage, currentPage }: { totalPage: number, currentPage: number }) => {
    const totalPages = totalPage || 1;
    const maxButtons = 5;
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (startPage > 1) pageNumbers.unshift(1, '...');
    if (endPage < totalPages) pageNumbers.push('...', totalPages);

    return pageNumbers;
};