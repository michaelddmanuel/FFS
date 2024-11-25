import * as XLSX from 'xlsx';
import { SalesData } from '@/types/sales';

export const exportToExcel = (data: SalesData[], fileName: string = 'sales_report') => {
  // Convert data to worksheet format
  const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
    'Agent Code': item.agent.code,
    'Agent Name': item.agent.name,
    'Total Sales': item.totalSales,
    'Total Commissions': item.totalCommissions,
    'Sales Count': item.salesCount,
    'Average Sale Value': item.averageSaleValue,
    'Performance Score': item.performanceScore
  })));

  // Create workbook and append worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Data');

  // Generate Excel file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
