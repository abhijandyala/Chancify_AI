import ROXNav from '@/components/layout/ROXNav'
import ROXHero from '@/components/ui/ROXHero'
import ROXClientMarquee from '@/components/ui/ROXClientMarquee'
import ROXAgenticWorkflows from '@/components/ui/ROXAgenticWorkflows'
import ROXLogoMarquee from '@/components/ui/ROXLogoMarquee'
import ROXHoverButtons from '@/components/ui/ROXHoverButtons'
import ROXFloatingElements from '@/components/ui/ROXFloatingElements'
import ROXTestimonial from '@/components/ui/ROXTestimonial'
import ROXEnterprise from '@/components/ui/ROXEnterprise'
import ROXMegaFooter from '@/components/ui/ROXMegaFooter'

export default function ROXLandingPage() {
  return (
    <main className="bg-background text-foreground rox-bg-pattern">
      <ROXNav />
      <ROXHero />
      <ROXClientMarquee />
      <ROXAgenticWorkflows />
      <ROXLogoMarquee />
      <ROXHoverButtons />
      <ROXFloatingElements />
      <ROXTestimonial />
      <ROXEnterprise />
      <ROXMegaFooter />
    </main>
  )
}