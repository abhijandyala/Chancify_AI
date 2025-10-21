import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Check if required environment variables are set
const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
const nextAuthSecret = process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build'
const nextAuthUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

console.log('NextAuth Configuration:', {
  hasGoogleClientId: !!googleClientId,
  hasGoogleClientSecret: !!googleClientSecret,
  hasNextAuthSecret: !!nextAuthSecret,
  nextAuthUrl
})

const handler = NextAuth({
  providers: googleClientId && googleClientSecret ? [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      // default scopes already include openid email profile
    }),
  ] : [],
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) token.provider = account.provider;
      return token;
    },
    async session({ session, token }) {
      (session as any).provider = token.provider;
      return session;
    },
  },
  pages: {
    error: '/auth/error', // Custom error page
  },
  debug: process.env.NODE_ENV === 'development',
  secret: nextAuthSecret,
})

export { handler as GET, handler as POST }
