'use client'

import { useState } from 'react'

export default function ContentManager({ achievements, setAchievements }) {
  const [activeSection, setActiveSection] = useState('achievements')
  const [newAchievement, setNewAchievement] = useState({
    year: '',
    title: '',
    description: '',
    icon: '🏆',
  })

  const iconOptions = ['🏆', '📈', '🤝', '⭐', '🎯', '💼', '🚀', '💡', '🎖️', '🏅']

  const addAchievement = async () => {
    if (!newAchievement.year || !newAchievement.title || !newAchievement.description) return

    try {
      const res = await fetch('/api/admin/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAchievement),
      })

      const data = await res.json()

      if (res.ok) {
        setAchievements((prev) => [...prev, data.achievement])
        setNewAchievement({ year: '', title: '', description: '', icon: '🏆' })
      }
    } catch (error) {
      console.error('Failed to add achievement')
    }
  }

  const deleteAchievement = async (id) => {
    try {
      const res = await fetch(`/api/admin/achievements?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setAchievements((prev) => prev.filter((a) => a._id !== id))
      }
    } catch (error) {
      console.error('Failed to delete achievement')
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Content Manager</h1>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveSection('achievements')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeSection === 'achievements'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
          }`}
        >
          🏆 Achievements
        </button>
        <button
          onClick={() => setActiveSection('profile')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeSection === 'profile'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
          }`}
        >
          👤 Profile
        </button>
        <button
          onClick={() => setActiveSection('social')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeSection === 'social'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
          }`}
        >
          🔗 Social Links
        </button>
      </div>

      {activeSection === 'achievements' && (
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add New Achievement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={newAchievement.year}
                onChange={(e) => setNewAchievement({ ...newAchievement, year: e.target.value })}
                placeholder="Year (e.g., 2024)"
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                value={newAchievement.title}
                onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                placeholder="Achievement Title"
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <textarea
              value={newAchievement.description}
              onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
              placeholder="Description"
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none mb-4 resize-none"
            />
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-gray-600 dark:text-gray-400">Icon:</span>
              <div className="flex space-x-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setNewAchievement({ ...newAchievement, icon })}
                    className={`text-2xl p-2 rounded-lg ${
                      newAchievement.icon === icon
                        ? 'bg-blue-100 dark:bg-blue-900'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={addAchievement}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ➕ Add Achievement
            </button>
          </div>

          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement._id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{achievement.icon}</span>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">{achievement.year}</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{achievement.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{achievement.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteAchievement(achievement._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'profile' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="Bijay Karki"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Title</label>
              <input
                type="text"
                defaultValue="Sales Head"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
              <input
                type="text"
                defaultValue="Mypower"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
              <textarea
                defaultValue="Driving sales excellence in premium mobile accessories..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              💾 Save Changes
            </button>
          </div>
        </div>
      )}

      {activeSection === 'social' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Social Media Links</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Facebook URL</label>
              <input
                type="url"
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Instagram URL</label>
              <input
                type="url"
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn URL</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter URL</label>
              <input
                type="url"
                placeholder="https://twitter.com/..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              💾 Save Links
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
