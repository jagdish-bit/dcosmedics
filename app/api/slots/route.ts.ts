import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const branch = searchParams.get("branch");
    const date = searchParams.get("date");

    if (!branch || !date) {
      return NextResponse.json({ bookedSlots: [] });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Get all booked slots for this branch and date
    const { data, error } = await supabase
      .from("blocked_slots")
      .select("slot_time")
      .eq("branch", branch)
      .eq("slot_date", date);

    if (error) {
      console.error("Slots error:", error);
      return NextResponse.json({ bookedSlots: [] });
    }

    const bookedSlots = data?.map((s) => s.slot_time) || [];

    return NextResponse.json({ bookedSlots });

  } catch (error) {
    console.error("Slots route error:", error);
    return NextResponse.json({ bookedSlots: [] });
  }
}
