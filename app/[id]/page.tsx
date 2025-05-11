"use client";
import { useSession } from "next-auth/react";
// import Head from "next/head";
import { useAtom } from "jotai";
import Modal from "@/components/Modal";
import Sidebar from "@/components/Sidebar";
import { modalState } from "@/atoms/modelAtoms";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { CommentsData, PostData } from "../type";
import Login from "@/components/Login";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Post from "@/components/Post";
import Comment from "@/components/Comment";

const PostPage = () => {
  const { data: session } = useSession();
  const [isOpen] = useAtom(modalState);
  const router = useRouter();
  const params = useParams();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const [post, setPost] = useState<PostData>();

  const [comments, setComments] = useState<CommentsData[]>([]);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    return onSnapshot(doc(db, "posts", id), (snapshot) => {
      const data = snapshot.data();
      if (data) {
        setPost(data as PostData);
      }
    });
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        const commentsData = snapshot.docs.map(
          (doc) => ({
            id: doc.id, 
            ...(doc.data() as Omit<CommentsData, "id">),
          })
        );
        setComments(commentsData);
      }
    );
    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    if (post) {
      document.title = `${post.username} on X: "${post.text}"`;
    }
  }, [post]);

  if (!session) return <Login />;

  return (
    <div className="">
      {/* <Head>
        <link rel="icon" href="/favicon.icon" />
      </Head> */}

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[72px] xl:ml-[370px]">
          <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-10 bg-black">
            <div
              className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
              onClick={() => router.push("/")}
            >
              <ArrowLeftIcon className="h-5 text-white font-bold" />
            </div>
            Post
          </div>
          {post && id && <Post id={id} post={post} postPage />}

          {comments.length > 0 && (
            <div className="pb-72">
            {comments.map((comment) => (
                <Comment key={comment.id} id={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
        {/* widget */}
        {isOpen && <Modal />}
      </main>
    </div>
  );
};
export default PostPage;
