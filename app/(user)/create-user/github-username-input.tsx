'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

import { Icons } from '@/components/icon';
import { validateGithubUsername } from '@/lib/validate-github-username';

interface GitHubUsernameInputProps {
  defaultValue?: string;
  onValidationChange?: (isValid: boolean) => void;
}

export function GitHubUsernameInput({
  defaultValue = '',
  onValidationChange,
}: GitHubUsernameInputProps) {
  const [value, setValue] = useState(defaultValue);
  const [githubError, setGithubError] = useState<string | null>(null);
  const [githubLoading, setGithubLoading] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const validationRequest = useRef(0);

  const runValidation = useCallback(
    async (username: string) => {
      const trimmed = username.trim();
      const request = ++validationRequest.current;

      if (!trimmed) {
        setGithubError(null);
        setGithubLoading(false);
        setIsValid(null);
        onValidationChange?.(false);
        return;
      }

      setGithubLoading(true);
      setGithubError(null);
      setIsValid(null);
      onValidationChange?.(false);

      try {
        const valid = await validateGithubUsername(trimmed);
        if (request !== validationRequest.current) return;

        if (valid) {
          setIsValid(true);
          onValidationChange?.(true);
        } else {
          setGithubError('Please enter a valid GitHub username');
          setIsValid(false);
          onValidationChange?.(false);
        }
      } catch {
        if (request !== validationRequest.current) return;
        setGithubError('Unable to verify this username. Please try again.');
        setIsValid(false);
        onValidationChange?.(false);
      } finally {
        if (request === validationRequest.current) setGithubLoading(false);
      }
    },
    [onValidationChange],
  );

  useEffect(() => {
    if (!value.trim()) return;

    const timeout = window.setTimeout(() => {
      void runValidation(value);
    }, 450);

    return () => window.clearTimeout(timeout);
  }, [runValidation, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validationRequest.current += 1;
    setValue(e.target.value);
    setGithubError(null);
    setGithubLoading(false);
    setIsValid(null);
    onValidationChange?.(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor="github_username" className="text-[13px] font-medium text-foreground">
          GitHub username
        </label>
        <span className="text-[11px] text-muted-foreground">Required for repo access</span>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Icons.gitHub className="size-4 text-muted-foreground" />
        </div>
        <input
          id="github_username"
          type="text"
          name="github_username"
          required
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          value={value}
          onChange={handleChange}
          placeholder="your-username"
          aria-invalid={isValid === false}
          aria-busy={githubLoading}
          aria-describedby={
            githubError ? 'github_username_hint github_username_error' : 'github_username_hint'
          }
          className={`h-12 w-full rounded-full border bg-background pl-11 pr-11 text-sm text-foreground outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/70 ${
            isValid === true
              ? 'border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/10'
              : isValid === false
                ? 'border-red-500/60 focus:ring-4 focus:ring-red-500/10'
                : 'border-input focus:border-muted-foreground/40 focus:ring-4 focus:ring-foreground/[0.05]'
          }`}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          {githubLoading && (
            <Loader2
              size={15}
              className="animate-spin text-muted-foreground motion-reduce:animate-none"
            />
          )}
          {isValid === true && <CheckCircle2 size={15} className="text-emerald-500" />}
        </div>
      </div>

      <p
        id="github_username_hint"
        className="px-1 text-[11px] leading-relaxed text-muted-foreground"
      >
        We’ll verify your username automatically.
      </p>

      {githubError && (
        <p
          id="github_username_error"
          role="status"
          className="flex items-center gap-1.5 text-[13px] text-red-500"
        >
          <span className="inline-block h-1 w-1 rounded-full bg-current" />
          {githubError}
        </p>
      )}
    </div>
  );
}
