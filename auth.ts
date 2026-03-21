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
    async jwt({ token, account, profile }) {
      if (account?.provider === 'github') {
        // Store GitHub username — needed for repo access
        token.githubUsername = (profile as any)?.login
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
