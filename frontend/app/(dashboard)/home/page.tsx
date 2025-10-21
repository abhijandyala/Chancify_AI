'use client'

import { GlassCard } from '@/components/ui/GlassCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { SimpleSearchableSelect } from '@/components/ui/SimpleSearchableSelect'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { MAJORS } from '@/lib/majors'
import Reveal from '@/components/ui/Reveal'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const [profile, setProfile] = useState({
    // Academic Basics
    gpa_unweighted: '',
    gpa_weighted: '',
    sat: '',
    act: '',
    rigor: '5',
    
    // UNIQUE FACTORS - What makes Chancify AI special!
    extracurricular_depth: '5',
    leadership_positions: '5',
    awards_publications: '5',
    passion_projects: '5',
    business_ventures: '5',
    volunteer_work: '5',
    research_experience: '5',
    portfolio_audition: '5',
    essay_quality: '5',
    recommendations: '5',
    interview: '5',
    demonstrated_interest: '5',
    legacy_status: '5',
    geographic_diversity: '5',
    firstgen_diversity: '5',
    major: '',
    hs_reputation: '5',
  })

  const updateProfile = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  return (
    <div className="space-y-6 pb-8">
      <Reveal>
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Welcome to Chancify AI
          </h1>
          <p className="text-foreground-muted text-lg mb-2">
            The only AI that considers your unique story - not just numbers
          </p>
          <p className="text-xs text-foreground-dim mb-4">
            *Predictions are based on statistical analysis and historical data. Results are estimates and may not reflect actual admission outcomes.
          </p>
          <div className="mt-4 p-4 glass-card rounded-xl border border-primary/20">
            <p className="text-sm text-primary/90">
              <strong>What makes us different:</strong> While others only look at GPA and test scores, 
              we analyze your leadership, passion projects, research, awards, and the complete picture 
              of who you are as a person.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Academic Basics */}
      <Reveal delay={0.1}>
        <GlassCard className="p-8 hover:border-primary/40 transition-colors">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Academic Foundation
          </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Input
            label="Unweighted GPA (4.0 scale)"
            type="number"
            step="0.01"
            min="0"
            max="4"
            placeholder="3.85"
            value={profile.gpa_unweighted}
            onChange={(e) => updateProfile('gpa_unweighted', e.target.value)}
            helperText="GPA without honors/AP weighting"
          />
          
          <Input
            label="Weighted GPA (5.0 scale)"
            type="number"
            step="0.01"
            min="0"
            max="5"
            placeholder="4.25"
            value={profile.gpa_weighted}
            onChange={(e) => updateProfile('gpa_weighted', e.target.value)}
            helperText="GPA with honors/AP weighting"
          />
          
          <Input
            label="SAT Score"
            type="number"
            min="400"
            max="1600"
            placeholder="1450"
            value={profile.sat}
            onChange={(e) => updateProfile('sat', e.target.value)}
            helperText="Total SAT score (optional)"
          />
          
          <Input
            label="ACT Score"
            type="number"
            min="1"
            max="36"
            placeholder="32"
            value={profile.act}
            onChange={(e) => updateProfile('act', e.target.value)}
            helperText="ACT composite (optional)"
          />
          
          <Select
            label="Course Rigor"
            value={profile.rigor}
            onChange={(e) => updateProfile('rigor', e.target.value)}
            options={[
              { value: '10', label: '10 - Most Rigorous (Many AP/IB)' },
              { value: '8', label: '8 - Very Rigorous (Several AP/IB)' },
              { value: '6', label: '6 - Rigorous (Some AP/Honors)' },
              { value: '4', label: '4 - Moderate (Few AP/Honors)' },
              { value: '2', label: '2 - Standard (Regular courses)' },
            ]}
          />
        </div>
      </GlassCard>

      {/* UNIQUE FACTORS - What sets us apart! */}
      <GlassCard className="p-8">
        <h2 className="subsection-heading mb-6">
          Your Unique Story - What Makes You Special
        </h2>
        <p className="text-muted mb-6">
          These are the factors that set Chancify AI apart from other college predictors. 
          We understand that you're more than just numbers!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Select
            label="Extracurricular Depth"
            value={profile.extracurricular_depth}
            onChange={(e) => updateProfile('extracurricular_depth', e.target.value)}
            options={[
              { value: '10', label: '3+ years, leadership roles, national recognition, measurable impact' },
              { value: '9', label: '3+ years, officer positions, regional recognition, clear achievements' },
              { value: '8', label: '2+ years, significant involvement, local recognition, organized events' },
              { value: '7', label: '2+ years, active member, some leadership, regular participation' },
              { value: '6', label: '1-2 years, committed member, consistent attendance, some contribution' },
              { value: '5', label: '1+ years, regular member, occasional participation, basic involvement' },
              { value: '4', label: 'Less than 1 year, irregular attendance, minimal contribution' },
              { value: '3', label: 'Joined recently, very limited involvement, just getting started' },
              { value: '2', label: 'Minimal participation, mostly inactive, very little time commitment' },
              { value: '1', label: 'No real involvement, just signed up, no meaningful participation' },
            ]}
          />

          <Select
            label="Leadership Positions"
            value={profile.leadership_positions}
            onChange={(e) => updateProfile('leadership_positions', e.target.value)}
            options={[
              { value: '10', label: 'President/Founder of 3+ organizations, board positions, executive roles' },
              { value: '9', label: 'President/VP of major clubs, team captain, committee chair' },
              { value: '8', label: 'Vice President/Secretary of 2+ clubs, section leader, project manager' },
              { value: '7', label: 'Officer in 1-2 clubs, team leader, event coordinator' },
              { value: '6', label: 'Treasurer/Historian, small group leader, mentor role' },
              { value: '5', label: 'Committee member, peer tutor, occasional leadership tasks' },
              { value: '4', label: 'Helped organize 1-2 events, led small projects, informal leader' },
              { value: '3', label: 'Minimal leadership, mostly follower, occasional initiative' },
              { value: '2', label: 'Very little leadership experience, mostly passive participation' },
              { value: '1', label: 'No leadership roles, always follows others, no initiative shown' },
            ]}
          />

          <Select
            label="Awards & Publications"
            value={profile.awards_publications}
            onChange={(e) => updateProfile('awards_publications', e.target.value)}
            options={[
              { value: '10', label: 'National/international awards, published research, major competitions (ISEF, Regeneron)' },
              { value: '9', label: 'National honors, published work, top 1% in competitions, academic journals' },
              { value: '8', label: 'State/regional awards, published articles, top 5% competitions, conference presentations' },
              { value: '7', label: 'State recognition, local publications, regional competitions, academic honors' },
              { value: '6', label: 'Local awards, school publications, county/district competitions, honor roll' },
              { value: '5', label: 'School-level awards, club recognition, participation certificates, good grades' },
              { value: '4', label: 'Minor school recognition, attendance awards, basic academic achievement' },
              { value: '3', label: 'Very limited recognition, mostly participation, few achievements' },
              { value: '2', label: 'Minimal awards, mostly just showing up, very little recognition' },
              { value: '1', label: 'No significant awards or publications, no notable recognition' },
            ]}
          />

          <Select
            label="Passion Projects"
            value={profile.passion_projects}
            onChange={(e) => updateProfile('passion_projects', e.target.value)}
            options={[
              { value: '10', label: 'Revolutionary impact, thousands of users, media coverage, funding received' },
              { value: '9', label: 'Major impact, hundreds of users, significant outcomes, partnerships formed' },
              { value: '8', label: 'Substantial impact, dozens of users, measurable results, recognition gained' },
              { value: '7', label: 'Good impact, clear outcomes, active users, regular progress made' },
              { value: '6', label: 'Meaningful progress, some users, consistent work, clear goals achieved' },
              { value: '5', label: 'Decent progress, basic functionality, occasional users, steady development' },
              { value: '4', label: 'Some progress, early stages, limited users, working on features' },
              { value: '3', label: 'Minimal progress, mostly planning, very few users, basic prototype' },
              { value: '2', label: 'Little progress, mostly ideas, no real users, struggling to start' },
              { value: '1', label: 'No real projects, just ideas, no execution, no meaningful progress' },
            ]}
          />

          <Select
            label="Business Ventures"
            value={profile.business_ventures}
            onChange={(e) => updateProfile('business_ventures', e.target.value)}
            options={[
              { value: '10', label: 'Successful startup, $10K+ revenue, multiple customers, business registered' },
              { value: '9', label: 'Profitable business, $5K+ revenue, growing customer base, clear business model' },
              { value: '8', label: 'Active business, $1K+ revenue, regular customers, ongoing operations' },
              { value: '7', label: 'Business with sales, some revenue, customer base building, operational' },
              { value: '6', label: 'Business venture started, first sales made, early customers, learning' },
              { value: '5', label: 'Business idea developed, prototype created, testing market, planning launch' },
              { value: '4', label: 'Business concept formed, researching market, early planning stages' },
              { value: '3', label: 'Some business ideas, minimal execution, mostly theoretical' },
              { value: '2', label: 'Very basic business thinking, no real execution, mostly ideas' },
              { value: '1', label: 'No business ventures, no entrepreneurial experience, no business ideas' },
            ]}
          />

          <Select
            label="Volunteer Work"
            value={profile.volunteer_work}
            onChange={(e) => updateProfile('volunteer_work', e.target.value)}
            options={[
              { value: '10', label: '500+ hours, founded organization, major community impact, leadership role' },
              { value: '9', label: '300+ hours, organized major events, significant community contribution' },
              { value: '8', label: '200+ hours, regular volunteer, organized events, clear community impact' },
              { value: '7', label: '100+ hours, consistent volunteer, helped organize activities, good impact' },
              { value: '6', label: '50+ hours, regular participation, helped with events, meaningful contribution' },
              { value: '5', label: '25+ hours, occasional volunteer, participated in activities, some contribution' },
              { value: '4', label: '10+ hours, minimal volunteering, mostly just showing up, limited impact' },
              { value: '3', label: '5+ hours, very occasional volunteer, very limited involvement' },
              { value: '2', label: 'Less than 5 hours, mostly one-time events, minimal commitment' },
              { value: '1', label: 'No volunteer work, no community service, no meaningful contribution' },
            ]}
          />

          <Select
            label="Research Experience"
            value={profile.research_experience}
            onChange={(e) => updateProfile('research_experience', e.target.value)}
            options={[
              { value: '10', label: 'Published research, conference presentations, peer-reviewed journals, ISEF/Regeneron' },
              { value: '9', label: 'Research submitted for publication, conference presentations, significant findings' },
              { value: '8', label: 'Substantial research project, presented findings, university collaboration' },
              { value: '7', label: 'Independent research project, data collection, analysis completed, report written' },
              { value: '6', label: 'Research assistant role, helped with data collection, learned research methods' },
              { value: '5', label: 'Classroom research project, basic data analysis, learned research basics' },
              { value: '4', label: 'Limited research experience, mostly reading papers, minimal hands-on work' },
              { value: '3', label: 'Very basic research exposure, mostly theoretical, no practical experience' },
              { value: '2', label: 'Minimal research knowledge, very limited exposure to research methods' },
              { value: '1', label: 'No research experience, no understanding of research process' },
            ]}
          />

          <Select
            label="Portfolio/Audition"
            value={profile.portfolio_audition}
            onChange={(e) => updateProfile('portfolio_audition', e.target.value)}
            options={[
              { value: '10', label: '10 - Professional-level portfolio' },
              { value: '8', label: '8 - Strong creative work' },
              { value: '6', label: '6 - Good creative projects' },
              { value: '4', label: '4 - Some creative work' },
              { value: '2', label: '2 - Limited creative portfolio' },
            ]}
          />

          <Select
            label="Essay Quality"
            value={profile.essay_quality}
            onChange={(e) => updateProfile('essay_quality', e.target.value)}
            options={[
              { value: '10', label: 'Award-winning essays, published writing, exceptional storytelling, unique voice' },
              { value: '9', label: 'Exceptional writing, compelling narratives, strong personal voice, well-crafted' },
              { value: '8', label: 'Very strong essays, clear personal story, engaging writing, good structure' },
              { value: '7', label: 'Strong essays, personal anecdotes, good writing skills, clear message' },
              { value: '6', label: 'Good essays, some personal elements, decent writing, clear communication' },
              { value: '5', label: 'Decent essays, basic personal story, adequate writing, room for improvement' },
              { value: '4', label: 'Average essays, limited personal insight, basic writing skills, generic content' },
              { value: '3', label: 'Weak essays, little personal voice, poor structure, unclear message' },
              { value: '2', label: 'Poor essays, no personal insight, significant writing issues, needs major work' },
              { value: '1', label: 'Very poor essays, no voice, major writing problems, not college-ready' },
            ]}
          />

          <Select
            label="Recommendations"
            value={profile.recommendations}
            onChange={(e) => updateProfile('recommendations', e.target.value)}
            options={[
              { value: '10', label: '10 - Glowing recommendations' },
              { value: '8', label: '8 - Very strong recommendations' },
              { value: '6', label: '6 - Good recommendations' },
              { value: '4', label: '4 - Decent recommendations' },
              { value: '2', label: '2 - Weak recommendations' },
            ]}
          />

          <Select
            label="Interview Performance"
            value={profile.interview}
            onChange={(e) => updateProfile('interview', e.target.value)}
            options={[
              { value: '10', label: '10 - Outstanding interview skills' },
              { value: '8', label: '8 - Strong interview performance' },
              { value: '6', label: '6 - Good interview abilities' },
              { value: '4', label: '4 - Decent interview skills' },
              { value: '2', label: '2 - Interview skills need work' },
            ]}
          />

          <Select
            label="Demonstrated Interest"
            value={profile.demonstrated_interest}
            onChange={(e) => updateProfile('demonstrated_interest', e.target.value)}
            options={[
              { value: '10', label: '10 - Extensive demonstrated interest' },
              { value: '8', label: '8 - Strong interest shown' },
              { value: '6', label: '6 - Good interest demonstrated' },
              { value: '4', label: '4 - Some interest shown' },
              { value: '2', label: '2 - Limited interest demonstrated' },
            ]}
          />

          <Select
            label="Legacy Status"
            value={profile.legacy_status}
            onChange={(e) => updateProfile('legacy_status', e.target.value)}
            options={[
              { value: '10', label: '10 - Strong legacy connection' },
              { value: '8', label: '8 - Good legacy connection' },
              { value: '6', label: '6 - Some legacy connection' },
              { value: '4', label: '4 - Limited legacy connection' },
              { value: '2', label: '2 - No legacy connection' },
            ]}
          />

          <Select
            label="Geographic Diversity"
            value={profile.geographic_diversity}
            onChange={(e) => updateProfile('geographic_diversity', e.target.value)}
            options={[
              { value: '10', label: '10 - Highly diverse geographic background' },
              { value: '8', label: '8 - Good geographic diversity' },
              { value: '6', label: '6 - Some geographic diversity' },
              { value: '4', label: '4 - Limited geographic diversity' },
              { value: '2', label: '2 - No geographic diversity factor' },
            ]}
          />

          <Select
            label="First-Gen/Diversity"
            value={profile.firstgen_diversity}
            onChange={(e) => updateProfile('firstgen_diversity', e.target.value)}
            options={[
              { value: '10', label: '10 - First-gen + diverse background' },
              { value: '8', label: '8 - First-gen OR diverse background' },
              { value: '6', label: '6 - Some diversity factors' },
              { value: '4', label: '4 - Limited diversity factors' },
              { value: '2', label: '2 - No diversity factors' },
            ]}
          />

          <SimpleSearchableSelect
            label="Intended Major"
            value={profile.major}
            onChange={(value) => updateProfile('major', value)}
            options={MAJORS}
            placeholder="Search for your major..."
          />

          <Select
            label="High School Reputation"
            value={profile.hs_reputation}
            onChange={(e) => updateProfile('hs_reputation', e.target.value)}
            options={[
              { value: '10', label: '10 - Elite high school' },
              { value: '8', label: '8 - Very strong high school' },
              { value: '6', label: '6 - Good high school' },
              { value: '4', label: '4 - Average high school' },
              { value: '2', label: '2 - Below average high school' },
            ]}
          />
        </div>

          <div className="mt-8 flex gap-4">
            <Button className="btn-primary text-lg px-8 py-4">
              Calculate My Chances
            </Button>
            <Button variant="ghost" className="text-lg px-8 py-4">
              Save Profile
            </Button>
          </div>
        </GlassCard>
      </Reveal>

    </div>
  )
}
