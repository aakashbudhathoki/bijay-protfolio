'use client'

import { useState, useEffect } from 'react'

export default function MessagesView({ messages, setMessages }) {
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages')
      const data = await res.json()
      if (res.ok) {
        setMessages(data.messages || [])
      }
    } catch {
      setMessages([])
    }
    setLoading(false)
  }

  const deleteMessage = async (id) => {
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setMessages((prev) => prev.filter((msg) => msg._id !== id))
        setSelectedMessage(null)
      }
    } catch {
      console.error('Failed to delete message')
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-500 dark:text-gray-400">Loading messages...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Messages</h1>

      {messages.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-sm">
          <p className="text-6xl mb-4">📭</p>
          <p className="text-gray-500 dark:text-gray-400 text-lg">No messages yet</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Messages from the contact form will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b dark:border-gray-700">
              <h2 className="font-bold text-gray-900 dark:text-white">
                All Messages ({messages.length})
              </h2>
            </div>
            <div className="overflow-y-auto max-h-[600px]">
              {messages.map((msg) => (
                <button
                  key={msg._id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`w-full text-left p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedMessage?._id === msg._id ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{msg.name}</p>
                    <span className="text-xs text-gray-400 ml-2">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{msg.email}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">{msg.message}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            {selectedMessage ? (
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedMessage.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{selectedMessage.email}</p>
                    {selectedMessage.phone && (
                      <p className="text-gray-500 dark:text-gray-400">📞 {selectedMessage.phone}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteMessage(selectedMessage._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p className="text-6xl mb-4">👈</p>
                <p>Select a message to view</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
