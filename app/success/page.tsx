import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import { createNoIndexMetadata } from "@/lib/metadata";

export const metadata: Metadata = createNoIndexMetadata({
  title: "Spectrum UI Payment Confirmation",
  description: "Confirm that a Spectrum UI payment was processed and review the support contact.",
  path: "/success",
});

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Success Icon */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold  mb-2">Payment Successful!</h1>
          <p className="">
            Thank you for your purchase. Your payment has been processed
            successfully.
          </p>
        </div>

        {/* Footer Message */}
        <div className="text-center text-sm text-gray-500  p-4 rounded-lg border">
          <p>
            A confirmation email has been sent to your registered email address.
          </p>
          <p className="mt-1">
            Need help?{" "}
            <a
              href="mailto:jainari1208@gmail.com"
              className="text-blue-600 hover:underline"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
