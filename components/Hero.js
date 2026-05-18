export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">Welcome to my portfolio</p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I&apos;m <span className="text-blue-600 dark:text-blue-400">Bijay Karki</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8">
              Sales Head at <span className="text-blue-600 dark:text-blue-400 font-semibold">Mypower</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              Driving sales excellence in premium mobile accessories. With years of experience in the industry, I help customers find the perfect tech solutions for their needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                Get in Touch
              </a>
              <a
                href="#about"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white text-6xl sm:text-7xl md:text-9xl font-bold">BK</span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3">
                <p className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">10+</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Years Experience</p>
              </div>
              <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3">
                <p className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">500+</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
