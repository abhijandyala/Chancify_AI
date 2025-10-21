import ROXNav from '@/components/layout/ROXNav'
import ROXHero from '@/components/ui/ROXHero'
import ROXClientMarquee from '@/components/ui/ROXClientMarquee'
import ROXAgenticWorkflows from '@/components/ui/ROXAgenticWorkflows'
import ROXScrollingStats from '@/components/ui/ROXScrollingStats'
import ROXTestimonial from '@/components/ui/ROXTestimonial'
import ROXEnterprise from '@/components/ui/ROXEnterprise'
import ROXPricingCTA from '@/components/ui/ROXPricingCTA'
import ROXMegaFooter from '@/components/ui/ROXMegaFooter'

export default function ROXLandingPage() {
  return (
    <main className="bg-background text-foreground rox-bg-pattern">
      <ROXNav />
      <ROXHero />
      <ROXClientMarquee />
      <ROXAgenticWorkflows />
      <ROXScrollingStats />
      <ROXTestimonial />
      <ROXEnterprise />
      <ROXPricingCTA />
      <ROXMegaFooter />
    </main>
  )
}