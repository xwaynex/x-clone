"use client";

import { useEffect, useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Post from "./Post";
import { PostData } from "@/app/type";

const Feed = () => {
  const [posts, setPosts] = useState<Array<{ id: string; data: PostData }>>([]);

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
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-14 sticky top-0 z-10 bg-black border-b border-gray-700">
        <h2 className=" text-lg sm:text-base font-bold">For you</h2>
        <div className="hoverAnimation w-9 h-9 items-center justify-center xl:px-0 ml-auto">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>
      <Input />
      <div className="pb-72">
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
