'use client';

import { useState } from 'react';
import { SalesData } from '@/types';
import { TimePeriod, getDateRange, formatDate, isDateInRange } from '@/utils/dateUtils';
import { ExportOptions } from './ExportOptions';

interface ManagementReportProps {
  data: SalesData[];
}

export default function ManagementReport({ data }: ManagementReportProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('weekly');
  const { startDate, endDate } = getDateRange(selectedPeriod);

  // Filter data based on selected period
  const filteredData = data.filter(item => isDateInRange(item.date, startDate, endDate));

  // Process the data for the report
  const processReport = (salesData: SalesData[]) => {
    const totalSales = salesData
      .filter(item => item.type === 'ON')
      .reduce((sum, item) => sum + item.policy.policyAmount, 0);

    const totalCancellations = salesData
      .filter(item => item.type === 'OFF')
      .reduce((sum, item) => sum + item.policy.policyAmount, 0);

    const netSales = totalSales - totalCancellations;

    // Calculate agent performance
    const agentPerformance = Object.values(
      salesData.reduce((acc: { [key: string]: any }, item) => {
        const agentCode = item.agent.code;
        if (!acc[agentCode]) {
          acc[agentCode] = {
            agent: item.agent,
            sales: 0,
            cancellations: 0,
            netAmount: 0,
            policies: [],
          };
        }

        const amount = item.policy.policyAmount;
        if (item.type === 'ON') {
          acc[agentCode].sales += amount;
          acc[agentCode].netAmount += amount;
        } else {
          acc[agentCode].cancellations += amount;
          acc[agentCode].netAmount -= amount;
        }
        acc[agentCode].policies.push(item);

        return acc;
      }, {})
    );

    return {
      totalSales,
      totalCancellations,
      netSales,
      agentPerformance,
      totalPolicies: salesData.length,
      newPolicies: salesData.filter(item => item.type === 'ON').length,
      cancelledPolicies: salesData.filter(item => item.type === 'OFF').length,
    };
  };

  const report = processReport(filteredData);

  const periodOptions: { value: TimePeriod; label: string }[] = [
    { value: 'all', label: 'All Time' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'fortnight', label: 'Fortnight' },
    { value: 'weekly', label: 'Weekly' },
  ];

  return (
    <div className="space-y-8">
      {/* Period Selector and Date Range */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="period" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              View Report By:
            </label>
            <select
              id="period"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as TimePeriod)}
              className="
                rounded-xl border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-900
                text-gray-900 dark:text-white
                shadow-sm focus:border-meta-500 dark:focus:border-meta-400
                focus:ring-meta-500 dark:focus:ring-meta-400
              "
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(startDate)} - {formatDate(endDate)}
            </div>
            <ExportOptions data={filteredData} />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Sales</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            R{report.totalSales.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Cancellations</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            R{report.totalCancellations.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">Net Sales</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            R{report.netSales.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Policy Counts */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Policy Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Policies</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{report.totalPolicies}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">New Policies</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">{report.newPolicies}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Cancelled Policies</p>
            <p className="text-xl font-bold text-red-600 dark:text-red-400">{report.cancelledPolicies}</p>
          </div>
        </div>
      </div>

      {/* Agent Performance Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Agent Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cancellations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Net Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {report.agentPerformance.map((agent: any) => (
                <tr key={agent.agent.code}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{agent.agent.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{agent.agent.code}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-green-600 dark:text-green-400">
                      R{agent.sales.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-red-600 dark:text-red-400">
                      R{agent.cancellations.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={agent.netAmount >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                      R{agent.netAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
