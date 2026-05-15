'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      router.push('/admin/dashboard')
    } else {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
    </div>
  )
}
