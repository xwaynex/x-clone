import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";

const Feed = () => {
  return (
    <div className="text-white flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-14 sticky top-0 z-50 bg-black border-b border-gray-700">
        <h2 className=" text-lg sm:text-base font-bold">For you</h2>
        <div className="hoverAnimation w-9 h-9 items-center justify-center xl:px-0 ml-auto">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>
        <Input />
    </div>
  );
};

export default Feed;
