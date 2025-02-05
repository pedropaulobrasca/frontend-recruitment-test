import React from 'react';
import Pagination from './Pagination';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  actions?: {
    edit: (item: T) => void;
    delete: (item: T) => void;
  };
  pageInfo?: {
    pageNumber: number;
    pageSize: number;
    totalEntries: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
}

export function DataTable<T>(
  { data, columns, onRowClick, actions, pageInfo, onPageChange }: DataTableProps<T>
) {
  const currentPage = pageInfo?.pageNumber || 1;
  const totalPages = pageInfo?.totalPages || 0;

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''
                    }`}
                >
                  {column.header}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(item)}
                className={`${onRowClick ? 'cursor-pointer' : ''} ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-gray-100`}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${column.className || ''
                      }`}
                  >
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : String(item[column.accessor])}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        actions.edit(item);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                    >
                      Editar
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        actions.delete(item);
                      }}
                      className="text-red-600 hover:text-red-900 cursor-pointer"
                    >
                      Excluir
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        {totalPages > 1 && onPageChange && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}