'use client';

interface UploadPromptProps {
  onUploadClick: () => void;
  onUseSampleData: () => void;
}

export function UploadPrompt({ onUploadClick, onUseSampleData }: UploadPromptProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -inset-x-20 -top-20 -bottom-20 hidden sm:block">
          <div className="absolute inset-0 bg-gradient-to-r from-meta-500/30 to-transparent dark:from-meta-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-3xl" />
          <div className="absolute right-0 inset-y-0 w-48 bg-gradient-to-l from-meta-500/30 to-transparent dark:from-meta-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-3xl" />
        </div>

        <div className="relative group">
          <div className="p-8 sm:p-10">
            {/* Main content */}
            <div className="text-center space-y-6">
              {/* Icon */}
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 bg-meta-500/20 dark:bg-meta-500/10 rounded-3xl transform rotate-45 group-hover:rotate-12 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-meta-500 to-meta-600 rounded-3xl opacity-90 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Text */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Welcome to FFS Sale Report
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Upload your sales report or use sample data to get started
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onUploadClick}
                  className="
                    w-full sm:w-auto px-6 py-3 rounded-xl
                    bg-meta-500 hover:bg-meta-600
                    text-white font-medium
                    transition-all duration-200
                    flex items-center justify-center gap-2
                    group/btn
                  "
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Upload Report
                </button>

                <button
                  onClick={onUseSampleData}
                  className="
                    w-full sm:w-auto px-6 py-3 rounded-xl
                    bg-meta-50 dark:bg-meta-500/10
                    text-meta-600 dark:text-meta-400
                    font-medium
                    hover:bg-meta-100 dark:hover:bg-meta-500/20
                    transition-all duration-200
                    flex items-center justify-center gap-2
                    group/btn
                  "
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Use Sample Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
