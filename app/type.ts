import type { Session } from "next-auth";
import { Timestamp } from "firebase/firestore";


export interface SidebarLinkProps {
  Icon: React.ElementType;
  text: string;
  active?: boolean;
}

export interface  WidgetProps  {
  trendingResults: unknown; 
  followResults: unknown;
  session: Session | null;
};

export interface PostData {
  id: string;
  imageUrl: string;
  tag: string;
  text: string;
  body: string;
  userImg: string;
  username: string;
  timeStamp: Timestamp;
  // …other fields
}

export type PostProps = {
  post: PostData;
  id: string;
  postPage?: boolean; // optional if not always passed
};