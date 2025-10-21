import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Force Node runtime (Edge can crash in v4)
export const runtime = "nodejs";

export const authOptions = {
  debug: process.env.NEXTAUTH_DEBUG === "true",
  secret: process.env.NEXTAUTH_SECRET,

  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // default scopes: openid email profile
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.provider = account.provider;
      }
      if (profile?.email) token.email = profile.email as string;
      return token;
    },
    async session({ session, token }) {
      // surface provider + email in session
      // @ts-ignore
      session.provider = token.provider;
      if (token.email) session.user.email = token.email as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
