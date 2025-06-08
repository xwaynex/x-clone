"use client";

import { useEffect, useState } from "react";
// import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Post from "./Post";
import { PostData } from "@/app/type";

const tabs = ["For you", "Following"];

const Feed = () => {
  const [posts, setPosts] = useState<Array<{ id: string; data: PostData }>>([]);
  const [activeTab, setActiveTab] = useState("For you");

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("timeStamp", "desc"));

    // Attach real‑time listener
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setPosts(
          snap.docs.map((d) => ({ id: d.id, data: d.data() as PostData }))
        );
      },
      (err) => console.error("onSnapshot error:", err)
    );

    return unsubscribe;
  }, []);

  return (
    <div className="text-white flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      {/* Tabs */}
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-14 sticky top-0 z-10 bg-black border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative text-sm sm:text-base font-semibold px-4 py-2 transition-all duration-200 ${
              activeTab === tab
                ? "text-white after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-[#1d90f0]"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Input */}
      <Input />

      {/* Feed Grid */}
      <div className="pb-72">
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
