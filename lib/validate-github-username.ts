export async function validateGithubUsername(username: string): Promise<boolean> {
  const trimmed = username.trim()
  if (!trimmed) return false

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(trimmed)}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'SpectrumUI',
        },
      }
    )
    return res.ok
  } catch {
    return false
  }
}
