import { expect, test, describe, spyOn } from "bun:test";
import { POST } from "../app/api/webhook/route";
import { supabaseAdmin as supabase } from "../lib/supabase-admin";
import * as github from "../lib/github";
import * as resend from "../lib/resend";

// Mock external dependencies
spyOn(github, "grantRepoAccess").mockImplementation(async () => true);
spyOn(resend, "sendPurchaseEmail").mockImplementation(async () => ({ id: "mock-email-id" }));

import { handlePaymentSucceeded } from "../app/api/webhook/route";

describe("Webhook Resilience", () => {
  const paymentId = `test_pay_${Date.now()}`;
  const mockPayload = {
    data: {
      payment_id: paymentId,
      total_amount: 5900,
      currency: "USD",
      metadata: {
        templateSlug: "nova-saas",
        githubUsername: "test-user",
        userEmail: "test@example.com",
      },
    },
  };

  test("should handle a new payment successfully", async () => {
    console.log("Testing new payment...");
    await handlePaymentSucceeded(mockPayload);

    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("payment_id", paymentId)
      .single();

    expect(order).toBeDefined();
    expect(order?.payment_id).toBe(paymentId);
  });

  test("should be idempotent (handle duplicate webhook)", async () => {
    console.log("Testing duplicate payment...");
    // Call again with same payload
    await handlePaymentSucceeded(mockPayload);

    const { data: count } = await supabase
      .from("orders")
      .select("*", { count: "exact" })
      .eq("payment_id", paymentId);

    expect(count?.length).toBe(1); // Still only one row
  });
});
