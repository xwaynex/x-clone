import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      uid?: string;
      tag?: string;
    } & DefaultSession["user"];
  }
}
