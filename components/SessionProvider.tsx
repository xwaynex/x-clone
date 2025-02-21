"use client";

import { SessionProvider as Provider } from "next-auth/react";

export default function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session?: any;
}) {
  return <Provider session={session}>{children}</Provider>;
}
