import { useState, useEffect } from 'react'

export function useSiteSettings() {
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

  return settings
}
