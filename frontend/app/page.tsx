import ROXNav from '@/components/layout/ROXNav'
import ROXHero from '@/components/ui/ROXHero'
import ROXClientMarquee from '@/components/ui/ROXClientMarquee'
import ROXAgenticWorkflows from '@/components/ui/ROXAgenticWorkflows'
import ROXLogoMarquee from '@/components/ui/ROXLogoMarquee'
import ROXDataPipeline3D from '@/components/ui/ROXDataPipeline3D'
import ROXTestimonial from '@/components/ui/ROXTestimonial'
import ROXEnterprise from '@/components/ui/ROXEnterprise'
import ROXMegaFooter from '@/components/ui/ROXMegaFooter'
import SophisticatedBackground from '@/components/ui/SophisticatedBackground'

export default function ROXLandingPage() {
  return (
    <main className="bg-background text-foreground rox-bg-pattern relative">
      <SophisticatedBackground />
      <ROXNav />
      <ROXHero />
      <ROXClientMarquee />
      <ROXAgenticWorkflows />
      <ROXLogoMarquee />
      <ROXDataPipeline3D />
      <ROXTestimonial />
      <ROXEnterprise />
      <ROXMegaFooter />
    </main>
  )
}