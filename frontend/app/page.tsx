import ROXNav from '@/components/layout/ROXNav'
import ROXHero from '@/components/ui/ROXHero'
import ROXClientMarquee from '@/components/ui/ROXClientMarquee'
import ROXAgenticWorkflows from '@/components/ui/ROXAgenticWorkflows'
import ROXLogoMarquee from '@/components/ui/ROXLogoMarquee'
import ROXFloatingElements from '@/components/ui/ROXFloatingElements'
import ROXTestimonial from '@/components/ui/ROXTestimonial'
import ROXEnterprise from '@/components/ui/ROXEnterprise'
import ROXMegaFooter from '@/components/ui/ROXMegaFooter'
import SophisticatedBackground from '@/components/ui/SophisticatedBackground'
import AuthRedirect from '@/components/ui/AuthRedirect'

export default function ROXLandingPage() {
  return (
    <main className="bg-background text-foreground rox-bg-pattern relative">
      <AuthRedirect />
      <SophisticatedBackground />
      <ROXNav />
      <ROXHero />
      <ROXClientMarquee />
      <ROXAgenticWorkflows />
      <ROXLogoMarquee />
      <ROXFloatingElements />
      <ROXTestimonial />
      <ROXEnterprise />
      <ROXMegaFooter />
    </main>
  )
}