'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  useEffect(() => {
    if (error === 'Configuration') {
      console.error('There is a problem with the server configuration.');
    } else if (error === 'AccessDenied') {
      console.error('Access denied. You may need additional permissions.');
    } else if (error === 'Verification') {
      console.error('The verification failed or the token has expired.');
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Authentication Error
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {error === 'Configuration' && (
              <p>There is a problem with the server configuration. Please try again later.</p>
            )}
            {error === 'AccessDenied' && (
              <p>Access denied. You may need additional permissions.</p>
            )}
            {error === 'Verification' && (
              <p>The verification failed or the token has expired.</p>
            )}
            {!error && (
              <p>An unknown error occurred.</p>
            )}
          </div>
          <div className="mt-5">
            <button
              onClick={() => router.push('/auth/signin')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
