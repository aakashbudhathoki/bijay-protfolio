export default function DashboardHome({ messages, achievements, gallery }) {
  const stats = [
    { label: 'Total Messages', value: messages.length || 0, icon: '📧', color: 'bg-blue-500' },
    { label: 'Achievements', value: achievements.length || 4, icon: '🏆', color: 'bg-green-500' },
    { label: 'Gallery Items', value: gallery.length || 0, icon: '🖼️', color: 'bg-purple-500' },
    { label: 'Products', value: 6, icon: '📱', color: 'bg-orange-500' },
  ]

  const recentMessages = messages.slice(-5).reverse()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Messages</h2>
          {recentMessages.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
          ) : (
            <div className="space-y-4">
              {recentMessages.map((msg, idx) => (
                <div key={idx} className="border-b dark:border-gray-700 pb-3 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{msg.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{msg.email}</p>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              📤 Upload New Image
            </button>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
              ➕ Add Achievement
            </button>
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
              📝 Edit Content
            </button>
            <button className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors">
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
