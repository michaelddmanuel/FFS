'use client';

import { useState } from 'react';
import { exportToExcel } from '@/utils/exportUtils';
import { SalesData } from '@/types';

interface Props {
  data: SalesData[];
}

export function ExportOptions({ data }: Props) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportToExcel = async () => {
    try {
      setIsExporting(true);
      await exportToExcel(data);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <button
        onClick={handleExportToExcel}
        disabled={isExporting}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm 
          ${
            isExporting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
          }`}
      >
        {isExporting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Exporting...
          </>
        ) : (
          'Export to Excel'
        )}
      </button>
    </div>
  );
}
