import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";
// import { getProviders} from "next-auth/react";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/config/auth/auth";
import Login from "@/components/Login";

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session){
    return <Login/>
  } 
    
  // Fetch trending and follow data
  const trendingResults = await fetch("https://www.jsonkeeper.com/b/BFYM").then((res) => res.json());
  const followResults = await fetch("https://www.jsonkeeper.com/b/KWME").then((res) => res.json());


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
