import Link from 'next/link';
import Image from 'next/image';
import LandingNav from '@/components/LandingNav';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <LandingNav />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Transform Your Sales Performance with{' '}
                <span className="text-meta-500 dark:text-meta-400">FFS</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Fortitude Financial Services brings you a powerful sales analytics platform designed 
                to boost your team's performance and drive growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-meta-500 hover:bg-meta-600 dark:bg-meta-400 dark:hover:bg-meta-500 transition-colors duration-200"
                >
                  Test the Software
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-6 py-3 border border-meta-500 dark:border-meta-400 text-base font-medium rounded-xl text-meta-500 dark:text-meta-400 hover:bg-meta-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  Sign Up Now
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-meta-500/20 to-meta-600/20 dark:from-meta-400/20 dark:to-meta-500/20 rounded-3xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-xl">
                  {/* Replace with your actual dashboard screenshot */}
                  <Image
                    src="/dashboard-preview.png"
                    alt="FFS Dashboard Preview"
                    width={800}
                    height={600}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Powerful Features for Your Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-meta-500/10 dark:bg-meta-400/10 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border-2 ${
                  plan.popular
                    ? 'border-meta-500 dark:border-meta-400'
                    : 'border-gray-100 dark:border-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="bg-meta-500 dark:bg-meta-400 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <svg
                        className="w-5 h-5 text-meta-500 dark:text-meta-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${
                    plan.popular
                      ? 'bg-meta-500 hover:bg-meta-600 dark:bg-meta-400 dark:hover:bg-meta-500 text-white'
                      : 'border border-meta-500 dark:border-meta-400 text-meta-500 dark:text-meta-400 hover:bg-meta-50 dark:hover:bg-gray-800'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-meta-500 dark:bg-meta-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Sales Performance?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of successful sales teams who trust FFS to drive their growth
            and performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-meta-500 dark:text-meta-400 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Try it Free
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-colors duration-200"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: 'Real-time Analytics',
    description: 'Get instant insights into your sales performance with our powerful analytics engine.',
    icon: (
      <svg
        className="w-6 h-6 text-meta-500 dark:text-meta-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    title: 'Team Management',
    description: "Efficiently manage and track your sales team's performance and goals.",
    icon: (
      <svg
        className="w-6 h-6 text-meta-500 dark:text-meta-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Custom Reports',
    description: 'Generate detailed reports tailored to your specific business needs.',
    icon: (
      <svg
        className="w-6 h-6 text-meta-500 dark:text-meta-400"
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
    ),
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: 49,
    popular: false,
    features: [
      'Up to 5 team members',
      'Basic analytics',
      'Standard reports',
      'Email support',
      '5GB storage',
    ],
  },
  {
    name: 'Professional',
    price: 99,
    popular: true,
    features: [
      'Up to 20 team members',
      'Advanced analytics',
      'Custom reports',
      'Priority support',
      '50GB storage',
      'API access',
    ],
  },
  {
    name: 'Enterprise',
    price: 199,
    popular: false,
    features: [
      'Unlimited team members',
      'Enterprise analytics',
      'Custom solutions',
      '24/7 dedicated support',
      'Unlimited storage',
      'Full API access',
      'Custom integrations',
    ],
  },
];
