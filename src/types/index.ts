export interface Agent {
  name: string;
  code: string;
}

export interface Policy {
  policyNumber: string;
  customerIdNumber: string;
  customerName: string;
  customerSurname: string;
  policyAmount: number;
  collectionMethod: string;
  startDate: string;
}

export interface SalesData {
  date: string;
  type: 'ON' | 'OFF';
  agent: Agent;
  policy: Policy;
}

export interface AgentReport {
  agent: Agent;
  totalPoliciesSold: number;
  totalPoliciesCanceled: number;
  netSalesValue: number;
  policies: Policy[];
}

export interface ManagementReport {
  totalSales: number;
  totalCancellations: number;
  netPerformance: number;
  agentPerformance: AgentReport[];
  startDate: string;
  endDate: string;
}
