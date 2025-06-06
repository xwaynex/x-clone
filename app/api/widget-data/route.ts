import { NextResponse } from 'next/server';

export async function GET() {
  // Fetch both JSONKeeper URLs server‑side
  const [trendRes, followRes] = await Promise.all([
    fetch('https://www.jsonkeeper.com/b/BFYM'),
    fetch('https://www.jsonkeeper.com/b/KWME'),
  ]);

  const [trendJson, followJson] = await Promise.all([
    trendRes.json(),
    followRes.json(),
  ]);

  // Pull out the arrays you need
  const trending   = trendJson.whats_happening;
  const whoToFollow = followJson.who_to_follow;

  // Return them as one JSON payload
  return NextResponse.json({ trending, whoToFollow });
}
