import * as XLSX from 'xlsx';
import { SalesData } from '@/types';

export const exportToExcel = async (data: SalesData[]) => {
  try {
    const workbook = XLSX.utils.book_new();
    
    // Transform data for Excel
    const excelData = data.map(sale => ({
      'Date': sale.date,
      'Type': sale.type,
      'Agent Code': sale.agent.code,
      'Agent Name': sale.agent.name,
      'Policy Number': sale.policy.policyNumber,
      'Customer ID': sale.policy.customerIdNumber,
      'Customer Name': `${sale.policy.customerName} ${sale.policy.customerSurname}`,
      'Policy Amount': sale.policy.policyAmount,
      'Collection Method': sale.policy.collectionMethod,
      'Start Date': sale.policy.startDate,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Data');

    // Generate Excel file
    XLSX.writeFile(workbook, 'sales_report.xlsx');
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw error;
  }
};
