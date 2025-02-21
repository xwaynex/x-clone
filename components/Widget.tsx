import type { Session } from "next-auth";

type WidgetProps = {
  trendingResults: any; // Replace 'any' with actual type
  followResults: any;
  session: Session | null;
};

export default function Widget({ trendingResults, followResults }: WidgetProps) {
  return (
    <div>
      <h2>Trending</h2>
      {/* Render trending results */}
      
      <h2>Who to follow</h2>
      {/* Render follow results */}
      
      </div>
  );
}
