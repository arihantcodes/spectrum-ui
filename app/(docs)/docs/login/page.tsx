import React from 'react';
import { PageTemplate } from '@/app/(docs)/docs/components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import LoginPage from './login-demo';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

export const metadata: Metadata = baseMetadata({
  title: 'Login Card',
  description:
    'A login form card for authentication pages and SaaS apps. A free React and Next.js component built with Framer Motion and Tailwind CSS.',
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
      description="A login form card for authentication pages and SaaS apps."
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
      <PageTemplate
        title="Login Card"
        description="A login form card for authentication pages and SaaS apps."
      >
      <PreviewCodeCard
        path="app/(docs)/docs/login/login-demo.tsx"
        cli="@spectrumui/login-card"
      
        installScript="npm i lucide-react framer-motion"
        installCodePath="app/(docs)/docs/login/login-demo.tsx"
      >
        <LoginPage />
      </PreviewCodeCard>

    </PageTemplate>
    </SEOWrapper>
  );
};

export default Loginpage;
