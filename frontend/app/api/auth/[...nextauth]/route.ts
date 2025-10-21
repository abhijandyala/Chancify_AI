import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // default scopes already include openid email profile
    }),
  ],
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
})

export { handler as GET, handler as POST }
