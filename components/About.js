export default function About() {
  const stats = [
    { label: 'Years Experience', value: '10+' },
    { label: 'Clients Served', value: '500+' },
    { label: 'Revenue Growth', value: '150%' },
    { label: 'Team Size', value: '25+' },
  ]

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">My Journey</h3>
              <p className="text-blue-100 mb-6">
                Starting as a sales executive, I worked my way up to become the Sales Head at Mypower, one of the leading mobile accessories brands. My passion for technology and customer satisfaction has driven me to excel in this competitive industry.
              </p>
              <p className="text-blue-100">
                I believe in building lasting relationships with clients and understanding their needs to provide the best solutions. My approach combines data-driven strategies with personal touch to deliver exceptional results.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Me?</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">Expert knowledge in mobile accessories market</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">Proven track record of exceeding sales targets</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">Strong network of distributors and retailers</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">Dedicated to customer satisfaction and support</span>
              </li>
            </ul>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
