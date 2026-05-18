'use client'

import { useRouter } from 'next/navigation'

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const router = useRouter()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'hero', label: 'Hero Slider', icon: '🎨' },
    { id: 'messages', label: 'Messages', icon: '📧' },
    { id: 'gallery', label: 'Gallery', icon: '🖼️' },
    { id: 'content', label: 'Content', icon: '📝' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen flex flex-col">
      <div className="p-4 mb-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Mypower<span className="text-blue-600">Admin</span>
        </h1>
      </div>

      <nav className="space-y-2 px-4 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
        >
          <span>🚪</span>
          <span className="font-medium">Logout</span>
        </button>
        <a
          href="/"
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg mt-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span>🌐</span>
          <span className="font-medium">View Site</span>
        </a>
      </div>
    </div>
  )
}
