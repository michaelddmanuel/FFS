import Sidebar from '@/components/Sidebar';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 bg-white dark:bg-gray-900">{children}</main>
    </div>
  );
}
