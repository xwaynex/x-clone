import { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";


// Define auth options inside the route file
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT })  {
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
    },
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET, // Required in production
};

export default  authOptions