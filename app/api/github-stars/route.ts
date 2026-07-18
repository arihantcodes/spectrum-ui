import { siteConfig } from "@/config/site";

export const revalidate = 3600;

/** Star count for the repo, cached server-side for an hour so visitors never
 *  hit GitHub's unauthenticated rate limit directly. */
export async function GET() {
  try {
    const { username, repository } = siteConfig.social.github;
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repository}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "spectrum-ui",
        },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = await res.json();
    const stars =
      typeof data.stargazers_count === "number" ? data.stargazers_count : null;
    return Response.json({ stars });
  } catch {
    return Response.json({ stars: null });
  }
}
