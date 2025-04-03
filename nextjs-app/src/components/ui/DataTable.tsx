// components/ui/DataTable.tsx
import React, { useEffect, useState } from 'react';

interface Column {
  Header: string;
  accessor: string;
}

interface DataTableProps {
  data: any[];
  columns: Column[]; // Changed from string[] to Column[]
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState<{ 
    key: string; 
    direction: 'ascending' | 'descending' 
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    let sortedData = [...data];
    if (sortConfig !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    setFilteredData(sortedData);
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="border border-gray-300 p-2 cursor-pointer"
                onClick={() => requestSort(column.accessor)}
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.accessor} className="border border-gray-300 p-2">
                  {item[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
    </div>
  );
};

export default DataTable;