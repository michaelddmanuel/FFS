import { AgentReport as AgentReportType } from '@/types';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface Props {
  report: AgentReportType;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  subheader: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    width: '33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
});

const PDFReport = ({ report }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Agent Performance Report</Text>
        <Text style={styles.text}>Agent: {report.agent.name} ({report.agent.code})</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>Performance Summary</Text>
        <Text style={styles.text}>Total Policies Sold: {report.totalPoliciesSold}</Text>
        <Text style={styles.text}>Total Policies Canceled: {report.totalPoliciesCanceled}</Text>
        <Text style={styles.text}>Net Sales Value: R{report.netSalesValue.toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>Policy Details</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>Policy Number</Text></View>
            <View style={styles.tableCell}><Text>Customer</Text></View>
            <View style={styles.tableCell}><Text>Amount</Text></View>
          </View>
          {report.policies.map((policy, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCell}><Text>{policy.policyNumber}</Text></View>
              <View style={styles.tableCell}>
                <Text>{policy.customerName} {policy.customerSurname}</Text>
              </View>
              <View style={styles.tableCell}><Text>R{policy.policyAmount.toFixed(2)}</Text></View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default function AgentReport({ report }: Props) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Agent Performance Report</h2>
            <p className="text-gray-600">{report.agent.name} ({report.agent.code})</p>
          </div>
          <PDFDownloadLink
            document={<PDFReport report={report} />}
            fileName={`agent-report-${report.agent.code}.pdf`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {(props) => (
              <span>{props.loading ? 'Loading...' : 'Download PDF'}</span>
            )}
          </PDFDownloadLink>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 p-4 rounded">
            <p className="text-sm text-gray-600">Policies Sold</p>
            <p className="text-2xl font-bold text-green-600">{report.totalPoliciesSold}</p>
          </div>
          <div className="bg-red-50 p-4 rounded">
            <p className="text-sm text-gray-600">Policies Canceled</p>
            <p className="text-2xl font-bold text-red-600">{report.totalPoliciesCanceled}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-sm text-gray-600">Net Sales Value</p>
            <p className="text-2xl font-bold text-blue-600">R{report.netSalesValue.toFixed(2)}</p>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Collection Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
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
                      <div className="text-sm text-gray-500">{policy.customerIdNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R{policy.policyAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {policy.collectionMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {policy.startDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
