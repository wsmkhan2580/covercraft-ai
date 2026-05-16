import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import HowItWorksSection from '../components/sections/HowItWorksSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTASection from '../components/sections/CTASection'

export default function LandingPage({ onGetStarted }) {
  return (
    <main>
      <HeroSection onGetStarted={onGetStarted} />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection onGetStarted={onGetStarted} />
    </main>
  )
}
