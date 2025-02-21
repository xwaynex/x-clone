import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.sub) {
        return {
          ...session,
          user: {
            ...session.user,
            tag: session.user.name?.split(" ").join("").toLowerCase(),
            uid: token.sub,
          },
        };
      }
      return session;
    }
    
  },
  secret: process.env.NEXTAUTH_SECRET, // Required in production
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
