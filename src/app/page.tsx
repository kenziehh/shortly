import HeroSection from '@/components/home/HeroSection';
import MetricsBanner from '@/components/home/MetricsBanner';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import DashboardPreviewSection from '@/components/home/DashboardPreviewSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PricingSection from '@/components/home/PricingSection';
import FaqSection from '@/components/home/FaqSection';
import CtaSection from '@/components/home/CtaSection';

export default function Home() {
  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* Tonal Background Gradient */}
      <div className="hero-bg"></div>

      <main className="pt-[140px] pb-20 px-6 lg:px-8 max-w-[1400px] mx-auto w-full space-y-24">
        {/* Hero & Shortener Form Widget */}
        <HeroSection />

        {/* Live Metrics Banner */}
        <MetricsBanner />

        {/* 3-Step Visual Workflow */}
        <HowItWorksSection />

        {/* Dashboard Preview Window */}
        <DashboardPreviewSection />

        {/* Features Bento Grid */}
        <FeaturesSection />

        {/* Pricing Tier Cards */}
        <PricingSection />

        {/* Interactive FAQ Accordion */}
        <FaqSection />

        {/* Final CTA Banner */}
        <CtaSection />
      </main>
    </div>
  );
}
