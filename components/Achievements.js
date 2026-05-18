'use client'

import { useState, useEffect } from 'react'

export default function Achievements() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setSettings(data.settings)
        }
      })
      .catch(() => {})
  }, [])

  const a = settings?.achievements || {}
  const title = a.title || 'Achievements'
  const titleSize = a.titleSize || 'text-3xl sm:text-4xl'
  const description = a.description || 'Milestones and accomplishments that reflect my dedication to excellence in sales.'

  const achievements = [
    {
      year: '2024',
      title: 'Top Sales Leader Award',
      description: 'Recognized as the top-performing sales leader in the mobile accessories industry.',
      icon: '🏆',
    },
    {
      year: '2023',
      title: '150% Revenue Growth',
      description: 'Achieved exceptional revenue growth for Mypower brand in a single fiscal year.',
      icon: '📈',
    },
    {
      year: '2022',
      title: 'Expanded to 50+ Retailers',
      description: 'Successfully expanded distribution network to over 50 major retail partners.',
      icon: '🤝',
    },
    {
      year: '2021',
      title: 'Best Team Performance',
      description: 'Led the sales team to win the Best Team Performance award at Mypower.',
      icon: '⭐',
    },
  ]

  return (
    <section id="achievements" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className={`${titleSize} font-bold text-gray-900 dark:text-white mb-4`}>{title}</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className="flex items-start bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/30 dark:to-gray-700 rounded-xl p-6 border border-blue-100 dark:border-blue-800 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mr-6">{achievement.icon}</div>
              <div>
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">{achievement.year}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{achievement.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
