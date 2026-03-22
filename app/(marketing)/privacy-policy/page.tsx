import React from "react";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { BreadcrumbNav } from "@/components/breadcrumb-nav";

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <BreadcrumbNav 
        items={[{ label: 'Privacy Policy' }]} 
        className="mb-8"
      />
      <PageHeader>
        <PageHeaderHeading>Privacy Policy</PageHeaderHeading>
        <PageHeaderDescription>
          Your privacy is important to us. This privacy policy explains what
          personal data we collect and how we use it.
        </PageHeaderDescription>
      </PageHeader>
      <Card className="mt-6 p-4">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-[#F5F5F5]">Introduction</h2>
          <p className="mb-6 text-neutral-600 dark:text-[#888] leading-relaxed">
            We are committed to protecting your personal information and your right to privacy. This policy applies to all information collected through our website and services, including Dodo Payments and Supabase integrations.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-[#F5F5F5]">Information We Collect</h2>
          <p className="mb-4 text-neutral-600 dark:text-[#888] leading-relaxed">
            We collect personal information that you voluntarily provide to us, including:
          </p>
          <ul className="list-disc pl-5 mb-6 text-neutral-600 dark:text-[#888] space-y-2">
            <li><strong>Personal Data</strong>: Name, email address, and GitHub username.</li>
            <li><strong>Payment Data</strong>: We use <strong>Dodo Payments</strong> as our payment processor. They collect your payment information (like credit card details) securely. We do not store your full payment details on our servers.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-[#F5F5F5]">GDPR & EU User Rights</h2>
          <p className="mb-4 text-neutral-600 dark:text-[#888] leading-relaxed">
            If you are located in the European Economic Area (EEA), you have certain rights under the General Data Protection Regulation (GDPR), including:
          </p>
          <ul className="list-disc pl-5 mb-6 text-neutral-600 dark:text-[#888] space-y-2">
            <li>The right to access, update, or delete your information.</li>
            <li>The right to object to or restrict processing of your data.</li>
            <li>The right to data portability.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-[#F5F5F5]">Third-Party Processors</h2>
          <p className="mb-6 text-neutral-600 dark:text-[#888] leading-relaxed">
            We share minimal necessary data with:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Supabase</strong>: Database and Authentication.</li>
              <li><strong>Dodo Payments</strong>: Secure payment processing.</li>
              <li><strong>Resend</strong>: Transactional emails.</li>
              <li><strong>GitHub</strong>: Granting repository access.</li>
            </ul>
          </p>

          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-[#F5F5F5]">Contact Us</h2>
          <p className="mb-6 text-neutral-600 dark:text-[#888] leading-relaxed">
            For any privacy-related requests, reach out at <span className="text-neutral-900 dark:text-neutral-100 font-medium">jainari1208@gmail.com</span>
          </p>
          <Button variant="outline">
            <a href="https://x.com/arihantcodes" target="_blank">
              Contact Support
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage;
