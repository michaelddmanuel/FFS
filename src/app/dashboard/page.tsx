'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import { Modal } from '@/components/Modal';
import { UploadPrompt } from '@/components/UploadPrompt';
import { SalesData } from '@/types';
import { generateSampleData } from '@/utils/sampleData';
import ManagementReport from '@/components/ManagementReport';

export default function Dashboard() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [salesData, setSalesData] = useState<SalesData[] | null>(null);

  const handleDataProcessed = (data: SalesData[]) => {
    setShowUploadModal(false);
    setHasData(true);
    setSalesData(data);
  };

  const handleUseSampleData = () => {
    setShowUploadModal(false);
    setHasData(true);
    const sampleData = generateSampleData();
    setSalesData(sampleData);
  };

  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Header
        showUploadButton={hasData}
        onUploadClick={() => setShowUploadModal(true)}
        onUseSampleData={handleUseSampleData}
      />

      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {!hasData ? (
          <div className="flex items-center justify-center h-full">
            <UploadPrompt
              onUploadClick={() => setShowUploadModal(true)}
              onUseSampleData={handleUseSampleData}
            />
          </div>
        ) : (
          <div className="h-full">
            <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Dashboard Content
            </h2>
            {salesData && <ManagementReport data={salesData} />}
          </div>
        )}
      </div>

      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Sales Report"
      >
        <FileUpload
          onDataProcessed={handleDataProcessed}
          onUseSampleData={handleUseSampleData}
        />
      </Modal>
    </main>
  );
}
