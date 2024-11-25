'use client';

import { useState, useRef } from 'react';
import { utils, writeFile } from 'xlsx';
import { SalesData } from '@/types';

interface ReportMetric {
  id: string;
  label: string;
  enabled: boolean;
}

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'exco' | 'agent';
  title: string;
}

export default function ReportModal({ isOpen, onClose, type, title }: ReportModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [dateRange, setDateRange] = useState('month');
  const [metrics, setMetrics] = useState<ReportMetric[]>([
    ...(type === 'exco' ? [
      { id: 'total_revenue', label: 'Total Revenue', enabled: true },
      { id: 'new_policies', label: 'New Policies', enabled: true },
      { id: 'cancellations', label: 'Cancellations', enabled: true },
      { id: 'growth_rate', label: 'Growth Rate', enabled: true },
      { id: 'agent_performance', label: 'Agent Performance', enabled: true },
      { id: 'collection_methods', label: 'Collection Methods Distribution', enabled: true },
    ] : [
      { id: 'personal_sales', label: 'Personal Sales', enabled: true },
      { id: 'conversion_rate', label: 'Conversion Rate', enabled: true },
      { id: 'active_policies', label: 'Active Policies', enabled: true },
      { id: 'cancelled_policies', label: 'Cancelled Policies', enabled: true },
      { id: 'commission', label: 'Commission', enabled: true },
    ])
  ]);

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' },
  ];

  const handleMetricToggle = (metricId: string) => {
    setMetrics(metrics.map(metric => 
      metric.id === metricId ? { ...metric, enabled: !metric.enabled } : metric
    ));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (overlayRef.current === e.target) {
      onClose();
    }
  };

  const generateReport = () => {
    // TODO: Generate report based on selected metrics and date range
    const dummyData = [
      {
        date: '2023-01-01',
        metric: 'Total Sales',
        value: 150000
      },
      // Add more dummy data as needed
    ];

    // Create workbook
    const ws = utils.json_to_sheet(dummyData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Report');

    // Generate filename
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${type}_report_${timestamp}.xlsx`;

    // Save file
    writeFile(wb, filename);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Date Range Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="
              w-full rounded-xl border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-900 text-gray-900 dark:text-white
              shadow-sm focus:border-meta-500 dark:focus:border-meta-400
              focus:ring-meta-500 dark:focus:ring-meta-400
            "
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Metrics Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Metrics
          </label>
          <div className="space-y-3">
            {metrics.map(metric => (
              <label key={metric.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={metric.enabled}
                  onChange={() => handleMetricToggle(metric.id)}
                  className="
                    rounded border-gray-300 dark:border-gray-600
                    text-meta-500 dark:text-meta-400
                    focus:ring-meta-500 dark:focus:ring-meta-400
                  "
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {metric.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-xl
              border border-gray-200 dark:border-gray-700
              text-gray-700 dark:text-gray-300
              hover:bg-gray-50 dark:hover:bg-gray-800
              transition-colors duration-200
            "
          >
            Cancel
          </button>
          <button
            onClick={generateReport}
            className="
              px-4 py-2 rounded-xl
              bg-meta-500 hover:bg-meta-600
              dark:bg-meta-400 dark:hover:bg-meta-500
              text-white font-medium
              transition-colors duration-200
            "
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}
