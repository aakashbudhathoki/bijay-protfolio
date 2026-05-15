'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '../../../components/admin/AdminSidebar'
import DashboardHome from '../../../components/admin/DashboardHome'
import MessagesView from '../../../components/admin/MessagesView'
import GalleryManager from '../../../components/admin/GalleryManager'
import ContentManager from '../../../components/admin/ContentManager'
import SettingsView from '../../../components/admin/SettingsView'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [messages, setMessages] = useState([])
  const [achievements, setAchievements] = useState([])
  const [gallery, setGallery] = useState([])
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome messages={messages} achievements={achievements} gallery={gallery} />
      case 'messages':
        return <MessagesView messages={messages} setMessages={setMessages} />
      case 'gallery':
        return <GalleryManager gallery={gallery} setGallery={setGallery} />
      case 'content':
        return <ContentManager achievements={achievements} setAchievements={setAchievements} />
      case 'settings':
        return <SettingsView />
      default:
        return <DashboardHome messages={messages} achievements={achievements} gallery={gallery} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </div>
    </div>
  )
}
