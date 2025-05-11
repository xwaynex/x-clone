"use client";

import { CommentsData, PostProps } from "@/app/type";
import Image from "next/image";
import {
  // AdjustmentsHorizontalIcon,
  ChartBarIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
  ArrowPathRoundedSquareIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFill } from "@heroicons/react/16/solid";
import { useSession } from "next-auth/react";
// import {  useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atoms/modelAtoms";
import { useAtom } from "jotai";
import Moment from "react-moment";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Like } from "@/app/type";

const Post = ({ post, id, postPage }: PostProps) => {
  const { data: session } = useSession();
  const [, setIsOpen] = useAtom(modalState);
  const [, setPostId] = useAtom(postIdState);
  const [comments, setComments] = useState<CommentsData[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  useEffect(
    () => {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          const commentsData = snapshot.docs.map((doc) => doc.data() as CommentsData);
          setComments(commentsData);
        }
      )

      return () => unsubscribe();
    }, [id]);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [id]
  );

  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes, session]
  );

  const likePost = async () => {
    if (!id || !session?.user?.uid) return;

    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session?.user.name,
      });
    }
  };

  return (
    <div
      className="p-3 flex cursor-pointer border-b border-gray-700"
      onClick={() => router.push(`/${id}`)}
    >
      {!postPage && (
        <Image
          src={post?.userImg}
          alt="user profile"
          width={40}
          height={40}
          className="h-11 w-11 rounded-full mr-4"
        />
      )}
      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!postPage && "justify-between"} `}>
          {postPage && (
            <Image
              src={post?.userImg}
              alt="profile picture"
              width={40}
              height={40}
              className="h-11 w-11 rounded-full mr-4"
            />
          )}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                  !postPage && "inline-block"
                }`}
              >
                {post?.username}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
              >
                @{post.tag}
              </span>
            </div>{" "}
            .{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{post?.timeStamp?.toDate()}</Moment>
            </span>
            {!postPage && (
              <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                {post?.text}
              </p>
            )}
          </div>

          <div className="icon group flex-shrink-0 ml-auto">
            <EllipsisHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        {postPage && (
          <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
            {" "}
            {post?.text}
          </p>
        )}
        {/* {post?.imageUrl && (
          <div className="relative w-full max-w-md aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden mr-2">
            <Image
              src={post.imageUrl}
              alt="Post Image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 
             (max-width: 1200px) 50vw, 
             33vw"
              priority
            />
          </div>
        )} */}

        {post?.imageUrl && (
          <Image
            src={post.imageUrl}
            alt="Post Image"
            width={600}
            height={700}
            className="rounded-2xl object-cover mr-2"
          />
        )}

        <div
          className={`text-[#6e767d] flex justify-between w-10/12 ${
            postPage && "mx-auto"
          }`}
        >
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              setPostId(id);
              setIsOpen(true);
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatBubbleLeftIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>

          {session?.user.uid === post?.id ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "posts", id));
                router.push("/");
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-green-500/10">
                <ArrowPathRoundedSquareIcon className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}

          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFill className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
