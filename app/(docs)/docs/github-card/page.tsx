import GitHubProfileCard from '@/components/spectrumui/github-profile-card';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';

export default function GitHubProfileCardPage() {
  return (
    <PreviewCodeCard
      path="app/(docs)/docs/github-card/page.tsx"
      cli="@spectrumui/github-profile-card"
      installCodePath="components/spectrumui/github-profile-card.tsx"
    >
      <GitHubProfileCard />
    </PreviewCodeCard>
  );
}
