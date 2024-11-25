'use client';

import { useState } from 'react';
import ReportModal from '@/components/ReportModal';

interface ReportType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Reports() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<{ type: 'exco' | 'agent', title: string } | null>(null);

  const excoReports: ReportType[] = [
    {
      id: 'sales_overview',
      title: 'Sales Overview',
      description: 'Comprehensive overview of sales performance, revenue, and growth metrics.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'agent_performance',
      title: 'Agent Performance',
      description: 'Detailed analysis of agent performance, rankings, and key metrics.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'financial_metrics',
      title: 'Financial Metrics',
      description: 'Revenue analysis, collection methods, and financial performance indicators.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const agentReports: ReportType[] = [
    {
      id: 'personal_performance',
      title: 'Personal Performance',
      description: 'Your individual sales performance, targets, and achievements.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'commission_report',
      title: 'Commission Report',
      description: 'Detailed breakdown of your commission earnings and calculations.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'policy_portfolio',
      title: 'Policy Portfolio',
      description: 'Overview of your active and cancelled policies.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  const openModal = (type: 'exco' | 'agent', title: string) => {
    setSelectedReport({ type, title });
    setModalOpen(true);
  };

  const ReportCard = ({ report, type }: { report: ReportType, type: 'exco' | 'agent' }) => (
    <div
      onClick={() => openModal(type, report.title)}
      className="
        bg-white dark:bg-gray-800 rounded-2xl p-6
        hover:shadow-lg dark:hover:shadow-gray-800/50
        transition-all duration-200 cursor-pointer
        border border-gray-100 dark:border-gray-700
        hover:border-meta-500 dark:hover:border-meta-400
      "
    >
      <div className="w-12 h-12 bg-meta-50 dark:bg-meta-900/40 rounded-xl flex items-center justify-center text-meta-500 dark:text-meta-400 mb-4">
        {report.icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {report.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {report.description}
      </p>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Reports
        </h1>
      </div>

      {/* EXCO Reports */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          EXCO Reports
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {excoReports.map(report => (
            <ReportCard key={report.id} report={report} type="exco" />
          ))}
        </div>
      </div>

      {/* Agent Reports */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Agent Reports
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agentReports.map(report => (
            <ReportCard key={report.id} report={report} type="agent" />
          ))}
        </div>
      </div>

      {/* Report Modal */}
      {selectedReport && (
        <ReportModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedReport(null);
          }}
          type={selectedReport.type}
          title={selectedReport.title}
        />
      )}
    </div>
  );
}
