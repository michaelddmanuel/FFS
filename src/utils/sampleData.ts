import { SalesData } from '@/types';

// Sample data generator function
export function generateSampleData(): SalesData[] {
  const agents = [
    { name: 'John Smith', code: 'AG001' },
    { name: 'Sarah Johnson', code: 'AG002' },
    { name: 'Michael Brown', code: 'AG003' },
    { name: 'Emily Davis', code: 'AG004' },
    { name: 'David Wilson', code: 'AG005' },
  ];

  const data: SalesData[] = [];
  
  // Generate data for the past year
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  agents.forEach(agent => {
    // Generate sales throughout the year
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      // Random number of sales for each day (0-3)
      const numSales = Math.floor(Math.random() * 4);
      
      for (let i = 0; i < numSales; i++) {
        const policyAmount = Math.floor(Math.random() * 40000) + 10000; // R10,000 - R50,000
        
        data.push({
          agent,
          policy: {
            policyNumber: `POL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            customerIdNumber: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
            customerName: `Customer${Math.random().toString(36).substr(2, 4)}`,
            customerSurname: `Surname${Math.random().toString(36).substr(2, 4)}`,
            policyAmount,
            collectionMethod: ['Debit Order', 'Cash', 'EFT'][Math.floor(Math.random() * 3)],
            startDate: currentDate.toISOString().split('T')[0],
          },
          type: 'ON',
          date: currentDate.toISOString().split('T')[0],
        });
      }

      // Random cancellations (20% chance per day)
      if (Math.random() < 0.2) {
        const policyAmount = Math.floor(Math.random() * 40000) + 10000;
        
        data.push({
          agent,
          policy: {
            policyNumber: `POL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            customerIdNumber: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
            customerName: `CancelCustomer${Math.random().toString(36).substr(2, 4)}`,
            customerSurname: `CancelSurname${Math.random().toString(36).substr(2, 4)}`,
            policyAmount,
            collectionMethod: ['Debit Order', 'Cash', 'EFT'][Math.floor(Math.random() * 3)],
            startDate: currentDate.toISOString().split('T')[0],
          },
          type: 'OFF',
          date: currentDate.toISOString().split('T')[0],
        });
      }

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return data;
}
