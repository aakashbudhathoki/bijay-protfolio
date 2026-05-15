'use client'

import { useState } from 'react'

export default function GalleryManager({ gallery, setGallery }) {
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [caption, setCaption] = useState('')

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('caption', caption)

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        setGallery((prev) => [...prev, data.image])
        setCaption('')
      }
    } catch (error) {
      console.error('Upload failed')
    }

    setUploading(false)
  }

  const deleteImage = async (id) => {
    try {
      const res = await fetch(`/api/admin/upload?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setGallery((prev) => prev.filter((img) => img._id !== id))
      }
    } catch (error) {
      console.error('Delete failed')
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Gallery Manager</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Upload New Image</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Image caption..."
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

      {gallery.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-sm">
          <p className="text-6xl mb-4">🖼️</p>
          <p className="text-gray-500 dark:text-gray-400 text-lg">No images in gallery yet</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Upload your first image above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((img) => (
            <div
              key={img._id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button
                    onClick={() => setSelectedImage(img)}
                    className="bg-white text-gray-900 px-3 py-1 rounded-lg text-sm hover:bg-gray-100"
                  >
                    👁️ View
                  </button>
                  <button
                    onClick={() => deleteImage(img._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-900 dark:text-white font-medium">{img.caption}</p>
                <p className="text-gray-400 text-sm">{new Date(img.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full p-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={selectedImage.caption}
              className="w-full rounded-lg mb-4"
            />
            <p className="text-gray-900 dark:text-white text-center font-medium">{selectedImage.caption}</p>
            <button
              onClick={() => setSelectedImage(null)}
              className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
