const BOT_TOKEN = process.env.SLACK_BOT_TOKEN!
const CHANNEL_ID = process.env.SLACK_CHANNEL_ID!

/**
 * Send a message to the configured Slack channel via Bot Token.
 */
export async function notifySlack(message: string) {
  try {
    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: CHANNEL_ID,
        text: message,
      }),
    })

    const data = await response.json()

    if (!data.ok) {
      console.error('[Slack] API error:', data.error)
    }
  } catch (error) {
    console.error('[Slack] Failed to send notification:', error)
  }
}

type SignupPayload = {
  name: string | null | undefined
  email: string
  githubUsername: string | null | undefined
  avatarUrl: string | null | undefined
  provider: string | null | undefined
  convertedFrom: string | null | undefined
}

/**
 * Send a rich Slack notification when a new user signs up.
 * Includes: name, email, GitHub username, avatar, auth provider, and timestamp.
 */
export async function notifyNewSignup({ name, email, githubUsername, avatarUrl, provider, convertedFrom }: SignupPayload) {
  try {
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    const githubLink = githubUsername ? `<https://github.com/${githubUsername}|${githubUsername}>` : 'N/A'
    const providerLabel = provider ?? 'Unknown'

    const blocks: any[] = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🎉 New User Signup!',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*👤 Name*\n${name ?? 'N/A'}`,
          },
          {
            type: 'mrkdwn',
            text: `*📧 Email*\n${email}`,
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*🐙 GitHub*\n${githubLink}`,
          },
          {
            type: 'mrkdwn',
            text: `*🔑 Auth Provider*\n${providerLabel}`,
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*🕒 Signed Up At*\n${timestamp}`,
          },
          {
            type: 'mrkdwn',
            text: `*📍 Converted From*\n${convertedFrom || 'Direct / Homepage'}`,
          },
        ],
      },
    ]

    // Add avatar thumbnail if available
    if (avatarUrl) {
      blocks.push({
        type: 'context',
        elements: [
          {
            type: 'image',
            image_url: avatarUrl,
            alt_text: name ?? 'User avatar',
          },
          {
            type: 'mrkdwn',
            text: `*${name ?? email}* just joined Spectrum UI`,
          },
        ],
      })
    }

    blocks.push({
      type: 'divider',
    })

    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: CHANNEL_ID,
        text: `🎉 New User Signup — ${name ?? 'Unknown'} (${email}) | GitHub: ${githubUsername ?? 'N/A'} | via ${providerLabel}`,
        blocks,
      }),
    })

    const data = await response.json()

    if (!data.ok) {
      console.error('[Slack] New signup notification error:', data.error)
    }
  } catch (error) {
    console.error('[Slack] Failed to send new signup notification:', error)
  }
}

type SponsorSubmissionPayload = {
  companyName: string
  website: string
  contactName: string
  contactEmail: string
  sponsorTier: string
  message?: string | null
}

/**
 * Send a rich Slack notification when a new sponsor submits the application.
 */
export async function notifyNewSponsorSubmission({
  companyName,
  website,
  contactName,
  contactEmail,
  sponsorTier,
  message,
}: SponsorSubmissionPayload) {
  try {
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    const websiteUrl = website.startsWith('http') ? website : `https://${website}`

    const blocks: any[] = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '💼 New Sponsor Application!',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*🏢 Company Name*\n${companyName}`,
          },
          {
            type: 'mrkdwn',
            text: `*🌐 Website*\n<${websiteUrl}|${websiteUrl}>`,
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*👤 Contact Person*\n${contactName}`,
          },
          {
            type: 'mrkdwn',
            text: `*📧 Email*\n${contactEmail}`,
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*🏆 Selected Tier*\n*${sponsorTier}*`,
          },
          {
            type: 'mrkdwn',
            text: `*🕒 Timestamp*\n${timestamp}`,
          },
        ],
      },
    ]

    if (message) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*💬 Message*\n${message}`,
        },
      })
    }

    blocks.push({
      type: 'divider',
    })

    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: CHANNEL_ID,
        text: `💼 New Sponsor Application from ${companyName} (${sponsorTier})`,
        blocks,
      }),
    })

    const data = await response.json()

    if (!data.ok) {
      console.error('[Slack] Sponsor notification error:', data.error)
    }
  } catch (error) {
    console.error('[Slack] Failed to send sponsor notification:', error)
  }
}


