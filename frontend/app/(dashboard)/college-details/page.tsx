'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Award, 
  BookOpen,
  Star,
  Target,
  BarChart3,
  Calendar,
  GraduationCap
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function CollegeDetailsPage() {
  const router = useRouter()

  const enter = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { type: 'spring' as const, stiffness: 120, damping: 20, mass: 0.6 },
    viewport: { once: true, margin: '-10% 0px -10% 0px' }
  }

  // Mock data for demonstration - in real app this would come from API
  const colleges = [
    {
      name: 'Harvard University',
      location: 'Cambridge, MA',
      ranking: 1,
      acceptanceRate: 3.2,
      totalStudents: 23000,
      tuition: 54269,
      roomBoard: 18589,
      yourChance: 15,
      category: 'Reach',
      color: 'red',
      stats: {
        admits: 1950,
        rejects: 58000,
        waitlist: 1200
      },
      expenses: {
        tuition: 54269,
        roomBoard: 18589,
        books: 1200,
        personal: 3000,
        total: 77058
      }
    },
    {
      name: 'Stanford University',
      location: 'Stanford, CA',
      ranking: 2,
      acceptanceRate: 3.9,
      totalStudents: 17000,
      tuition: 61731,
      roomBoard: 19522,
      yourChance: 12,
      category: 'Reach',
      color: 'red',
      stats: {
        admits: 2100,
        rejects: 52000,
        waitlist: 800
      },
      expenses: {
        tuition: 61731,
        roomBoard: 19522,
        books: 1200,
        personal: 3000,
        total: 85453
      }
    },
    {
      name: 'UC Berkeley',
      location: 'Berkeley, CA',
      ranking: 20,
      acceptanceRate: 11.4,
      totalStudents: 45000,
      tuition: 14312,
      roomBoard: 19530,
      yourChance: 45,
      category: 'Target',
      color: 'yellow',
      stats: {
        admits: 15000,
        rejects: 117000,
        waitlist: 8000
      },
      expenses: {
        tuition: 14312,
        roomBoard: 19530,
        books: 1200,
        personal: 3000,
        total: 38042
      }
    },
    {
      name: 'UCLA',
      location: 'Los Angeles, CA',
      ranking: 15,
      acceptanceRate: 8.6,
      totalStudents: 46000,
      tuition: 13124,
      roomBoard: 16509,
      yourChance: 38,
      category: 'Target',
      color: 'yellow',
      stats: {
        admits: 15000,
        rejects: 160000,
        waitlist: 10000
      },
      expenses: {
        tuition: 13124,
        roomBoard: 16509,
        books: 1200,
        personal: 3000,
        total: 33833
      }
    },
    {
      name: 'University of Michigan',
      location: 'Ann Arbor, MI',
      ranking: 25,
      acceptanceRate: 18.0,
      totalStudents: 50000,
      tuition: 17000,
      roomBoard: 12000,
      yourChance: 65,
      category: 'Safety',
      color: 'green',
      stats: {
        admits: 16000,
        rejects: 73000,
        waitlist: 5000
      },
      expenses: {
        tuition: 17000,
        roomBoard: 12000,
        books: 1200,
        personal: 3000,
        total: 33200
      }
    }
  ]

  const getCategoryColor = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-400/20 border-red-400/30 text-red-400'
      case 'yellow': return 'bg-yellow-400/20 border-yellow-400/30 text-yellow-400'
      case 'green': return 'bg-green-400/20 border-green-400/30 text-green-400'
      default: return 'bg-gray-400/20 border-gray-400/30 text-gray-400'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...enter} className="text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-yellow-300 mb-4">
          <GraduationCap className="w-4 h-4" />
          <span className="text-sm font-semibold">College Discovery</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-yellow-400 mb-4">
          Your College Matches
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Discover colleges that align with your profile, with detailed insights on admissions, costs, and opportunities
        </p>
      </motion.div>

      {/* Back Button */}
      <motion.div {...enter}>
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="border border-white/10 hover:border-yellow-400/50 hover:text-yellow-400"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Button>
      </motion.div>

      {/* College Cards */}
      <div className="grid gap-8">
        {colleges.map((college, index) => (
          <motion.div
            key={college.name}
            {...enter}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-8 hover:shadow-2xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Basic Info */}
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{college.name}</h2>
                      <div className="flex items-center gap-2 text-gray-400 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{college.location}</span>
                      </div>
                      <Badge 
                        variant={college.color === 'red' ? 'danger' : college.color === 'yellow' ? 'warning' : 'success'}
                        size="sm"
                      >
                        {college.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-yellow-400 mb-1">
                        #{college.ranking}
                      </div>
                      <div className="text-sm text-gray-400">National Ranking</div>
                    </div>
                  </div>

                  {/* Your Chance */}
                  <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="w-5 h-5 text-yellow-400" />
                      <span className="font-semibold text-white">Your Admission Chance</span>
                    </div>
                    <div className="text-3xl font-bold text-yellow-400">
                      {college.yourChance}%
                    </div>
                  </div>
                </div>

                {/* Middle Column - Admissions Stats */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold text-white">Admissions Statistics</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <span className="text-gray-400">Acceptance Rate</span>
                      <span className="font-semibold text-white">{college.acceptanceRate}%</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 rounded-lg bg-green-400/10 border border-green-400/20">
                        <div className="text-lg font-bold text-green-400">{college.stats.admits.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Admitted</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-red-400/10 border border-red-400/20">
                        <div className="text-lg font-bold text-red-400">{(college.stats.rejects / 1000).toFixed(0)}K</div>
                        <div className="text-xs text-gray-400">Rejected</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
                        <div className="text-lg font-bold text-yellow-400">{college.stats.waitlist.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Waitlist</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <span className="text-gray-400">Total Students</span>
                      <span className="font-semibold text-white">{college.totalStudents.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Financial Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-bold text-white">Annual Expenses</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <span className="text-gray-400">Tuition</span>
                      <span className="font-semibold text-white">${college.expenses.tuition.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <span className="text-gray-400">Room & Board</span>
                      <span className="font-semibold text-white">${college.expenses.roomBoard.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <span className="text-gray-400">Books & Supplies</span>
                      <span className="font-semibold text-white">${college.expenses.books.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <span className="text-gray-400">Personal Expenses</span>
                      <span className="font-semibold text-white">${college.expenses.personal.toLocaleString()}</span>
                    </div>
                    
                    <div className="border-t border-white/10 pt-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
                        <span className="font-semibold text-white">Total Annual Cost</span>
                        <span className="text-xl font-bold text-yellow-400">${college.expenses.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-white/10">
                <Button className="flex-1 rox-button">
                  <Star className="w-4 h-4 mr-2" />
                  Add to Watchlist
                </Button>
                <Button variant="ghost" className="flex-1 rox-button-ghost">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button variant="ghost" className="flex-1 rox-button-ghost">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Compare
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div {...enter}>
        <GlassCard className="p-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-white">Your College Landscape</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">5</div>
                <div className="text-sm text-gray-400">Colleges Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">2</div>
                <div className="text-sm text-gray-400">Safety Schools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">2</div>
                <div className="text-sm text-gray-400">Target Schools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">2</div>
                <div className="text-sm text-gray-400">Reach Schools</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
