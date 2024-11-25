'use client';

import { useState, useRef } from 'react';
import { processExcelFile } from '@/utils/reportUtils';
import { SalesData } from '@/types';
import { utils, writeFile } from 'xlsx';

interface FileUploadProps {
  onDataProcessed: (data: SalesData[]) => void;
  onUseSampleData: () => void;
}

export default function FileUpload({ onDataProcessed, onUseSampleData }: FileUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await processExcelFile(file);
      onDataProcessed(data);
    } catch (err: any) {
      setError(err.message || 'Error processing file. Please ensure it\'s a valid Excel file.');
      console.error(err);
    } finally {
      setIsLoading(false);
      // Reset the input value so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await processExcelFile(file);
      onDataProcessed(data);
    } catch (err: any) {
      setError(err.message || 'Error processing file. Please ensure it\'s a valid Excel file.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const downloadTemplate = () => {
    // Create a sample row
    const sampleData = [{
      AgentName: 'John Smith',
      AgentCode: 'AG001',
      PolicyNumber: 'POL-12345',
      CustomerIDNumber: '1234567890',
      CustomerName: 'Jane',
      CustomerSurname: 'Doe',
      PolicyAmount: '10000',
      CollectionMethod: 'Cash',
      PolicyStartDate: '2024-01-01',
      Type: 'ON',
      Date: '2024-01-01'
    }];

    // Create a new workbook
    const ws = utils.json_to_sheet(sampleData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sales Data');

    // Save the file
    writeFile(wb, 'sales_report_template.xlsx');
  };

  return (
    <div className="space-y-6">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative rounded-2xl border-2 border-dashed p-8 cursor-pointer
          ${isDragging
            ? 'border-meta-500 bg-meta-50/10 dark:bg-meta-500/10'
            : 'border-gray-200 dark:border-gray-800 hover:border-meta-500 dark:hover:border-meta-500 hover:bg-meta-50/10 dark:hover:bg-meta-500/10'
          }
          transition-all duration-200 group
          dark:bg-gray-900/50
        `}
      >
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-meta-500/5 to-transparent dark:from-meta-500/10 rounded-2xl pointer-events-none" />

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          accept=".xlsx,.xls"
          className="hidden"
          disabled={isLoading}
        />
        
        <div className="relative flex flex-col items-center">
          {/* Upload icon with animated circle */}
          <div className="mb-4 relative">
            <div className={`
              absolute inset-0 bg-meta-100/50 dark:bg-meta-500/20 rounded-full scale-[0.8]
              transition-transform duration-300
              ${isDragging ? 'scale-[1.2] bg-meta-200 dark:bg-meta-500/30' : 'group-hover:scale-[1]'}
            `} />
            <div className="relative p-4">
              <svg
                className="w-8 h-8 text-meta-500 dark:text-meta-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>

          {/* Text content */}
          <div className="text-center">
            <p className="text-base font-medium mb-1 text-gray-700 dark:text-gray-300">
              Drop your Excel file here, or click to browse
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Supports .xlsx and .xls files
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); downloadTemplate(); }}
              className="text-sm text-meta-500 hover:text-meta-600 dark:text-meta-400 dark:hover:text-meta-300 mt-2"
            >
              Download template
            </button>
          </div>
        </div>
      </div>

      {/* Divider with text */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">or</span>
        </div>
      </div>

      {/* Sample data button */}
      <button
        onClick={onUseSampleData}
        disabled={isLoading}
        className="
          w-full py-3 px-4 rounded-xl
          bg-meta-50 dark:bg-meta-500/10
          text-meta-600 dark:text-meta-400
          font-medium
          hover:bg-meta-100 dark:hover:bg-meta-500/20
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          flex items-center justify-center gap-2
        "
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Use Sample Data
      </button>

      {/* Status messages */}
      <div className="space-y-2">
        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing file...
          </div>
        )}
        
        {error && (
          <div className="flex items-start justify-center gap-2 text-sm text-meta-600 dark:text-meta-400">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="whitespace-pre-line">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
