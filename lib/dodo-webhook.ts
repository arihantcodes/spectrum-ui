import { supabaseAdmin as supabase } from "@/lib/supabase-admin";
import { grantRepoAccess } from "@/lib/github";
import { sendPurchaseEmail } from "@/lib/resend";

export async function handlePaymentSucceeded(payload: any) {
  const { payment_id, total_amount, currency, metadata } = payload.data;

  if (
    !metadata ||
    !metadata.templateSlug ||
    !metadata.githubUsername ||
    !metadata.userEmail
  ) {
    console.error(`[Webhook] ERROR: Malformed metadata:`, metadata);
    throw new Error("Malformed metadata in webhook payload");
  }

  const { templateSlug, githubUsername, userEmail } = metadata as {
    templateSlug: string;
    githubUsername: string;
    userEmail: string;
  };

  const { data: template, error: templateError } = await supabase
    .from("templates")
    .select("name, github_repo")
    .eq("slug", templateSlug)
    .single();

  if (templateError || !template) {
    console.error(`[Webhook] ERROR: Template not found: ${templateSlug}`);
    throw new Error(`Template not found: ${templateSlug}`);
  }

  const { data: existingOrder } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_id", payment_id)
    .single();

  let order = existingOrder;

  if (!order) {
    console.log(
      `[Webhook] New payment: ${userEmail} → ${templateSlug} (${payment_id})`,
    );

    const { data: newOrder, error: insertError } = await supabase
      .from("orders")
      .insert({
        email: userEmail,
        github_username: githubUsername,
        template_slug: templateSlug,
        payment_id: payment_id,
        amount: total_amount,
        currency: currency ?? "USD",
        status: "active",
        github_access_granted: false,
        email_sent: false,
      })
      .select()
      .single();

    if (insertError) {
      console.error(
        `[Webhook] ERROR: Order insert failed: ${insertError.message}`,
      );
      throw insertError;
    }

    order = newOrder;
  } else {
    console.log(`[Webhook] Existing order found for ${payment_id}. Resuming...`);
  }

  if (!order.github_access_granted) {
    try {
      await grantRepoAccess(template.github_repo, githubUsername);
      await supabase
        .from("orders")
        .update({ github_access_granted: true })
        .eq("payment_id", payment_id);
      console.log(`[Webhook] GitHub access granted: ${githubUsername}`);
    } catch (err) {
      console.error(`[Webhook] ERROR: GitHub access failed:`, err);
      throw err;
    }
  }

  if (!order.email_sent) {
    try {
      await sendPurchaseEmail({
        email: userEmail,
        githubUsername: githubUsername,
        templateName: template.name,
        githubRepo: template.github_repo,
      });
      await supabase
        .from("orders")
        .update({ email_sent: true })
        .eq("payment_id", payment_id);
      console.log(`[Webhook] Welcome email sent: ${userEmail}`);
    } catch (err) {
      console.error(`[Webhook] ERROR: Email failed:`, err);
      throw err;
    }
  }
}

