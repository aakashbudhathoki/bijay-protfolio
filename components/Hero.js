'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
  const [images, setImages] = useState([])
  const [current, setCurrent] = useState(0)
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    fetch('/api/admin/hero')
      .then((res) => res.json())
      .then((data) => {
        if (data.images && data.images.length > 0) {
          setImages(data.images)
        }
      })
      .catch(() => {})
  }, [])

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

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  const goTo = (index) => setCurrent(index)
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length)
  const next = () => setCurrent((prev) => (prev + 1) % images.length)

  const h = settings?.hero || {}
  const title = h.title || 'Bijay Karki'
  const titleColor = h.titleColor || '#ffffff'
  const titleSize = h.titleSize || 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
  const subtitle = h.subtitle || 'Sales Head at Mypower'
  const subtitleColor = h.subtitleColor || '#ffffff'
  const subtitleSize = h.subtitleSize || 'text-xl sm:text-2xl md:text-3xl'
  const description = h.description || 'Driving sales excellence in premium mobile accessories. With years of experience in the industry, I help customers find the perfect tech solutions for their needs.'
  const descriptionColor = h.descriptionColor || '#ffffff'
  const descriptionSize = h.descriptionSize || 'text-base md:text-lg'
  const showInitials = h.showInitials !== false
  const initials = h.initials || 'BK'
  const experienceYears = h.experienceYears || '10+'
  const happyClients = h.happyClients || '500+'
  const ctaPrimary = h.ctaPrimary || 'Get in Touch'
  const ctaSecondary = h.ctaSecondary || 'Learn More'

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gray-900">
      {images.length > 0 && (
        <>
          {images.map((img, index) => (
            <div
              key={img._id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === current ? 'opacity-100 z-0' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ))}

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white transition-colors"
                aria-label="Previous"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white transition-colors"
                aria-label="Next"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === current ? 'w-8 h-3 bg-white' : 'w-3 h-3 bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {images.length === 0 && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-0" />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center lg:text-left">
            <p className="text-blue-400 font-semibold mb-4">Welcome to my portfolio</p>
            <h1 className={`${titleSize} font-bold mb-4 md:mb-6`} style={{ color: titleColor }}>
              {title}
            </h1>
            <h2 className={`${subtitleSize} mb-6 md:mb-8`} style={{ color: subtitleColor }}>
              {subtitle}
            </h2>
            <p className={`${descriptionSize} mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0`} style={{ color: descriptionColor }}>
              {description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                {ctaPrimary}
              </a>
              <a
                href="#about"
                className="border-2 border-white/50 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:border-blue-400 hover:text-blue-400 transition-colors backdrop-blur-sm"
              >
                {ctaSecondary}
              </a>
            </div>
          </div>

          {showInitials && (
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-96 h-96 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/20">
                  <span className="text-white text-9xl font-bold">{initials}</span>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-4">
                  <p className="text-2xl font-bold text-blue-600">{experienceYears}</p>
                  <p className="text-gray-600 text-sm">Years Experience</p>
                </div>
                <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-4">
                  <p className="text-2xl font-bold text-green-600">{happyClients}</p>
                  <p className="text-gray-600 text-sm">Happy Clients</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
