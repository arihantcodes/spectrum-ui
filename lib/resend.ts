import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendWelcomeNewsletterEmail(email: string, unsubscribeToken: string) {
  try {
    const unsubscribeUrl = `https://ui.spectrumhq.in/unsubscribe?token=${unsubscribeToken}&email=${encodeURIComponent(email)}`;

    const { data, error } = await resend.emails.send({
      from: 'Spectrum UI <noreply@spectrumhq.in>',
      to: [email],
      subject: 'Welcome to Spectrum UI — You\'re in!',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
          <div style="margin-bottom: 32px;">
            <strong style="font-size: 18px;">Spectrum UI</strong>
          </div>

          <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 16px;">
            Thanks for subscribing!
          </h1>

          <p style="font-size: 15px; line-height: 1.6; color: #444;">
            You'll be the first to know about new components, templates, and updates from Spectrum UI.
          </p>

          <p style="font-size: 15px; line-height: 1.6; color: #444;">
            Here's what you can explore right now:
          </p>

          <ul style="font-size: 15px; line-height: 1.8; color: #444; padding-left: 20px;">
            <li><a href="https://ui.spectrumhq.in/docs" style="color: #000; font-weight: 500;">Browse 250+ free components</a></li>
            <li><a href="https://ui.spectrumhq.in/pro" style="color: #000; font-weight: 500;">Check out Pro templates</a></li>
            <li><a href="https://ui.spectrumhq.in/blog" style="color: #000; font-weight: 500;">Read our engineering blog</a></li>
          </ul>

          <p style="font-size: 15px; line-height: 1.6; color: #444; margin-top: 24px;">
            Welcome aboard,<br/>
            Arihant — Spectrum UI
          </p>

          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />

          <p style="font-size: 12px; color: #999; line-height: 1.5;">
            You received this because you subscribed at ui.spectrumhq.in.<br/>
            <a href="${unsubscribeUrl}" style="color: #999;">Unsubscribe</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Error in sendWelcomeNewsletterEmail:', err);
    throw err;
  }
}

interface PurchaseEmailProps {
  email: string;
  githubUsername: string;
  templateName: string;
  githubRepo: string;
}

export async function sendPurchaseEmail({
  email,
  githubUsername,
  templateName,
  githubRepo,
}: PurchaseEmailProps) {
  try {
    const escapedTemplate = escapeHtml(templateName);
    const escapedGithub = escapeHtml(githubUsername);

    const { data, error } = await resend.emails.send({
      from: 'Spectrum UI <noreply@spectrumhq.in>', // Use your verified domain here
      to: [email],
      subject: `Welcome to ${escapedTemplate} - Access Granted!`,
      html: `
        <div>
          <h1>Thank you for purchasing ${escapedTemplate}!</h1>
          <p>We've successfully processed your payment.</p>
          <p>We've sent an invitation to your GitHub account <strong>@${escapedGithub}</strong> to access the private repository:</p>
          <p><a href="https://github.com/${githubRepo}">https://github.com/${githubRepo}</a></p>
          <p><strong>Next steps:</strong></p>
          <ol>
            <li>Check your email for the GitHub repository invitation.</li>
            <li>Accept the invitation.</li>
            <li>Clone the repository and start building!</li>
          </ol>
          <p>If you have any questions or issues, please reply to this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send purchase email via Resend:', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Error in sendPurchaseEmail:', err);
    throw err;
  }
}
