'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is custom alias / slug feature free to use?',
      a: 'Yes! All registered users can define custom short aliases (e.g. shortly.to/promo-2026) for free without slashes or special characters.',
    },
    {
      q: 'How does password protection work for short links?',
      a: 'When password protection is enabled, visitors attempting to open your short link will land on a secure password verification page where they must enter the correct passcode before being redirected.',
    },
    {
      q: 'What analytics telemetry does Shortly track?',
      a: 'Shortly provides comprehensive real-time telemetry including click counts, referrer sources, device breakdowns (Desktop, Mobile, Tablet), browser usage, and date timelines.',
    },
    {
      q: 'Can I edit or deactivate a short link after creation?',
      a: 'Yes, from your Dashboard console you can edit link titles, destination URLs, custom slugs, passwords, click limits, and toggle link activation status at any time.',
    },
    {
      q: 'What happens when a link reaches its max click limit or expires?',
      a: 'Once a link reaches its maximum click count limit or passes its expiration date, it automatically deactivates and displays a clean 410 Expired page to visitors.',
    },
  ];

  return (
    <section id="faq" className="my-24 scroll-mt-28 max-w-4xl mx-auto w-full">
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8edff] text-xs font-mono font-bold text-[#0038b1]">
          <HelpCircle className="w-3.5 h-3.5" /> FREQUENTLY ASKED QUESTIONS
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#091b38]">
          Got Questions? We Have Answers.
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-[#c4c5d6]/40 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full p-6 text-left font-heading font-bold text-base md:text-lg text-[#091b38] flex items-center justify-between gap-4 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#0038b1] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-xs md:text-sm text-[#5b5e68] leading-relaxed border-t border-[#c4c5d6]/20 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
