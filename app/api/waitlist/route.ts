import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const headers = req.headers;
    const user_agent = headers.get("user-agent") ?? null;
    const referrer = headers.get("referer") ?? headers.get("referrer") ?? null;
    const ipHeader =
      headers.get("x-forwarded-for") || headers.get("x-real-ip") || "";
    const ip = ipHeader.split(",")[0]?.trim() || null;

    const { error } = await supabase
      .from("waitlist_signups")
      .upsert(
        { email, ip, user_agent, referrer },
        { onConflict: "email", ignoreDuplicates: true }
      );

    if (error) {
      return NextResponse.json(
        { error: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
