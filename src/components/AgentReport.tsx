import { AgentReportType } from '@/types';

interface Props {
  report: AgentReportType;
}

const AgentReport = ({ report }: Props) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
      Agent Performance Report
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <p className="text-gray-600 dark:text-gray-400">Agent Code</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">{report.agent.code}</p>
      </div>
      <div>
        <p className="text-gray-600 dark:text-gray-400">Agent Name</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">{report.agent.name}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400">Total Policies Sold</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {report.totalPoliciesSold}
        </p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400">Total Policies Canceled</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {report.totalPoliciesCanceled}
        </p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400">Net Sales Value</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          R{report.netSalesValue.toFixed(2)}
        </p>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-4">Policy Details</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Policy Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {report.policies.map((policy, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {policy.policyNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {policy.customerName} {policy.customerSurname}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  R{policy.policyAmount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AgentReport;
