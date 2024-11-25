'use client';

import { useState } from 'react';
import { SalesData } from '@/types';
import { exportToExcel, exportToPDF } from '@/utils/exportUtils';

interface ExportOptionsProps {
  data: SalesData[];
}

export function ExportOptions({ data }: ExportOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = async (format: 'xlsx' | 'pdf') => {
    const timestamp = new Date().toISOString().split('T')[0];
    const fileName = `sales_report_${timestamp}`;

    try {
      if (format === 'xlsx') {
        exportToExcel(data, fileName);
      } else {
        exportToPDF(data, fileName);
      }
    } catch (error) {
      console.error('Error exporting file:', error);
      // You might want to add proper error handling/notification here
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-sm font-medium text-white bg-meta-500 rounded-lg hover:bg-meta-600 dark:bg-meta-400 dark:hover:bg-meta-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-meta-500 dark:focus:ring-meta-400"
      >
        Export Report
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => {
                handleExport('xlsx');
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              Export as Excel (.xlsx)
            </button>
            <button
              onClick={() => {
                handleExport('pdf');
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              Export as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
