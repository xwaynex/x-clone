"use client";
import {
  CalendarDaysIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useRef, useState } from "react";

const Input = () => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef(null);

  const addEmoji = (e: { unified: string }) => {
    const sym: string[] = e.unified.split("_");
    const codesArray: number[] = sym.map((el) => Number("0x" + el)); // Convert to hex-based number
    const emoji = String.fromCodePoint(...codesArray);
    setInput((prev) => prev + emoji); // Preserve previous input state
  };

  const addImageToPost = () => {};

  return (
    <div className={`border-b border-gray-700 p-3 flex space-x-3`}>
      <img
        src="https://lh3.googleusercontent.com/a/ACg8ocJ97iaJQYaBIMk-3h2BPUCtPvWURb_OgNNUWQdlmU3PzHh-OA=s64-c"
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
      />
      <div className=" w-full divide-y divide-gray-700">
        <div className={``}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            placeholder="What is happening?!"
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
          />
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XMarkIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="relative flex items-center">
            <div>
              <PhotoIcon
                className="h-[22px] text-[#1d9bf0]"
                onClick={() => filePickerRef.current.click()}
              />
              <input
                type="file"
                hidden
                onChange={addImageToPost}
                ref={filePickerRef}
              />
            </div>
            <div className="icon rotate-90">
              <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
            </div>

            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
              <FaceSmileIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="icon">
              <CalendarDaysIcon className="h-[22px] text-[#1d9bf0]" />
            </div>

            {showEmojis && (
              <div className="absolute mt-[465px] ml-10 max-w-[320px] rounded-[20px]">
                <Picker data={data} onEmojiSelect={addEmoji} theme="dark" />
              </div>
            )}
          </div>
          <button
            className="bg-white text-black rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#d9d9d9] disabled:hover:bg-[#d9d9d9] disabled:opacity-50 disabled:cursor-default"
            disabled={!input.trim() && !selectedFile}
          >
            {" "}
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
