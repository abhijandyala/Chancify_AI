'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, BookOpen, Clock, Loader2, Trash2 } from 'lucide-react'
import { PresetStorage, Preset } from '@/lib/preset-storage'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const router = useRouter()
  const [presets, setPresets] = useState<Preset[]>([])
  const [loading, setLoading] = useState<string | null>(null)
  const storage = useMemo(() => new PresetStorage(), [])

  useEffect(() => {
    const presets = storage.getPresets()
    // Filter out any presets with invalid dates
    const validPresets = presets.filter(preset => {
      const date = new Date(preset.createdAt)
      return !isNaN(date.getTime())
    })
    
    // If we filtered out any invalid presets, save the cleaned list
    if (validPresets.length !== presets.length) {
      // Clear and re-save only valid presets
      localStorage.removeItem('chancify_presets')
      validPresets.forEach(preset => {
        storage.savePreset(preset.name, preset.major, preset.formData)
      })
    }
    
    setPresets(validPresets)
  }, [storage])

  const handleLoadPreset = (preset: Preset) => {
    setLoading(preset.id)
    // Store preset data for the home page to load
    sessionStorage.setItem('loadPreset', JSON.stringify(preset))
    router.push('/home')
  }

  const handleDeletePreset = (id: string) => {
    if (confirm('Are you sure you want to delete this preset?')) {
      storage.deletePreset(id)
      setPresets(storage.getPresets()) // Refresh list
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/home')}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Assessment
          </motion.button>
          <div className="flex-1 flex justify-center">
            <h1 className="text-2xl font-bold text-yellow-400">Your Presets</h1>
          </div>
          <div className="w-[120px]"></div> {/* Spacer for perfect centering */}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {presets.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 max-w-md mx-auto">
              <p className="text-lg text-gray-300 mb-6">No presets saved yet.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/home')}
                className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition-colors"
              >
                Go to AI Assessment to save one
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {presets.map(preset => (
              <motion.div
                key={preset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  {/* Horizontal layout for NAME, MAJOR, TIME */}
                  <div className="flex items-center gap-8 flex-1">
                    <div className="min-w-[140px]">
                      <h3 className="text-lg font-semibold text-white">{preset.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 min-w-[180px]">
                      <BookOpen className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">{preset.major || 'Undecided'}</span>
                    </div>
                    <div className="flex items-center gap-2 min-w-[220px]">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{new Date(preset.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLoadPreset(preset)}
                      className="px-6 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2"
                      disabled={loading === preset.id}
                    >
                      {loading === preset.id && <Loader2 className="w-4 h-4 animate-spin" />}
                      Load
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeletePreset(preset.id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}