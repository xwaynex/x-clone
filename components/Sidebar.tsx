import Image from "next/image";
import SidebarLink from "./SidebarLink";
import { HomeIcon } from "@heroicons/react/16/solid";
import {
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
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
        <SidebarLink text="Grok" Icon={BookmarkIcon} />
        <SidebarLink text="Communities" Icon={UsersIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={EllipsisHorizontalCircleIcon} />
      </div>
      <button className="hidden xl:inline ml-auto bg-white text-black rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#d9d9d9]">
        Post
      </button>
      <div className="text-[#d9d9d9] flex justify-center items-center hoverAnimation xl:ml-auto mt-auto">
        <img
          src="https://lh3.googleusercontent.com/a/ACg8ocJ97iaJQYaBIMk-3h2BPUCtPvWURb_OgNNUWQdlmU3PzHh-OA=s64-c"
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold"> shinto</h4>
          <p className="text-[#6e767d]">@shinto44</p>
        </div>
        <EllipsisHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  );
};

export default Sidebar;
