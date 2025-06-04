import React from "react";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/PageHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const TermsOfServicePage = () => {
  return (
    <div className="container mx-auto p-6">
      <PageHeader>
        <PageHeaderHeading>Terms of Service</PageHeaderHeading>
        <PageHeaderDescription>
          These terms of service outline the rules and regulations for the use
          of our website.
        </PageHeaderDescription>
      </PageHeader>
      <Card className="mt-6 p-4">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            By accessing this website we assume you accept these terms of
            service in full. Do not continue to use the website if you do not
            accept all of the terms of service stated on this page.
          </p>
          <h2 className="text-xl font-semibold mb-4">License</h2>
          <p className="mb-4">
            Unless otherwise stated, we and/or our licensors own the
            intellectual property rights for all material on the website. All
            intellectual property rights are reserved. You may view and/or print
            pages from the website for your own personal use subject to
            restrictions set in these terms of service.
          </p>
          <h2 className="text-xl font-semibold mb-4">User Comments</h2>
          <p className="mb-4">
            Certain parts of this website offer the opportunity for users to
            post and exchange opinions, information, material and data
            ('Comments') in areas of the website. We do not screen, edit,
            publish or review Comments prior to their appearance on the website
            and Comments do not reflect our views or opinions.
          </p>
          <h2 className="text-xl font-semibold mb-4">
            Hyperlinking to our Content
          </h2>
          <p className="mb-4">
            The following organizations may link to our website without prior
            written approval: Government agencies, Search engines, News
            organizations, Online directory distributors, and Systemwide
            Accredited Businesses.
          </p>
          <h2 className="text-xl font-semibold mb-4">Content Liability</h2>
          <p className="mb-4">
            We shall have no responsibility or liability for any content
            appearing on your website. You agree to indemnify and defend us
            against all claims arising out of or based upon your website.
          </p>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have questions or comments about these terms, you may email
            us
            <span className="underline mx-2">jainari1208@gmail.com</span>
            or by post to:
          </p>
          <Button variant="outline">Contact Support</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfServicePage;
