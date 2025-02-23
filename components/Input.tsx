"use client";
import {
  CalendarDaysIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
  GifIcon,
  MapPinIcon,
  AdjustmentsHorizontalIcon,
  VariableIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/outline";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useRef, useState } from "react";
import { db } from "@/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Input = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const getCloudinarySignature = async () => {
    const timestamp = Math.floor(Date.now() / 1000);

    const response = await fetch("/api/sign-cloudinary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp, folder: "uploads" }),
    });

    if (!response.ok) {
      throw new Error("Failed to get signature");
    }

    return response.json();
  };

  const sendPost = async () => {
    if (isLoading) return;
    setIsLoading(true);

    let imageUrl = "";

    if (selectedFile) {
      try {
        // 🔹 Step 1: Get timestamp & signature from backend
        const { signature, timestamp, apiKey, cloudName } =
          await getCloudinarySignature();

        // 🔹 Step 2: Convert Base64 Image to File (If Needed)
        let file;
        if (selectedFile.startsWith("data:image")) {
          const response = await fetch(selectedFile);
          const blob = await response.blob();
          file = new File([blob], "image.jpg", { type: blob.type });
        } else {
          file = selectedFile;
        }

        // 🔹 Step 3: Upload image to Cloudinary
        const formData = new FormData();
        formData.append("file", file); // Append the image file
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", "uploads"); // Folder where image will be stored

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await uploadRes.json();
        imageUrl = data.secure_url; // Get the URL of the uploaded image
      } catch (error) {
        console.error("Image upload failed:", error);
        setIsLoading(false);
        return;
      }
    }

    // 🔹 Step 4: Save post to Firestore (if applicable)
    await addDoc(collection(db, "posts"), {
      text: input,
      imageUrl: imageUrl || null,
      timeStamp: serverTimestamp(),
    });

    // Reset state after posting
    setInput("");
    setSelectedFile(null);
    setIsLoading(false);
    setShowEmojis(false);
  };

  const addEmoji = (e: { unified: string }) => {
    const sym: string[] = e.unified.split("_");
    const codesArray: number[] = sym.map((el) => Number("0x" + el)); // Convert to hex-based number
    const emoji = String.fromCodePoint(...codesArray);
    setInput((prev) => prev + emoji); // Preserve previous input state
  };

  const addImageToPost = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setSelectedFile(reader.result as string);
    }
  };

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 ${
        isLoading && "opacity-50"
      }`}
    >
      {session?.user?.image && (

        <Image
          src={session?.user?.image}
          alt="user profile"
          width={40}
          height={40}
          className="h-11 w-11 rounded-full cursor-pointer"
        />
      )}
      <div className=" w-full divide-y divide-gray-700">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            placeholder="What is happening?!"
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
          />
          {selectedFile && (
            <div className="relative w-64 h-64">
              <div
                className="absolute top-1 left-1 px-7 w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-2xl flex items-center justify-center cursor-pointer"
                // onClick={handleEdit}
              >
                <span className="text-white text-xs font-bold">Edit</span>
              </div>

              <div
                className="absolute top-1 right-1  w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XMarkIcon className="text-white h-5" />
              </div>
              {session?.user?.image && (
                <Image
                  src={selectedFile}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-2xl max-h-80 object-contain overflow-hidden"
                />
              )}
            </div>
          )}
        </div>
        {(input.trim() || selectedFile) && (
          <div className="relative flex items-center space-x-1 cursor-pointer py-3">
            <GlobeEuropeAfricaIcon className="h-5 w-5 text-[#1d9bf0]" />
            <span className="text-[#1d9bf0] text-base font-bold">
              Everyone can reply
            </span>
          </div>
        )}
        {!isLoading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="relative flex items-center">
              <div className="icon">
                <PhotoIcon
                  className="h-[22px] text-[#1d9bf0]"
                  onClick={() => filePickerRef.current?.click()}
                />
                <input
                  type="file"
                  hidden
                  onChange={addImageToPost}
                  ref={filePickerRef}
                  accept="image/*"
                />
              </div>
              <div className="icon">
                <GifIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <div className="icon">
                <VariableIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <div className="icon">
                <AdjustmentsHorizontalIcon className="h-[22px] text-[#1d9bf0] opacity-50" />
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <FaceSmileIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
              <div className="icon">
                <CalendarDaysIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <div className="icon">
                <MapPinIcon className="h-[22px] text-[#1d9bf0] opacity-50" />
              </div>

              {showEmojis && (
                <div className="absolute mt-[465px] ml-10 max-w-[320px] rounded-[20px]">
                  <Picker data={data} onEmojiSelect={addEmoji} theme="dark" />
                </div>
              )}
            </div>
            <button
              onClick={sendPost}
              className="bg-white text-black rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#d9d9d9] disabled:hover:bg-[#d9d9d9] disabled:opacity-50 disabled:cursor-default"
              disabled={!input.trim() && !selectedFile}
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
