const GITHUB_USERNAME_RE = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/

export async function validateGithubUsername(username: string): Promise<boolean> {
  const trimmed = username.trim()
  if (!trimmed || !GITHUB_USERNAME_RE.test(trimmed)) return false

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(trimmed)}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'SpectrumUI',
        },
        signal: AbortSignal.timeout(2500),
      }
    )
    return res.ok
  } catch {
    return false
  }
}
