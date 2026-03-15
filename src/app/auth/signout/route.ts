import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const requestUrl = new URL(request.url);
  return NextResponse.redirect(new URL("/login", requestUrl), {
    status: 302,
  });
}

// Support GET for direct links as well
export async function GET(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const requestUrl = new URL(request.url);
  return NextResponse.redirect(new URL("/login", requestUrl), {
    status: 302,
  });
}
