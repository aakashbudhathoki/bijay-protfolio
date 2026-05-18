'use client'

import { useState, useEffect } from 'react'

export default function HeroManager() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/admin/hero')
      const data = await res.json()
      if (res.ok) {
        setImages(data.images || [])
      }
    } catch {
      console.error('Failed to fetch hero images')
    }
    setLoading(false)
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const uploadRes = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const uploadData = await uploadRes.json()

      if (uploadRes.ok) {
        const res = await fetch('/api/admin/hero', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: uploadData.image.url, caption }),
        })

        const data = await res.json()
        if (res.ok) {
          setImages((prev) => [...prev, data.image])
          setCaption('')
        }
      }
    } catch {
      console.error('Upload failed')
    }

    setUploading(false)
  }

  const deleteImage = async (id) => {
    try {
      const res = await fetch(`/api/admin/hero?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img._id !== id))
      }
    } catch {
      console.error('Delete failed')
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-500 dark:text-gray-400">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Hero Slider Manager</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Upload Hero Background Image</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Images will be displayed as-is without cropping. Recommended: high-resolution images.</p>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Image caption (optional)..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <label className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-center">
            {uploading ? 'Uploading...' : '📤 Choose Image'}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-sm">
          <p className="text-6xl mb-4">🖼️</p>
          <p className="text-gray-500 dark:text-gray-400 text-lg">No hero images yet</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Upload images to create a beautiful background slider</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Uploaded Images ({images.length})
          </h2>
          {images.map((img, index) => (
            <div
              key={img._id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center space-x-4 flex-1">
                <span className="text-gray-400 font-bold text-lg">{index + 1}</span>
                <div className="w-32 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">{img.caption || 'No caption'}</p>
                  <p className="text-gray-400 text-sm">{new Date(img.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <button
                onClick={() => deleteImage(img._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex-shrink-0"
              >
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
