/**
 * College Information Display Component
 * Shows real college data fetched from OpenAI
 */

import React from 'react';
import { CollegeInfo } from '@/lib/openai-college-service';
import { openaiCollegeService } from '@/lib/openai-college-service';
import { MapPin, DollarSign, Users, Calendar, Award, BookOpen } from 'lucide-react';

interface CollegeInfoDisplayProps {
  collegeInfo: CollegeInfo;
  className?: string;
}

export function CollegeInfoDisplay({ collegeInfo, className = '' }: CollegeInfoDisplayProps) {
  const formatCurrency = (amount: number) => {
    if (amount === 0) return 'Unknown';
    return `$${amount.toLocaleString()}`;
  };

  const formatPercentage = (rate: number) => {
    if (rate === 0) return 'Unknown';
    return `${(rate * 100).toFixed(1)}%`;
  };

  return (
    <div className={`bg-white/5 border border-white/10 rounded-xl p-6 ${className}`}>
      {/* College Name */}
      <h2 className="text-2xl font-bold text-white mb-4">{collegeInfo.name}</h2>
      
      {/* Location */}
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-yellow-400" />
        <span className="text-gray-300">
          {openaiCollegeService.formatLocation(collegeInfo.location)}
        </span>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Acceptance Rate */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-400">Acceptance Rate</span>
          </div>
          <div className="text-xl font-bold text-white">
            {formatPercentage(collegeInfo.academics.acceptance_rate)}
          </div>
        </div>

        {/* In-State Tuition */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-400">In-State Tuition</span>
          </div>
          <div className="text-xl font-bold text-white">
            {formatCurrency(collegeInfo.tuition.in_state)}
          </div>
        </div>

        {/* Out-of-State Tuition */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-400">Out-of-State Tuition</span>
          </div>
          <div className="text-xl font-bold text-white">
            {formatCurrency(collegeInfo.tuition.out_of_state)}
          </div>
        </div>

        {/* Room & Board */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-400">Room & Board</span>
          </div>
          <div className="text-xl font-bold text-white">
            {formatCurrency(collegeInfo.tuition.room_board)}
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Test Scores */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Test Scores</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">SAT Range:</span>
              <span className="text-white">{collegeInfo.academics.sat_range}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">ACT Range:</span>
              <span className="text-white">{collegeInfo.academics.act_range}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">GPA Requirement:</span>
              <span className="text-white">{collegeInfo.academics.gpa_requirement}</span>
            </div>
          </div>
        </div>

        {/* College Characteristics */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Characteristics</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Type:</span>
              <span className="text-white">{collegeInfo.characteristics.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Size:</span>
              <span className="text-white">{collegeInfo.characteristics.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Setting:</span>
              <span className="text-white">{collegeInfo.characteristics.setting}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Selectivity:</span>
              <span className="text-white">{collegeInfo.characteristics.selectivity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Strong Programs */}
      {collegeInfo.programs.strong_programs.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-yellow-400" />
            Strong Programs
          </h3>
          <div className="flex flex-wrap gap-2">
            {collegeInfo.programs.strong_programs.map((program, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm"
              >
                {program}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Founded & Motto */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-yellow-400" />
            History
          </h3>
          <div className="space-y-2">
            <div>
              <span className="text-gray-400">Founded:</span>
              <span className="text-white ml-2">{collegeInfo.additional_info.founded}</span>
            </div>
            {collegeInfo.additional_info.motto !== 'Unknown' && (
              <div>
                <span className="text-gray-400">Motto:</span>
                <span className="text-white ml-2 italic">"{collegeInfo.additional_info.motto}"</span>
              </div>
            )}
          </div>
        </div>

        {/* Notable Alumni */}
        {collegeInfo.additional_info.notable_alumni.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Notable Alumni</h3>
            <ul className="space-y-1">
              {collegeInfo.additional_info.notable_alumni.map((alumnus, index) => (
                <li key={index} className="text-gray-300 text-sm">
                  • {alumnus}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
