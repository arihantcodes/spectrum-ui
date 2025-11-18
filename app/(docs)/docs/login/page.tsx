import React from 'react';
import { PageSubTitle, PageTemplate } from '@/app/(docs)/docs/components/page-template';
import { Steppers } from '@/components/ui/steppers';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import LoginPage from './login-demo';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

export const metadata: Metadata = baseMetadata({
  title: 'Login Card',
  description:
    'Beautiful login card component for React and Next.js. Simple and elegant login form with modern design. Perfect for authentication pages, SaaS applications, and web apps. Built with Framer Motion and Tailwind CSS.',
  keywords: [
    "login card",
    "login form",
    "React login",
    "Next.js login",
    "authentication form",
    "sign in form",
    "login UI",
    "auth component",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/login",
});

const Loginpage = () => {
  return (
    <SEOWrapper
      componentName="Login Card"
      description="Beautiful login card component for React and Next.js. Simple and elegant login form with modern design. Perfect for authentication pages, SaaS applications, and web apps. Built with Framer Motion and Tailwind CSS."
      url="https://ui.spectrumhq.in/docs/login"
      keywords={[
        "login card",
        "login form",
        "React login",
        "Next.js login",
        "authentication form",
        "sign in form",
        "login UI",
        "auth component",
      ]}
    >
      <PageTemplate title="Login Card">
      <PreviewCodeCard
        path="app/(docs)/docs/login/login-demo.tsx"
        cli="@spectrumui/login-card"
      >
        <LoginPage />
      </PreviewCodeCard>
      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/login/login-demo.tsx"
        withEnd
        installScript="npm i lucide-react framer-motion"
      />
    </PageTemplate>
    </SEOWrapper>
  );
};

export default Loginpage;
