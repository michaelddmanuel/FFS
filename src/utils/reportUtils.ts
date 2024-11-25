import { read, utils } from 'xlsx';
import { Agent, Policy, SalesData, AgentReport, ManagementReport } from '../types';

const REQUIRED_COLUMNS = [
  'AgentName',
  'AgentCode',
  'PolicyNumber',
  'CustomerIDNumber',
  'CustomerName',
  'CustomerSurname',
  'PolicyAmount',
  'CollectionMethod',
  'PolicyStartDate',
  'Type',
  'Date'
];

export const processExcelFile = async (file: File): Promise<SalesData[]> => {
  try {
    const data = await file.arrayBuffer();
    const workbook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);

    if (!jsonData || jsonData.length === 0) {
      throw new Error('The Excel file is empty. Please upload a file with data.');
    }

    // Check for required columns
    const firstRow = jsonData[0] as any;
    const missingColumns = REQUIRED_COLUMNS.filter(col => !(col in firstRow));
    
    if (missingColumns.length > 0) {
      throw new Error(
        `Missing required columns: ${missingColumns.join(', ')}. \n\n` +
        'Please ensure your Excel file has the following columns:\n' +
        REQUIRED_COLUMNS.join(', ')
      );
    }

    return jsonData.map((row: any, index: number) => {
      // Validate required fields
      for (const col of REQUIRED_COLUMNS) {
        if (!row[col] && row[col] !== 0) {
          throw new Error(`Missing value for ${col} in row ${index + 2}`);
        }
      }

      // Validate numeric fields
      const policyAmount = parseFloat(row.PolicyAmount);
      if (isNaN(policyAmount)) {
        throw new Error(`Invalid PolicyAmount in row ${index + 2}. Must be a number.`);
      }

      // Validate date fields
      const date = new Date(row.Date);
      const startDate = new Date(row.PolicyStartDate);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid Date in row ${index + 2}. Must be a valid date.`);
      }
      if (isNaN(startDate.getTime())) {
        throw new Error(`Invalid PolicyStartDate in row ${index + 2}. Must be a valid date.`);
      }

      // Validate type field
      const type = row.Type.toString().toUpperCase();
      if (type !== 'ON' && type !== 'OFF') {
        throw new Error(`Invalid Type in row ${index + 2}. Must be either 'ON' or 'OFF'.`);
      }

      return {
        agent: {
          name: row.AgentName,
          code: row.AgentCode,
        },
        policy: {
          policyNumber: row.PolicyNumber,
          customerIdNumber: row.CustomerIDNumber,
          customerName: row.CustomerName,
          customerSurname: row.CustomerSurname,
          policyAmount: policyAmount,
          collectionMethod: row.CollectionMethod,
          startDate: row.PolicyStartDate,
        },
        type: type,
        date: row.Date,
      };
    });
  } catch (error: any) {
    // Check if it's our custom error or a library error
    if (error.message.includes('Invalid file')) {
      throw new Error('Invalid file format. Please upload a valid Excel file (.xlsx or .xls)');
    }
    throw error;
  }
};

export const generateAgentReport = (salesData: SalesData[], agent: Agent): AgentReport => {
  const agentSales = salesData.filter(sale => sale.agent.code === agent.code);
  
  const totalPoliciesSold = agentSales.filter(sale => sale.type === 'ON').length;
  const totalPoliciesCanceled = agentSales.filter(sale => sale.type === 'OFF').length;
  
  const salesValue = agentSales
    .filter(sale => sale.type === 'ON')
    .reduce((total, sale) => total + sale.policy.policyAmount, 0);
    
  const canceledValue = agentSales
    .filter(sale => sale.type === 'OFF')
    .reduce((total, sale) => total + sale.policy.policyAmount, 0);

  return {
    agent,
    totalPoliciesSold,
    totalPoliciesCanceled,
    netSalesValue: salesValue - canceledValue,
    policies: agentSales.map(sale => sale.policy),
  };
};

export const generateManagementReport = (salesData: SalesData[]): ManagementReport => {
  const agents = Array.from(new Set(salesData.map(sale => sale.agent.code)))
    .map(code => {
      const agentData = salesData.find(sale => sale.agent.code === code)!;
      return agentData.agent;
    });

  const agentPerformance = agents.map(agent => generateAgentReport(salesData, agent));
  
  const totalSales = salesData.filter(sale => sale.type === 'ON')
    .reduce((total, sale) => total + sale.policy.policyAmount, 0);
    
  const totalCancellations = salesData.filter(sale => sale.type === 'OFF')
    .reduce((total, sale) => total + sale.policy.policyAmount, 0);

  return {
    totalSales,
    totalCancellations,
    netPerformance: totalSales - totalCancellations,
    agentPerformance,
    startDate: salesData[0].date,
    endDate: salesData[salesData.length - 1].date,
  };
};
