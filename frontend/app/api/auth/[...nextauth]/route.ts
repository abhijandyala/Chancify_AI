import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Check if required environment variables are set
const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
const nextAuthSecret = process.env.NEXTAUTH_SECRET

if (!googleClientId || !googleClientSecret) {
  console.error('Missing Google OAuth credentials. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your environment variables.')
}

if (!nextAuthSecret) {
  console.error('Missing NEXTAUTH_SECRET. Please set this in your environment variables.')
}

const handler = NextAuth({
  providers: googleClientId && googleClientSecret ? [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      // default scopes already include openid email profile
    }),
  ] : [],
  session: { strategy: "jwt" },
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
})

export { handler as GET, handler as POST }
