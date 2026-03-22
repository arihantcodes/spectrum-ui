import { signIn } from '@/auth'
import { IconBrandGoogle, IconBrandGithub } from '@tabler/icons-react'

export default function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string }
}) {
  const callbackUrl = searchParams.callbackUrl ?? '/dashboard'

  return (
    <div className="min-h-screen bg-white dark:bg-[#080808] flex items-center justify-center px-4 transition-colors">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-[#F5F5F5]">
            Sign in to Spectrum Pro
          </h1>
          <p className="text-sm text-neutral-500 dark:text-[#666] mt-1">
            Access your purchased templates
          </p>
        </div>

        {/* Auth buttons */}
        <div className="bg-neutral-50 dark:bg-[#111] border border-neutral-200 dark:border-[#222] rounded-xl p-6
          dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)] shadow-sm">
          <div className="flex flex-col gap-3">

            {/* GitHub — primary, most devs use this */}
            <form action={async () => {
              'use server'
              await signIn('github', { redirectTo: callbackUrl })
            }}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3
                  bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-[#F5F5F5] dark:hover:bg-white dark:text-[#080808]
                  font-semibold text-sm py-3 px-4 rounded-lg
                  transition-colors"
              >
                <IconBrandGithub size={18} />
                Continue with GitHub
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-neutral-200 dark:bg-[#222]" />
              <span className="text-xs text-neutral-400 dark:text-[#444]">or</span>
              <div className="flex-1 h-px bg-neutral-200 dark:bg-[#222]" />
            </div>

            {/* Google */}
            <form action={async () => {
              'use server'
              await signIn('google', { redirectTo: callbackUrl })
            }}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3
                  bg-white hover:bg-neutral-50 text-neutral-900 dark:bg-transparent dark:hover:bg-[#161616] dark:text-[#F5F5F5]
                  border border-neutral-200 dark:border-[#222] hover:border-neutral-300 dark:hover:border-[#333]
                  font-medium text-sm py-3 px-4 rounded-lg
                  transition-all"
              >
                <IconBrandGoogle size={18} />
                Continue with Google
              </button>
            </form>
          </div>

          <p className="text-xs text-neutral-500 dark:text-[#444] text-center mt-5 leading-relaxed">
            By signing in you agree to our{' '}
            <a href="/terms" className="text-neutral-600 dark:text-[#666] hover:text-neutral-900 dark:hover:text-[#888] transition-colors">
              Terms
            </a>
            .
          </p>
        </div>

        {/* Note about GitHub */}
        <p className="text-xs text-neutral-500 dark:text-[#555] text-center mt-4 leading-relaxed">
          Sign in with GitHub to automatically link your account
          for template repo access.
        </p>

      </div>
    </div>
  )
}
