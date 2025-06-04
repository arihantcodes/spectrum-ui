"use client";

import type React from "react";
import { useState } from "react";
import Head from "next/head";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { Card } from "@/components/UI/Card";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import {
  Twitter,
  Linkedin,
  Mail,
  Github,
  Search,
  Loader2,
  Share2,
  Globe,
} from "lucide-react";
import { Icons } from "@/components/Icon";

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

export default function GitHubProfileCard() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate realistic contribution data with proper GitHub-like structure
  const generateContributions = (): ContributionDay[] => {
    const contributions: ContributionDay[] = [];
    const today = new Date();
    const startDate = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate()
    );

    // Start from the Sunday of the week containing startDate
    const startSunday = new Date(startDate);
    startSunday.setDate(startDate.getDate() - startDate.getDay());

    for (let i = 0; i < 371; i++) {
      // ~53 weeks * 7 days
      const date = new Date(startSunday);
      date.setDate(startSunday.getDate() + i);

      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const baseIntensity = isWeekend ? 0.2 : 0.6;
      const randomFactor = Math.random();
      const intensity = baseIntensity * randomFactor;

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
        date: date.toISOString().split("T")[0],
        level,
        count,
      });
    }

    return contributions;
  };

  const fetchGitHubUser = async (username: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found");
        } else if (response.status === 403) {
          throw new Error("API rate limit exceeded");
        } else {
          throw new Error("Failed to fetch user data");
        }
      }

      const data: GitHubUser = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
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
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const contributions = generateContributions();

  const getContributionColor = (level: number) => {
    // Using CSS custom properties that work with dark mode
    switch (level) {
      case 0:
        return "rgb(235 237 240 / 1)"; // light mode
      case 1:
        return "rgb(155 233 168 / 1)";
      case 2:
        return "rgb(64 196 99 / 1)";
      case 3:
        return "rgb(48 161 78 / 1)";
      case 4:
        return "rgb(33 110 57 / 1)";
      default:
        return "rgb(235 237 240 / 1)";
    }
  };

  const getDarkContributionColor = (level: number) => {
    switch (level) {
      case 0:
        return "rgb(33 33 33 / 1)"; // dark mode
      case 1:
        return "rgb(64 64 64 / 1)";
      case 2:
        return "rgb(96 96 96 / 1)";
      case 3:
        return "rgb(128 128 128 / 1)";
      case 4:
        return "rgb(198 198 198 / 1)";
      default:
        return "rgb(33 33 33 / 1)";
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const getMonthLabels = () => {
    const months = [];
    const today = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(date.toLocaleDateString("en-US", { month: "short" }));
    }
    return months;
  };

  const organizeContributionsByWeek = () => {
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    contributions.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === contributions.length - 1) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });

    return weeks;
  };

  const shareToTwitter = () => {
    const text = `I have generated my GitHub card from Spectrum UI! 🚀\n\nGenerate yours: ${window.location.href}\n\n#GitHub #SpectrumUI #Developer`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank");
  };

  const shareToLinkedIn = () => {
    const text = `I have generated my GitHub card from Spectrum UI! Check out this amazing tool to showcase your GitHub profile.`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      window.location.href
    )}&summary=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const copyToClipboard = () => {
    const text = `I have generated my GitHub card from Spectrum UI! Generate yours: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
  };

  return (
    <>
      {/* Open Graph Meta Tags for Social Sharing */}
      <Head>
        <title>
          {userData
            ? `${userData.name || userData.login} - GitHub Profile Card`
            : "GitHub Profile Card Generator"}
        </title>
        <meta
          name="description"
          content={
            userData
              ? `Check out ${
                  userData.name || userData.login
                }'s GitHub profile card with ${
                  userData.public_repos
                } repositories and ${userData.followers} followers.`
              : "Generate beautiful GitHub profile cards to showcase your coding journey and contributions."
          }
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content={
            userData
              ? `${userData.name || userData.login} - GitHub Profile Card`
              : "GitHub Profile Card Generator"
          }
        />
        <meta
          property="og:description"
          content={
            userData
              ? `Check out ${
                  userData.name || userData.login
                }'s GitHub profile card with ${
                  userData.public_repos
                } repositories and ${userData.followers} followers.`
              : "Generate beautiful GitHub profile cards to showcase your coding journey and contributions."
          }
        />
        <meta property="og:image" content={userData?.avatar_url || "/og.png"} />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content="Spectrum UI - GitHub Profile Cards"
        />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            userData
              ? `${userData.name || userData.login} - GitHub Profile Card`
              : "GitHub Profile Card Generator"
          }
        />
        <meta
          name="twitter:description"
          content={
            userData
              ? `Check out ${
                  userData.name || userData.login
                }'s GitHub profile card with ${
                  userData.public_repos
                } repositories and ${userData.followers} followers.`
              : "Generate beautiful GitHub profile cards to showcase your coding journey and contributions."
          }
        />
        <meta
          name="twitter:image"
          content={userData?.avatar_url || "/og-image.png"}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.href : ""}
        />
      </Head>

      <div className="min-h-screen  flex flex-col items-center justify-center p-4 space-y-6">
        <div className="w-full max-w-md flex space-x-2">
          <Input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 rounded-xl"
          />
          <Button
            onClick={handleSearch}
            disabled={loading || !username.trim()}
            className="bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
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
                    src={userData.avatar_url || "/placeholder.svg"}
                    alt={userData.name || userData.login}
                  />
                  <AvatarFallback className="bg-blue-500 text-white text-xl font-semibold">
                    {(userData.name || userData.login).charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Name and Bio */}
                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {userData.name || userData.login}
                  </h1>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-xs">
                    {userData.bio || "GitHub Developer"}
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex space-x-4">
                  {userData.twitter_username && (
                    <a
                      href={`https://twitter.com/${userData.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors"
                    >
                      <Icons.twitter className="w-5 h-5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white" />
                    </a>
                  )}
                  <a
                    href={userData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors"
                  >
                    <Icons.gitHub className="w-5 h-5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white" />
                  </a>
                  {userData.blog && (
                    <a
                      href={
                        userData.blog.startsWith("http")
                          ? userData.blog
                          : `https://${userData.blog}`
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
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      Followers
                    </div>
                  </div>
                  <div className="flex-1 text-center py-3 border-r border-neutral-200 dark:border-neutral-800">
                    <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {formatNumber(userData.following)}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      Following
                    </div>
                  </div>
                  <div className="flex-1 text-center py-3">
                    <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {formatNumber(userData.public_repos)}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      Repositories
                    </div>
                  </div>
                </div>

                {/* Contribution Graph */}
                <div className="w-full space-y-3">
                  {/* Month labels */}
                  <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 px-3">
                    {getMonthLabels().map((month, index) => (
                      <span
                        key={month}
                        className={
                          index % 2 === 0 ? "opacity-100" : "opacity-0"
                        }
                      >
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
                      {organizeContributionsByWeek().map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                          {week.map((day, dayIndex) => (
                            <div
                              key={`${weekIndex}-${dayIndex}`}
                              className="w-3 h-3 rounded-sm cursor-pointer hover:ring-1 hover:ring-neutral-400 dark:hover:ring-neutral-500 transition-all"
                              style={{
                                backgroundColor: window.matchMedia(
                                  "(prefers-color-scheme: dark)"
                                ).matches
                                  ? getDarkContributionColor(day.level)
                                  : getContributionColor(day.level),
                              }}
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
                            className="w-3 h-3 rounded-sm"
                            style={{
                              backgroundColor: window.matchMedia(
                                "(prefers-color-scheme: dark)"
                              ).matches
                                ? getDarkContributionColor(level)
                                : getContributionColor(level),
                            }}
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
                  I have generated my GitHub card from Spectrum UI! Generate
                  yours and showcase your profile.
                </p>
              </div>

              <div className="flex space-x-3 justify-center">
                <Button
                  onClick={shareToTwitter}
                  className="rounded-xl"
                  size="sm"
                >
                  <Icons.twitter className="w-4 h-4" />
                </Button>

                <Button
                  onClick={shareToLinkedIn}
                  className="rounded-xl"
                  size="sm"
                >
                  <Linkedin className="w-4 h-4" />
                </Button>

                <Button
                  onClick={copyToClipboard}
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
            <p className="text-lg mb-2">
              Enter a GitHub username to view their profile card
            </p>
            <p className="text-sm">
              Try searching for popular users like "arihantcodes", "torvalds"
            </p>
          </div>
        )}
      </div>
    </>
  );
}
