// components/github-profile-card.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Icons } from '@/components/icon';
import { Github, Mail, Globe } from 'lucide-react';

export interface GitHubUser {
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

interface GitHubUserCardProps {
  user: GitHubUser;
}

export const GitHubUserCard: React.FC<GitHubUserCardProps> = ({ user }) => {
  const formatNumber = (num: number) => (num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString());

  return (
    <Card className="w-full max-w-md bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-600/60 via-neutral-400/30 to-transparent dark:from-blue-600/30 dark:via-blue-600/10 dark:to-transparent rounded-b-3xl" />
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <Avatar className="w-20 h-20 border-2 border-neutral-200 dark:border-neutral-800">
          <AvatarImage src={user.avatar_url || '/placeholder.svg'} alt={user.name || user.login} />
          <AvatarFallback className="bg-blue-500 text-white text-xl font-semibold">
            {(user.name || user.login).charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{user.name || user.login}</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-xs">{user.bio || 'GitHub Developer'}</p>
        </div>
        <div className="flex space-x-4">
          {user.twitter_username && (
            <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors">
              <Icons.twitter className="w-5 h-5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white" />
            </a>
          )}
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors">
            <Github className="w-5 h-5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white" />
          </a>
          {user.blog && (
            <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors">
              <Globe className="w-5 h-5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white" />
            </a>
          )}
          {user.email && (
            <a href={`mailto:${user.email}`} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors">
              <Mail className="w-5 h-5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white" />
            </a>
          )}
        </div>
        <div className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
          <div className="flex-1 text-center py-3 border-r border-neutral-200 dark:border-neutral-800">
            <div className="text-lg font-semibold text-neutral-900 dark:text-white">{formatNumber(user.followers)}</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">Followers</div>
          </div>
          <div className="flex-1 text-center py-3 border-r border-neutral-200 dark:border-neutral-800">
            <div className="text-lg font-semibold text-neutral-900 dark:text-white">{formatNumber(user.following)}</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">Following</div>
          </div>
          <div className="flex-1 text-center py-3">
            <div className="text-lg font-semibold text-neutral-900 dark:text-white">{formatNumber(user.public_repos)}</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">Repositories</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
