'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Send } from 'lucide-react'

export default function ROXCommandPane() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hi! I can help you with college admissions questions. Ask me anything!' }
  ])
  const [draft, setDraft] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.trim()) return
    
    setMessages([...messages, { role: 'user', content: draft }])
    setDraft('')
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Based on your profile, I can help you improve your chances. What specific aspect would you like to focus on?' 
      }])
    }, 1000)
  }

  return (
    <GlassCard className="h-[640px] grid grid-rows-[1fr_auto] p-0 overflow-hidden">
      <div className="overflow-auto p-4 space-y-3">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`max-w-[70%] ${
              message.role === 'user'
                ? 'ml-auto bg-primary text-primary-foreground'
                : 'bg-background-raised text-foreground'
            } rounded-xl px-3 py-2 text-sm`}
          >
            {message.content}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="border-t border-border p-3 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask about college admissions, SAT prep, or profile building..."
          className="flex-1 h-11 rounded-xl bg-background-raised px-3 outline-none text-foreground placeholder:text-foreground/50 border border-border focus:border-primary/50 transition-colors"
        />
        <Button type="submit" className="h-11 bg-primary text-primary-foreground px-4">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </GlassCard>
  )
}
