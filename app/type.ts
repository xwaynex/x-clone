import type { Session } from "next-auth";

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