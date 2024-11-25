import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SalesData } from '@/types';

export const exportToExcel = (data: SalesData[], fileName: string = 'sales_report') => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sales Data');
  writeFile(workbook, `${fileName}.xlsx`);
};

export const exportToPDF = (data: SalesData[], fileName: string = 'sales_report') => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text('Sales Report', 14, 15);
  doc.setFontSize(10);
  
  // Convert data to format suitable for autoTable
  const tableData = data.map(item => [
    item.date,
    item.product,
    item.revenue.toString(),
    item.quantity.toString(),
    item.region,
    item.salesPerson
  ]);
  
  // Define columns
  const columns = [
    'Date',
    'Product',
    'Revenue',
    'Quantity',
    'Region',
    'Sales Person'
  ];
  
  // Add table
  autoTable(doc, {
    head: [columns],
    body: tableData,
    startY: 25,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [66, 66, 66],
    },
  });
  
  // Save PDF
  doc.save(`${fileName}.pdf`);
};
