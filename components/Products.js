export default function Products() {
  const products = [
    {
      name: 'Fast Chargers',
      description: 'High-speed charging solutions for all devices',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Wireless Earbuds',
      description: 'Premium audio experience with noise cancellation',
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Phone Cases',
      description: 'Durable and stylish protection for your device',
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Screen Protectors',
      description: 'Crystal clear protection against scratches',
      color: 'from-orange-500 to-orange-600',
    },
    {
      name: 'Power Banks',
      description: 'Portable power for your on-the-go lifestyle',
      color: 'from-red-500 to-red-600',
    },
    {
      name: 'Cables & Adapters',
      description: 'Premium connectivity solutions',
      color: 'from-teal-500 to-teal-600',
    },
  ]

  return (
    <section id="products" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Mypower Products</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our range of premium mobile accessories designed for quality and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group"
            >
              <div className={`h-40 bg-gradient-to-br ${product.color} flex items-center justify-center`}>
                <span className="text-white text-6xl opacity-80 group-hover:scale-110 transition-transform">
                  {product.name === 'Fast Chargers' && '⚡'}
                  {product.name === 'Wireless Earbuds' && '🎧'}
                  {product.name === 'Phone Cases' && '📱'}
                  {product.name === 'Screen Protectors' && '🛡️'}
                  {product.name === 'Power Banks' && '🔋'}
                  {product.name === 'Cables & Adapters' && '🔌'}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
