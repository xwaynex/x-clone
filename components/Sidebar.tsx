"use client";
import Image from "next/image";
import SidebarLink from "./SidebarLink";
import { HomeIcon } from "@heroicons/react/16/solid";
import {
  BellIcon,
  EnvelopeIcon,
  VariableIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();
  // console.log("Session", session)
  
  return (
    <div className="hidden sm:flex flex-col items-center xl:items.start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="https://rb.gy/vy3ia4" alt="logo" width={30} height={30} />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={MagnifyingGlassIcon} />
        <SidebarLink text="Notification" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={EnvelopeIcon} />
        <SidebarLink text="Grok" Icon={VariableIcon} />
        <SidebarLink text="Communities" Icon={UsersIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={EllipsisHorizontalCircleIcon} />
      </div>
      <button className="hidden xl:inline ml-auto bg-white text-black rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#d9d9d9]">
        Post
      </button>
      <div
        className="text-[#d9d9d9] flex justify-center items-center hoverAnimation xl:-mr-5 xl:ml-auto mt-auto"
        onClick={() => signOut()}
      >
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="User Profile"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full xl:mr-2.5"
          />
        )}

        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold"> {session?.user?.name}</h4>
          <p className="text-[#6e767d]">@{session?.user?.tag}</p>
        </div>
        <EllipsisHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  );
};

export default Sidebar;
