import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";
// import { getProviders} from "next-auth/react";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/config/auth/auth";
import Login from "@/components/Login";
// import { useSession } from "next-auth/react";
// import {  useState } from "react";
import ModalWrapper from "@/components/ModalWrapper";

export default async function Home() {
  const session = await getServerSession(authOptions);
  let trendingRes: Response;
  let followRes: Response;

  if (!session) {
    return <Login />;
  }

  try {
    // Fetch on the server
    [trendingRes, followRes] = await Promise.all([
      fetch("https://www.jsonkeeper.com/b/BFYM", { cache: "no-store" }),
      fetch("https://www.jsonkeeper.com/b/I1X5", { cache: "no-store" }),
    ]);
  } catch (error) {
    console.error("Error fetching data:", error);

    return
  }

  const [trendingResults, followResults] = await Promise.all([
    trendingRes.json(),
    followRes.json(),
  ]);

  return (
    <div className="">
      <main className="min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        {/* {session.user?.name} */}
        <Widget
          trendingResults={trendingResults.whats_happening}
          followResults={followResults.who_to_follow}
          session={session}
        />
        <ModalWrapper />
      </main>
    </div>
  );
}
