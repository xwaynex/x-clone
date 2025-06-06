import { TrendingItem } from "@/app/type";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { FC } from "react";
interface TrendingProps {
  result: TrendingItem;
}

const Trending: FC<TrendingProps> = ({ result }) => {
  return (
    <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 pt-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between ">
      <div className="space-y-0.5">
        <p className="text-[#6e7d7d] text-xs font-medium">{result.title}</p>
        <h6 className="font-bold max-w-[250px] text-sm">{result.topic}</h6>
        <p className="text-[#6e7d7d] text-xs font-medium">
          {result.posts_count && `${result.posts_count.toLocaleString()} posts`}
        </p>
      </div>

      {result.img ? (
        <Image
          src={result.img}
          width={70}
          height={70}
          alt="trending image"
          objectFit="cover"
          className="rounded-2xl"
        />
      ) : (
        <div className="icon group">
          <EllipsisHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
        </div>
      )}
    </div>
  );
};

export default Trending;
