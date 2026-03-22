import React from "react";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { BreadcrumbNav } from "@/components/breadcrumb-nav";

const TermsOfServicePage = () => {
  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <BreadcrumbNav 
        items={[{ label: 'Terms of Service' }]} 
        className="mb-8"
      />
      <PageHeader>
        <PageHeaderHeading>Terms of Service</PageHeaderHeading>
        <PageHeaderDescription>
          These terms of service outline the rules and regulations for the use
          of our website.
        </PageHeaderDescription>
      </PageHeader>
      <Card className="mt-6 p-4">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-[#F5F5F5]">1. Introduction</h2>
          <p className="mb-6 text-neutral-600 dark:text-[#888] leading-relaxed">
            By accessing this website, we assume you accept these terms of service in full. These terms apply to all products, including the &quot;Spectrum UI Pro&quot; templates.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-[#F5F5F5]">2. Digital Products & Access</h2>
          <p className="mb-6 text-neutral-600 dark:text-[#888] leading-relaxed">
            Our products consist of digital source code provided via GitHub repository access. Access is granted immediately after successful payment verification through Dodo Payments.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-[#F5F5F5]">3. No Refund Policy</h2>
          <div className="mb-6 p-4 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-600 dark:text-[#888] leading-relaxed">
            <p className="font-semibold text-neutral-900 dark:text-[#F5F5F5] mb-2">Notice for Digital Goods:</p>
            Due to the nature of digital products (source code access), ALL SALES ARE FINAL. Once repository access has been granted, we cannot process refunds, as the product is considered &quot;consumed&quot; or &quot;downloaded.&quot; Please review all previews and tech stacks before purchase.
          </div>

          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-[#F5F5F5]">4. License & Usage</h2>
          <p className="mb-4 text-neutral-600 dark:text-[#888] leading-relaxed">
            Each purchase grants you a non-exclusive license to use the code for:
          </p>
          <ul className="list-disc pl-5 mb-6 text-neutral-600 dark:text-[#888] space-y-2">
            <li>Unlimited personal projects.</li>
            <li>Commercial projects for clients.</li>
            <li>Modifying the code for your specific needs.</li>
          </ul>
          <p className="text-xs text-neutral-500 dark:text-[#555]">
            Note: You may NOT redistribute, resell, or sublicense the original source code or any part of it.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-8 text-neutral-900 dark:text-[#F5F5F5]">Contact</h2>
          <p className="mb-6 text-neutral-600 dark:text-[#888] leading-relaxed">
            If you have questions about these terms, reach out at <span className="font-medium text-neutral-900 dark:text-[#F5F5F5]">jainari1208@gmail.com</span>
          </p>
          <Button variant="outline">Contact Support</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfServicePage;
