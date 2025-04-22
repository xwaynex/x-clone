"use client";
import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";
// import { getProviders} from "next-auth/react";
// import { getServerSession } from "next-auth";
// import authOptions from "@/lib/config/auth/auth";
import Login from "@/components/Login";
import { useSession } from "next-auth/react";
import {  useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [trendingResults, setTrendingResults] = useState([]);
  const [followResults, setFollowResults] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [trendingRes, followRes] = await Promise.all([
  //         fetch("https://www.jsonkeeper.com/b/BFYM"),
  //         fetch("https://www.jsonkeeper.com/b/KWME"),
  //       ]);

  //       const [trendingData, followData] = await Promise.all([
  //         trendingRes.json(),
  //         followRes.json(),
  //       ]);

  //       setTrendingResults(trendingData);
  //       setFollowResults(followData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
    
  //   fetchData();
  // }, []);
  
  if (!session) {
    return <Login />
  }

  return (
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
  );
}
