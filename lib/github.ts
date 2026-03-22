// Use a personal access token with appropriate repo permissions
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function grantRepoAccess(githubRepo: string, githubUsername: string) {
  if (!GITHUB_TOKEN) {
    console.error('GITHUB_TOKEN is missing. Cannot grant access.');
    throw new Error('GITHUB_TOKEN is missing in environment variables');
  }

  const url = `https://api.github.com/repos/${githubRepo}/collaborators/${githubUsername}`;
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: JSON.stringify({
        permission: 'pull'
      })
    });

    // 201 Created or 204 No Content are success statuses
    if (!response.ok && response.status !== 204 && response.status !== 201) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GitHub API error granting access:', errorData);
      throw new Error(`Failed to grant GitHub access: ${response.statusText}`);
    }

    console.log(`Successfully granted ${githubUsername} read access to ${githubRepo}`);
    return true;
  } catch (error) {
    console.error('Error in grantRepoAccess:', error);
    throw error;
  }
}
