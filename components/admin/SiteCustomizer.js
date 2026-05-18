'use client'

import { useState, useEffect } from 'react'

const titleSizeOptions = [
  { label: 'Small (2xl)', value: 'text-2xl' },
  { label: 'Medium (3xl)', value: 'text-3xl' },
  { label: 'Large (4xl)', value: 'text-4xl' },
  { label: 'Extra Large (5xl)', value: 'text-5xl' },
  { label: 'Huge (6xl)', value: 'text-6xl' },
]

const textSizeOptions = [
  { label: 'Small (sm)', value: 'text-sm' },
  { label: 'Base (base)', value: 'text-base' },
  { label: 'Large (lg)', value: 'text-lg' },
  { label: 'Extra Large (xl)', value: 'text-xl' },
]

export default function SiteCustomizer() {
  const [activeSection, setActiveSection] = useState('global')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    global: { primaryColor: '#2563eb', fontFamily: 'Arial, Helvetica, sans-serif' },
    hero: {
      title: 'Bijay Karki',
      titleColor: '#ffffff',
      titleSize: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
      subtitle: 'Sales Head at Mypower',
      subtitleColor: '#ffffff',
      subtitleSize: 'text-xl sm:text-2xl md:text-3xl',
      description: '',
      descriptionColor: '#ffffff',
      descriptionSize: 'text-base md:text-lg',
      showInitials: true,
      initials: 'BK',
      experienceYears: '10+',
      happyClients: '500+',
      ctaPrimary: 'Get in Touch',
      ctaSecondary: 'Learn More',
    },
    about: {
      title: 'About Me',
      titleSize: 'text-3xl sm:text-4xl',
      description: '',
      journeyTitle: 'My Journey',
      journeyText1: '',
      journeyText2: '',
      whyChooseTitle: 'Why Choose Me?',
      whyChooseItems: ['', '', '', ''],
      stats: [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }],
    },
    services: { title: 'What I Do', titleSize: 'text-3xl sm:text-4xl', description: '' },
    achievements: { title: 'Achievements', titleSize: 'text-3xl sm:text-4xl', description: '' },
    products: { title: 'Mypower Products', titleSize: 'text-3xl sm:text-4xl', description: '' },
    contact: {
      title: 'Get in Touch',
      titleSize: 'text-3xl sm:text-4xl',
      description: '',
      location: 'Kathmandu, Nepal',
      email: 'bijayofficial03@gmail.com',
      phone: '+977-984886695',
      businessHoursTitle: 'Business Hours',
      businessHoursWeek: 'Sunday - Friday: 10:00 AM - 6:00 PM',
      businessHoursWeekend: 'Saturday: Closed',
    },
    footer: {
      description: '',
      socialLinks: { facebook: '', instagram: '', linkedin: '' },
    },
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      if (res.ok && data.settings) {
        setSettings(data.settings)
      }
    } catch {
      console.error('Failed to fetch settings')
    }
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch {
      console.error('Failed to save settings')
    }
    setSaving(false)
  }

  const updateSection = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }))
  }

  const updateNested = (section, parent, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [parent]: { ...prev[section][parent], [key]: value } },
    }))
  }

  const updateArrayItem = (section, key, index, value) => {
    setSettings((prev) => {
      const arr = [...prev[section][key]]
      arr[index] = value
      return { ...prev, [section]: { ...prev[section], [key]: arr } }
    })
  }

  const updateStat = (index, field, value) => {
    setSettings((prev) => {
      const stats = [...prev.about.stats]
      stats[index] = { ...stats[index], [field]: value }
      return { ...prev, about: { ...prev.about, stats } }
    })
  }

  const sections = [
    { id: 'global', label: 'Global', icon: '🎨' },
    { id: 'hero', label: 'Hero', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'services', label: 'Services', icon: '💼' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'products', label: 'Products', icon: '📱' },
    { id: 'contact', label: 'Contact', icon: '📞' },
    { id: 'footer', label: 'Footer', icon: '🔗' },
  ]

  if (loading) {
    return <div className="text-center py-12 text-gray-500 dark:text-gray-400">Loading settings...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Site Customizer</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
        >
          {saving ? 'Saving...' : saved ? '✅ Saved!' : '💾 Save All'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSection === s.id
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        {activeSection === 'global' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Global Settings</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={settings.global.primaryColor}
                  onChange={(e) => updateSection('global', 'primaryColor', e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={settings.global.primaryColor}
                  onChange={(e) => updateSection('global', 'primaryColor', e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Hero Section</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={settings.hero.title}
                onChange={(e) => updateSection('hero', 'title', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.hero.titleColor}
                    onChange={(e) => updateSection('hero', 'titleColor', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={settings.hero.titleColor}
                    onChange={(e) => updateSection('hero', 'titleColor', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title Size</label>
                <select
                  value={settings.hero.titleSize}
                  onChange={(e) => updateSection('hero', 'titleSize', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {titleSizeOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subtitle</label>
              <input
                type="text"
                value={settings.hero.subtitle}
                onChange={(e) => updateSection('hero', 'subtitle', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subtitle Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.hero.subtitleColor}
                    onChange={(e) => updateSection('hero', 'subtitleColor', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={settings.hero.subtitleColor}
                    onChange={(e) => updateSection('hero', 'subtitleColor', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subtitle Size</label>
                <select
                  value={settings.hero.subtitleSize}
                  onChange={(e) => updateSection('hero', 'subtitleSize', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {titleSizeOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                value={settings.hero.description}
                onChange={(e) => updateSection('hero', 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.hero.descriptionColor}
                    onChange={(e) => updateSection('hero', 'descriptionColor', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={settings.hero.descriptionColor}
                    onChange={(e) => updateSection('hero', 'descriptionColor', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description Size</label>
                <select
                  value={settings.hero.descriptionSize}
                  onChange={(e) => updateSection('hero', 'descriptionSize', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {textSizeOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Initials</label>
                <input
                  type="text"
                  value={settings.hero.initials}
                  onChange={(e) => updateSection('hero', 'initials', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="flex items-center space-x-4 pt-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.hero.showInitials}
                    onChange={(e) => updateSection('hero', 'showInitials', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Show Initials Badge</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience Years</label>
                <input
                  type="text"
                  value={settings.hero.experienceYears}
                  onChange={(e) => updateSection('hero', 'experienceYears', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Happy Clients</label>
                <input
                  type="text"
                  value={settings.hero.happyClients}
                  onChange={(e) => updateSection('hero', 'happyClients', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary CTA Text</label>
                <input
                  type="text"
                  value={settings.hero.ctaPrimary}
                  onChange={(e) => updateSection('hero', 'ctaPrimary', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Secondary CTA Text</label>
                <input
                  type="text"
                  value={settings.hero.ctaSecondary}
                  onChange={(e) => updateSection('hero', 'ctaSecondary', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">About Section</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={settings.about.title}
                onChange={(e) => updateSection('about', 'title', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title Size</label>
              <select
                value={settings.about.titleSize}
                onChange={(e) => updateSection('about', 'titleSize', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {titleSizeOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Journey Title</label>
              <input
                type="text"
                value={settings.about.journeyTitle}
                onChange={(e) => updateSection('about', 'journeyTitle', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Journey Paragraph 1</label>
              <textarea
                value={settings.about.journeyText1}
                onChange={(e) => updateSection('about', 'journeyText1', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Journey Paragraph 2</label>
              <textarea
                value={settings.about.journeyText2}
                onChange={(e) => updateSection('about', 'journeyText2', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Why Choose Title</label>
              <input
                type="text"
                value={settings.about.whyChooseTitle}
                onChange={(e) => updateSection('about', 'whyChooseTitle', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Why Choose Items</label>
              {settings.about.whyChooseItems.map((item, i) => (
                <input
                  key={i}
                  type="text"
                  value={item}
                  onChange={(e) => updateArrayItem('about', 'whyChooseItems', i, e.target.value)}
                  placeholder={`Item ${i + 1}`}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none mb-2"
                />
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stats</label>
              {settings.about.stats.map((stat, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(i, 'value', e.target.value)}
                    placeholder="Value"
                    className="w-24 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(i, 'label', e.target.value)}
                    placeholder="Label"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'services' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Services Section</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={settings.services.title}
                onChange={(e) => updateSection('services', 'title', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title Size</label>
              <select
                value={settings.services.titleSize}
                onChange={(e) => updateSection('services', 'titleSize', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {titleSizeOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                value={settings.services.description}
                onChange={(e) => updateSection('services', 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>
        )}

        {activeSection === 'achievements' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Achievements Section</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={settings.achievements.title}
                onChange={(e) => updateSection('achievements', 'title', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title Size</label>
              <select
                value={settings.achievements.titleSize}
                onChange={(e) => updateSection('achievements', 'titleSize', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {titleSizeOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                value={settings.achievements.description}
                onChange={(e) => updateSection('achievements', 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>
        )}

        {activeSection === 'products' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Products Section</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={settings.products.title}
                onChange={(e) => updateSection('products', 'title', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title Size</label>
              <select
                value={settings.products.titleSize}
                onChange={(e) => updateSection('products', 'titleSize', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {titleSizeOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                value={settings.products.description}
                onChange={(e) => updateSection('products', 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Contact Section</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={settings.contact.title}
                onChange={(e) => updateSection('contact', 'title', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title Size</label>
              <select
                value={settings.contact.titleSize}
                onChange={(e) => updateSection('contact', 'titleSize', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {titleSizeOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                value={settings.contact.description}
                onChange={(e) => updateSection('contact', 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  value={settings.contact.location}
                  onChange={(e) => updateSection('contact', 'location', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="text"
                  value={settings.contact.email}
                  onChange={(e) => updateSection('contact', 'email', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                <input
                  type="text"
                  value={settings.contact.phone}
                  onChange={(e) => updateSection('contact', 'phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Hours Title</label>
              <input
                type="text"
                value={settings.contact.businessHoursTitle}
                onChange={(e) => updateSection('contact', 'businessHoursTitle', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Week Hours</label>
                <input
                  type="text"
                  value={settings.contact.businessHoursWeek}
                  onChange={(e) => updateSection('contact', 'businessHoursWeek', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weekend Hours</label>
                <input
                  type="text"
                  value={settings.contact.businessHoursWeekend}
                  onChange={(e) => updateSection('contact', 'businessHoursWeekend', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'footer' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Footer</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                value={settings.footer.description}
                onChange={(e) => updateSection('footer', 'description', e.target.value)}
                rows={2}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Social Links</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Facebook URL</label>
              <input
                type="url"
                value={settings.footer.socialLinks.facebook}
                onChange={(e) => updateNested('footer', 'socialLinks', 'facebook', e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Instagram URL</label>
              <input
                type="url"
                value={settings.footer.socialLinks.instagram}
                onChange={(e) => updateNested('footer', 'socialLinks', 'instagram', e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={settings.footer.socialLinks.linkedin}
                onChange={(e) => updateNested('footer', 'socialLinks', 'linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
