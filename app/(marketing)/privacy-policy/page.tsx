import React from "react";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/PageHeading";
import { Card, CardContent } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto p-6">
      <PageHeader>
        <PageHeaderHeading>Privacy Policy</PageHeaderHeading>
        <PageHeaderDescription>
          Your privacy is important to us. This privacy policy explains what
          personal data we collect and how we use it.
        </PageHeaderDescription>
      </PageHeader>
      <Card className="mt-6 p-4">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            We are committed to protecting your personal information and your
            right to privacy. If you have any questions or concerns about this
            policy, or our practices with regards to your personal information,
            please contact us.
          </p>
          <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">
            We collect personal information that you voluntarily provide to us
            when you register on the website, express an interest in obtaining
            information about us or our products and services, when you
            participate in activities on the website or otherwise when you
            contact us.
          </p>
          <h2 className="text-xl font-semibold mb-4">
            How We Use Your Information
          </h2>
          <p className="mb-4">
            We use personal information collected via our website for a variety
            of business purposes described below. We process your personal
            information for these purposes in reliance on our legitimate
            business interests, in order to enter into or perform a contract
            with you, with your consent, and/or for compliance with our legal
            obligations.
          </p>
          <h2 className="text-xl font-semibold mb-4">
            Sharing Your Information
          </h2>
          <p className="mb-4">
            We only share information with your consent, to comply with laws, to
            provide you with services, to protect your rights, or to fulfill
            business obligations.
          </p>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have questions or comments about this policy, you may email
            us at jainari1208@gmail.com
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
