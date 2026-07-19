'use client';

import { useMemo, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Linkedin, Mail, Search, Loader2, Share2, Globe } from 'lucide-react';
import { Icons } from '@/components/icon';

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
  email?: string;
  twitter_username?: string;
  blog?: string;
}

interface ContributionDay {
  date: string;
  level: number;
  count: number;
}

const contributionColorClasses = [
  'bg-[#ebedf0] dark:bg-[#212121]',
  'bg-[#9be9a8] dark:bg-[#404040]',
  'bg-[#40c463] dark:bg-[#606060]',
  'bg-[#30a14e] dark:bg-[#808080]',
  'bg-[#216e39] dark:bg-[#c6c6c6]',
];

function generateContributions(): ContributionDay[] {
  const contributions: ContributionDay[] = [];
  const today = new Date();
  const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  const startSunday = new Date(startDate);
  startSunday.setDate(startDate.getDate() - startDate.getDay());

  for (let i = 0; i < 371; i++) {
    const date = new Date(startSunday);
    date.setDate(startSunday.getDate() + i);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const intensity = (isWeekend ? 0.2 : 0.6) * Math.random();

    let level = 0;
    let count = 0;
    if (intensity > 0.7) {
      level = 4;
      count = Math.floor(Math.random() * 10) + 10;
    } else if (intensity > 0.5) {
      level = 3;
      count = Math.floor(Math.random() * 8) + 5;
    } else if (intensity > 0.3) {
      level = 2;
      count = Math.floor(Math.random() * 5) + 2;
    } else if (intensity > 0.1) {
      level = 1;
      count = Math.floor(Math.random() * 3) + 1;
    }

    contributions.push({
      date: date.toISOString().split('T')[0],
      level,
      count,
    });
  }

  return contributions;
}

function formatNumber(num: number) {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
}

function getMonthLabels() {
  const months = [];
  const today = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    months.push(date.toLocaleDateString('en-US', { month: 'short' }));
  }
  return months;
}

function organizeContributionsByWeek(contributions: ContributionDay[]) {
  const weeks: ContributionDay[][] = [];

  for (let index = 0; index < contributions.length; index += 7) {
    weeks.push(contributions.slice(index, index + 7));
  }

  return weeks;
}

function shareToTwitter() {
  const text = `I have generated my GitHub card from Spectrum UI! 🚀\n\nGenerate yours: ${window.location.href}\n\n#GitHub #SpectrumUI #Developer`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function shareToLinkedIn() {
  const text =
    'I have generated my GitHub card from Spectrum UI! Check out this tool to showcase your GitHub profile.';
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function copyShareLink() {
  const text = `I have generated my GitHub card from Spectrum UI! Generate yours: ${window.location.href}`;
  navigator.clipboard.writeText(text);
  alert('Link copied to clipboard!');
}

export default function GitHubProfileCard() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubUser = async (username: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found');
        } else if (response.status === 403) {
          throw new Error('API rate limit exceeded');
        } else {
          throw new Error('Failed to fetch user data');
        }
      }

      const data: GitHubUser = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (username.trim()) {
      fetchGitHubUser(username.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const contributions = useMemo(generateContributions, []);
  const contributionWeeks = useMemo(
    () => organizeContributionsByWeek(contributions),
    [contributions],
  );
  const monthLabels = useMemo(getMonthLabels, []);

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4 space-y-6">
      <div className="w-full max-w-md flex space-x-2">
        <Input
          aria-label="GitHub username"
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyPress}
          className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 rounded-xl"
        />
        <Button
          aria-label={loading ? 'Loading GitHub profile' : 'Search GitHub profile'}
          onClick={handleSearch}
          disabled={loading || !username.trim()}
          className="bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </Button>
      </div>

      {error && (
        <div className="w-full max-w-md p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-center">
          {error}
        </div>
      )}

      {userData && (
        <>
          <Card className="w-full max-w-md bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-600/60 via-neutral-400/30 to-transparent dark:from-blue-600/30 dark:via-blue-600/10 dark:to-transparent  rounded-b-3xl" />

            <div className="relative z-10 flex flex-col items-center space-y-6">
              <Avatar className="w-20 h-20 border-2 border-neutral-200 dark:border-neutral-800">
                <AvatarImage
                  src={userData.avatar_url || '/placeholder.svg'}
                  alt={userData.name || userData.login}
                />
                <AvatarFallback className="bg-blue-500 text-white text-xl font-semibold">
                  {(userData.name || userData.login).charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Name and Bio */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {userData.name || userData.login}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-xs">
                  {userData.bio || 'GitHub Developer'}
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-4">
                {userData.twitter_username && (
                  <a
                    aria-label={`${userData.login}'s Twitter profile`}
                    href={`https://twitter.com/${userData.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors"
                  >
                    <Icons.twitter className="w-5 h-5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white" />
                  </a>
                )}
                <a
                  aria-label={`${userData.login}'s GitHub profile`}
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors"
                >
                  <Icons.gitHub className="w-5 h-5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white" />
                </a>
                {userData.blog && (
                  <a
                    aria-label={`${userData.login}'s website`}
                    href={
                      userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors"
                  >
                    <Globe className="w-5 h-5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white" />
                  </a>
                )}
                {userData.email && (
                  <a
                    aria-label={`Email ${userData.name || userData.login}`}
                    href={`mailto:${userData.email}`}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors"
                  >
                    <Mail className="w-5 h-5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white" />
                  </a>
                )}
              </div>

              {/* Stats */}
              <div className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
                <div className="flex-1 text-center py-3 border-r border-neutral-200 dark:border-neutral-800">
                  <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {formatNumber(userData.followers)}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">Followers</div>
                </div>
                <div className="flex-1 text-center py-3 border-r border-neutral-200 dark:border-neutral-800">
                  <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {formatNumber(userData.following)}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">Following</div>
                </div>
                <div className="flex-1 text-center py-3">
                  <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {formatNumber(userData.public_repos)}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">Repositories</div>
                </div>
              </div>

              {/* Contribution Graph */}
              <div className="w-full space-y-3">
                {/* Month labels */}
                <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 px-3">
                  {monthLabels.map((month, index) => (
                    <span key={month} className={index % 2 === 0 ? 'opacity-100' : 'opacity-0'}>
                      {month}
                    </span>
                  ))}
                </div>

                {/* Contribution grid - GitHub style */}
                <div className="flex gap-1">
                  {/* Day labels */}
                  <div className="flex flex-col justify-around text-xs text-neutral-500 dark:text-neutral-400 pr-2 h-20">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>

                  {/* Grid container */}
                  <div className="flex gap-1 overflow-x-auto">
                    {contributionWeeks.map((week) => (
                      <div key={week[0]?.date} className="flex flex-col gap-1">
                        {week.map((day) => (
                          <div
                            key={day.date}
                            className={`w-3 h-3 rounded-sm hover:ring-1 hover:ring-neutral-400 dark:hover:ring-neutral-500 transition-all ${contributionColorClasses[day.level]}`}
                            title={`${day.count} contributions on ${day.date}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 px-3">
                  <span>Learn how we count contributions</span>
                  <div className="flex items-center space-x-1">
                    <span>Less</span>
                    <div className="flex space-x-1">
                      {[0, 1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`w-3 h-3 rounded-sm ${contributionColorClasses[level]}`}
                        />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Share Section */}
          <div className="w-full max-w-md bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Share Your GitHub Card
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                I have generated my GitHub card from Spectrum UI! Generate yours and showcase your
                profile.
              </p>
            </div>

            <div className="flex space-x-3 justify-center">
              <Button
                aria-label="Share on Twitter"
                onClick={shareToTwitter}
                className="rounded-xl"
                size="sm"
              >
                <Icons.twitter className="w-4 h-4" />
              </Button>

              <Button
                aria-label="Share on LinkedIn"
                onClick={shareToLinkedIn}
                className="rounded-xl"
                size="sm"
              >
                <Linkedin className="w-4 h-4" />
              </Button>

              <Button
                aria-label="Copy share link"
                onClick={copyShareLink}
                className="rounded-xl"
                size="sm"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Default state message */}
      {!userData && !loading && !error && (
        <div className="text-neutral-600 dark:text-neutral-400 text-center max-w-md">
          <p className="text-lg mb-2">Enter a GitHub username to view their profile card</p>
          <p className="text-sm">
            Try searching for popular users like &quot;arihantcodes&quot;, &quot;torvalds&quot;
          </p>
        </div>
      )}
    </div>
  );
}
