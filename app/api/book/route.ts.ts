import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      service,
      branch,
      preferredDate,
      preferredTime,
      message,
    } = body;

    // Validate required fields
    if (!name || !phone || !service || !branch || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Initialize Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check if slot is already taken
    const { data: existingSlot } = await supabase
      .from("blocked_slots")
      .select("id")
      .eq("branch", branch)
      .eq("slot_date", preferredDate)
      .eq("slot_time", preferredTime)
      .single();

    if (existingSlot) {
      return NextResponse.json(
        { error: "This time slot is already booked. Please choose another time." },
        { status: 409 }
      );
    }

    // Save appointment
    const { data: appointment, error: appointmentError } = await supabase
      .from("appointments")
      .insert([
        {
          name,
          phone,
          email: email || null,
          service,
          branch,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          message: message || null,
          status: "confirmed",
        },
      ])
      .select()
      .single();

    if (appointmentError) {
      console.error("Appointment error:", appointmentError);
      throw new Error(appointmentError.message);
    }

    // Block the slot so no double booking
    const { error: slotError } = await supabase
      .from("blocked_slots")
      .insert([
        {
          branch,
          slot_date: preferredDate,
          slot_time: preferredTime,
          appointment_id: appointment.id,
        },
      ]);

    if (slotError) {
      console.error("Slot blocking error:", slotError);
      // Non-critical — appointment still saved
    }

    return NextResponse.json({
      success: true,
      id: appointment.id,
      message: "Booking confirmed successfully!",
    });

  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Booking failed. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
