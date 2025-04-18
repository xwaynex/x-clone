"use client";
import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";
// import { getProviders} from "next-auth/react";
// import { getServerSession } from "next-auth";
// import authOptions from "@/lib/config/auth/auth";
import Login from "@/components/Login";
import { RecoilRoot } from "recoil";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <Login />
  }
  let trendingResults;
  let followResults;
  // Fetch trending and follow data
  (async () => {
    trendingResults = await fetch("https://www.jsonkeeper.com/b/BFYM").then(
      (res) => res.json()
    );
    followResults = await fetch("https://www.jsonkeeper.com/b/KWME").then(
      (res) => res.json()
    );
  })();

  return (
    <RecoilRoot>
      <div className="">
        <main className="min-h-screen flex max-w-[1500px] mx-auto">
          <Sidebar />
          <Feed />
          {session.user?.name}
          <Widget
            trendingResults={trendingResults}
            followResults={followResults}
            session={session}
          />
        </main>
      </div>
    </RecoilRoot>
  );
}
