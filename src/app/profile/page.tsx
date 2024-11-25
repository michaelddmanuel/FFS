'use client';

export default function Profile() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Profile
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-meta-100 dark:bg-meta-900/40 flex items-center justify-center">
              <svg className="w-12 h-12 text-meta-600 dark:text-meta-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">John Doe</h2>
              <p className="text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Information</h3>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">john.doe@example.com</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">+1 (555) 123-4567</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">San Francisco, CA</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Information</h3>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">Administrator</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700 dark:text-gray-300">Department</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">Sales</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700 dark:text-gray-300">Member Since</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">January 1, 2023</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
