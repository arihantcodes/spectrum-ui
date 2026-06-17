import { auth, signIn } from '@/auth'
import { redirect } from 'next/navigation'
import { Icons } from '@/components/icon'
import { AuthIllustration } from '@/components/auth-illustration'
import Link from 'next/link'

function GitHubIcon() {
  return (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.615 24 12.255 24z" />
      <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09z" />
      <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </svg>
  )
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string }
}) {
  const session = await auth()
  if (session?.user) {
    redirect(searchParams.callbackUrl ?? '/dashboard')
  }
  const callbackUrl = searchParams.callbackUrl ?? '/'
  const postAuthRedirect = `/create-user${callbackUrl !== '/' ? `?next=${encodeURIComponent(callbackUrl)}` : ''}`

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* ─── Left: Sign-in form ─── */}
      <div className="flex flex-col bg-white dark:bg-[#080808] px-6 sm:px-12 lg:px-16 xl:px-20 transition-colors">

        {/* Top bar */}
        <div className="flex items-center justify-between pt-8 pb-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 bg-neutral-100 dark:bg-white border border-neutral-200 dark:border-transparent rounded-lg flex items-center justify-center p-1.5 shadow-sm group-hover:shadow-md transition-shadow">
              <Icons.logo className="h-full w-full text-black" />
            </div>
            <span className="text-sm font-semibold text-neutral-900 dark:text-[#F5F5F5] tracking-tight">Spectrum UI</span>
          </Link>

          
        </div>

        {/* Centered form */}
        <div className="flex-1 flex flex-col justify-center max-w-[380px] w-full mx-auto">

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-[#F5F5F5] mb-2">
              Create your free account
            </h1>
            <p className="text-sm text-neutral-500 dark:text-[#666] leading-relaxed">
              Access components, CLI&nbsp;commands, and&nbsp;templates.
            </p>
          </div>

          {/* Auth buttons */}
          <div className="flex flex-col gap-3">

            {/* GitHub */}
            <form action={async () => {
              'use server'
              await signIn('github', { redirectTo: postAuthRedirect })
            }}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5
                  bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-950
                  text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-[#0a0a0a]
                  font-medium text-sm h-11 px-4 rounded-xl
                  transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer"
              >
                <GitHubIcon />
                Continue with GitHub
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-neutral-200 dark:bg-[#1f1f1f]" />
              <span className="text-[11px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">or</span>
              <div className="flex-1 h-px bg-neutral-200 dark:bg-[#1f1f1f]" />
            </div>

            {/* Google */}
            <form action={async () => {
              'use server'
              await signIn('google', { redirectTo: postAuthRedirect })
            }}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5
                  bg-white hover:bg-neutral-50 active:bg-neutral-100
                  dark:bg-[#111] dark:hover:bg-[#1a1a1a] dark:text-[#F5F5F5]
                  text-neutral-700
                  border border-neutral-200 dark:border-[#2a2a2a]
                  font-medium text-sm h-11 px-4 rounded-xl
                  transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer"
              >
                <GoogleIcon />
                Continue with Google
              </button>
            </form>
          </div>

          {/* Footer terms */}
          <p className="text-[11px] text-neutral-400 dark:text-neutral-600 text-center mt-8 leading-relaxed">
            Free forever · No credit card required ·{' '}
            <a
              href="/tos"
              className="underline underline-offset-2 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
            >
              Terms
            </a>
          </p>
        </div>

        {/* Bottom spacer */}
        <div className="pb-8" />
      </div>

      {/* ─── Right: Dashboard illustration ─── */}
      <AuthIllustration />
    </div>
  )
}
