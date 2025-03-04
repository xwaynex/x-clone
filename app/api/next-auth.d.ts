// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      uid?: string; // 🔹 Add `uid`
      tag?: string; // 🔹 Add `tag`
    };
  }
}
