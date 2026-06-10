import type { Metadata } from 'next'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'

export const metadata: Metadata = {
  title: 'Terms of Service — Spectrum UI',
  description: 'Read the Spectrum UI Terms of Service covering usage, licensing, payments, and refund policy.',
}

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: `By accessing or using Spectrum UI (spectrumhq.in), you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform. These terms apply to all visitors, users, and anyone who accesses the service — including both the free component library and Spectrum UI Pro paid templates.`,
  },
  {
    id: 'free-library',
    title: '2. Free Component Library',
    content: `The Spectrum UI component library is provided free of charge. Components are open-source and available under the MIT License. You may use, modify, and distribute components freely in personal and commercial projects. Attribution is appreciated but not required.`,
  },
  {
    id: 'pro-templates',
    title: '3. Spectrum UI Pro — Paid Templates',
    content: `Spectrum UI Pro templates are premium digital products sold as source code. Upon successful payment, you are granted a perpetual, non-exclusive, non-transferable license to use the purchased template source code for an unlimited number of personal and commercial projects.`,
  },
  {
    id: 'license',
    title: '4. License Scope & Restrictions',
    items: {
      allowed: [
        'Use in unlimited personal projects',
        'Use in unlimited client or commercial projects',
        'Modify and adapt the source code freely',
        'Use as a starting point for SaaS products or internal tools',
      ],
      notAllowed: [
        'Resell, redistribute, or sublicense the original or modified source code as a standalone product',
        'Share repository access credentials with third parties',
        'Upload the source code to public repositories or template marketplaces',
        'Claim ownership or authorship of the original template design',
      ],
    },
  },
  {
    id: 'payment',
    title: '5. Payments & Access',
    content: `All payments are processed securely via Dodo Payments. GitHub repository access is granted automatically after payment verification — typically within a few minutes. If access is not granted within 24 hours, contact support at jainari1208@gmail.com with your payment confirmation.`,
  },
  {
    id: 'refunds',
    title: '6. Refund Policy',
    highlight: true,
    content: `All sales are final. Because our products are digital goods (source code), we do not offer refunds once repository access has been granted. The product is considered fully delivered upon access being provided. We encourage you to review all component previews, tech stacks, and demo sites thoroughly before purchasing. If you experience a technical issue preventing access, contact support and we will resolve it promptly.`,
  },
  {
    id: 'accounts',
    title: '7. User Accounts',
    content: `You are responsible for maintaining the security of your account. We collect only the information necessary to provide the service (email, name, GitHub username). We do not sell your data to third parties. By signing in, you agree to our use of this data to manage your purchases and grant repository access.`,
  },
  {
    id: 'ip',
    title: '8. Intellectual Property',
    content: `All template designs, UI patterns, and associated assets remain the intellectual property of Spectrum UI. The license granted in Section 4 does not transfer ownership. The Spectrum UI name, logo, and brand assets may not be used without written permission.`,
  },
  {
    id: 'disclaimer',
    title: '9. Disclaimer of Warranties',
    content: `Spectrum UI is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, error-free, or that templates will be compatible with every framework version. Templates are tested against the versions listed in their documentation.`,
  },
  {
    id: 'changes',
    title: '10. Changes to Terms',
    content: `We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms. For significant changes, we will notify users via email or an in-app notice.`,
  },
]

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <BreadcrumbNav
        items={[{ label: 'Terms of Service' }]}
        className="mb-8"
      />

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-[#F5F5F5] mb-3">
          Terms of Service
        </h1>
        <p className="text-neutral-500 dark:text-[#666] leading-relaxed">
          Please read these terms carefully before using Spectrum UI or purchasing any Pro templates.
        </p>
        <p className="text-xs text-neutral-400 dark:text-[#555] mt-3">
          Last updated: June 2025
        </p>
      </div>

      {/* Sections */}
      <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-900">
        {sections.map((section) => (
          <div key={section.id} id={section.id} className="py-7 first:pt-0">
            <h2 className="text-base font-semibold text-neutral-900 dark:text-[#F5F5F5] mb-3">
              {section.title}
            </h2>

            {/* Standard paragraph */}
            {'content' in section && !('items' in section) && (
              <p
                className={`text-sm leading-relaxed ${
                  section.highlight
                    ? 'text-neutral-700 dark:text-[#AAA]'
                    : 'text-neutral-500 dark:text-[#777]'
                }`}
              >
                {section.content}
              </p>
            )}

            {/* Highlighted block (refunds) */}
            {section.highlight && 'content' in section && (
              <div className="mt-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2">
                  ⚠ Important — No Refunds on Digital Goods
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-300/80 leading-relaxed">
                  {section.content}
                </p>
              </div>
            )}

            {/* License allowed / not allowed lists */}
            {'items' in section && section.items && (
              <div className="grid sm:grid-cols-2 gap-4 mt-1">
                <div>
                  <p className="text-xs font-semibold text-green-600 dark:text-green-500 uppercase tracking-wider mb-2.5">
                    ✓ Allowed
                  </p>
                  <ul className="flex flex-col gap-2">
                    {section.items.allowed.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-neutral-500 dark:text-[#777]">
                        <span className="mt-0.5 shrink-0 text-green-500">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-wider mb-2.5">
                    ✗ Not Allowed
                  </p>
                  <ul className="flex flex-col gap-2">
                    {section.items.notAllowed.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-neutral-500 dark:text-[#777]">
                        <span className="mt-0.5 shrink-0 text-red-400">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact footer */}
      <div className="mt-4 pt-8 border-t border-neutral-100 dark:border-neutral-900">
        <h2 className="text-base font-semibold text-neutral-900 dark:text-[#F5F5F5] mb-2">
          Contact
        </h2>
        <p className="text-sm text-neutral-500 dark:text-[#666]">
          Questions about these terms?{' '}
          <a
            href="mailto:jainari1208@gmail.com"
            className="text-neutral-900 dark:text-[#F5F5F5] underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            jainari1208@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}
