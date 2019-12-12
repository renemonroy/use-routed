export interface IPagination {
  currentItems: any[];
  currentPage: number;
  itemsPerPage: number;
  numOfPages: number;
  startIndex: number;
  totalItems: number;
}

/**
 * Helps to create a pagination in a set of given items
 * @param {array} items - Items that will be evaluated to extract a current page
 * @param {number} currentPage - The current page where to start showing items
 * @param {number} itemsPerPage - Number of items that are visible per page
 */
export default function paginate(
  items: any[] = [],
  currentPage: number = 1,
  itemsPerPage: number = 5
): IPagination {
  const totalItems = items.length;
  const numOfPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = [...items].splice(startIndex, itemsPerPage);

  return {
    currentItems,
    currentPage,
    itemsPerPage,
    numOfPages,
    startIndex,
    totalItems
  };
}
