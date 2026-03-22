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
