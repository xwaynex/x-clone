import { useSession } from "next-auth/react";
import {
  Transition,
  Dialog,
  TransitionChild,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { FormEvent } from "react";
// import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, } from "@heroicons/react/24/outline"
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
// import Moment from "react-moment"
import { useAtom } from "jotai";
import { Fragment, useEffect, useState } from "react";
import { modalState, postIdState } from "@/atoms/modelAtoms";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Image from "next/image";
import { PostData } from "@/app/type";
import Moment from "react-moment";

const Modal = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useAtom(modalState);
  const [postId, SetPostId] = useAtom(postIdState);
  const [post, setPost] = useState<PostData>();
  const [comment, setComment] = useState("");
  const router = useRouter();

  useEffect(() => {
    return onSnapshot(doc(db, "posts", postId), (snapshot) => {
      const data = snapshot.data();
      if (data) {
        setPost(data as PostData); 
      }
    });
  }, [postId]);

  const sendComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addDoc(collection(db, "posts", postId, "comments"), {
      comment,
      username: session?.user.name,
      tag: session?.user.tag,
      userImg: session?.user.image,
      timestamp: serverTimestamp(),
    });

    setIsOpen(false);
    setComment("");

    router.push(`/${postId}`);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 pt-8 focus:outline-none"
        onClose={setIsOpen}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {/* <div className="flex min-h-full items-center justify-center p-4"> */}
            <DialogPanel
              transition
              className="inline-block align-bottom bg-black rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
            >
              <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                <div
                  className="hoverAnimation w-9 h-9 items-center justify-center xl:px-0"
                  onClick={() => setIsOpen(false)}
                >
                  <XMarkIcon className="h-[22px] text-white" />
                </div>
              </div>
              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  <div className="text-[#6e767d] flex gap-x-3 relative">
                    <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />
                    {post && (
                      <Image
                        src={post.userImg}
                        alt=""
                        width={44}
                        height={44}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <div className="inline-block group">
                        <h4 className="font-bold text-[15px] sm:text-base text-[#d9d9d9] inline-block">
                          {post?.username}
                        </h4>
                        <span className="ml-1.5 text-sm sm:text-[15px]">
                          @{post?.tag}
                        </span>
                      </div>{" "}
                      <span className="hover:underline text-sm sm:text-[15px]">
                        <Moment fromNow>{post?.timeStamp?.toDate()}</Moment>
                      </span>
                      <p className="text-[#d9d9d9] text-[15px] sm:text-base">
                        {post?.text}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 flex space-x-3 w-full items-start">
                    <Image
                      src={session?.user?.image || ""}
                      width={44}
                      height={44}
                      alt=""
                      className="rounded-full"
                    />

                    <div className="flex-grow mt-2">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tweet your reply"
                        rows={2}
                        className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]"
                      />

                      <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                          <div className="icon">
                            <PhotoIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>

                          <div className="icon rotate-90">
                            <ChartBarIcon className="text-[#1d96f0] h-[22px]" />
                          </div>

                          <div className="icon rotate-90">
                            <FaceSmileIcon className="text-[#1d96f0] h-[22px]" />
                          </div>

                          <div className="icon rotate-90">
                            <CalendarIcon className="text-[#1d96f0] h-[22px]" />
                          </div>
                        </div>

                        <button
                          className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                          type="submit"
                          onClick={sendComment}
                          disabled={!comment.trim()}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
            {/* </div> */}
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
