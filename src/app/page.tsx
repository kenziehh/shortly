import HeroSection from '@/components/home/HeroSection';
import MetricsBanner from '@/components/home/MetricsBanner';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import DashboardPreviewSection from '@/components/home/DashboardPreviewSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PricingSection from '@/components/home/PricingSection';
import FaqSection from '@/components/home/FaqSection';
import CtaSection from '@/components/home/CtaSection';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is custom alias / slug feature free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! All registered users can define custom short aliases (e.g. shortly.to/promo-2026) for free without slashes or special characters.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does password protection work for short links?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When password protection is enabled, visitors attempting to open your short link will land on a secure password verification page where they must enter the correct passcode before being redirected.',
      },
    },
    {
      '@type': 'Question',
      name: 'What analytics telemetry does Shortly track?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shortly provides comprehensive real-time telemetry including click counts, referrer sources, device breakdowns (Desktop, Mobile, Tablet), browser usage, and date timelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I edit or deactivate a short link after creation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, from your Dashboard console you can edit link titles, destination URLs, custom slugs, passwords, click limits, and toggle link activation status at any time.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens when a link reaches its max click limit or expires?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Once a link reaches its maximum click count limit or passes its expiration date, it automatically deactivates and displays a clean 410 Expired page to visitors.',
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="relative overflow-x-hidden min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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

