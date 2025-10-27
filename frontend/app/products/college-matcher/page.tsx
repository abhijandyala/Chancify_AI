import ROXPageTemplate from '@/components/ui/ROXPageTemplate'
import { Search, Heart, Star, MapPin } from 'lucide-react'

export default function CollegeMatcherPage() {
  return (
    <ROXPageTemplate
      title="College Matcher"
      subtitle="Products"
      description="Find your perfect college matches based on your academic profile, preferences, and goals using our intelligent matching algorithm."
      stats={[
        { value: "2,000+", label: "Colleges Analyzed" },
        { value: "15+", label: "Matching Criteria" },
        { value: "90%", label: "Match Accuracy" },
        { value: "Free", label: "Always Free" }
      ]}
      features={[
        {
          title: "Smart Matching",
          description: "Our algorithm considers academic fit, location preferences, size, and culture to find your ideal matches.",
          icon: <Search className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Personalized Recommendations",
          description: "Get Safety, Target, and Reach school recommendations tailored to your profile.",
          icon: <Star className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Location Preferences",
          description: "Filter colleges by region, state, or distance from home to find your perfect location.",
          icon: <MapPin className="w-6 h-6 text-yellow-400" />
        },
        {
          title: "Wishlist Management",
          description: "Save your favorite colleges and track your application progress.",
          icon: <Heart className="w-6 h-6 text-yellow-400" />
        }
      ]}
    />
  )
}
