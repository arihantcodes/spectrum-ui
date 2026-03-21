import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId:     process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    // Rely exclusively on the onboarding page logic for DB inserts
    async signIn({ user, account, profile }) {
      return true
    },

    // Attach extra fields to the JWT
    async jwt({ token, user, account, profile }) {
      if (account?.provider === 'github') {
        // 1. If signing in with GitHub, use the provider's login
        token.githubUsername = (profile as any)?.login
      } else if (token.email && !token.githubUsername) {
        // 2. If missing (e.g. Google login), try to fetch from our DB
        try {
          const { createClient } = await import('@supabase/supabase-js')
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          )
          const { data } = await supabase
            .from('users')
            .select('github_username')
            .eq('email', token.email)
            .single()
          
          if (data?.github_username) {
            token.githubUsername = data.github_username
          }
        } catch (err) {
          console.error('[auth] Failed to fetch githubUsername from DB:', err)
        }
      }
      return token
    },

    // Expose those fields in the session
    async session({ session, token }) {
      session.user.id            = token.sub!
      session.user.githubUsername = token.githubUsername as string | undefined
      return session
    },
  },

  pages: {
    signIn: '/sign-in',
  },
})
