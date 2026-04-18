import { NextRequest, NextResponse } from "next/server";
import CLINIC_CONFIG from "@/config/clinic.config";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const lastMessage = messages[messages.length - 1];

    // Try gemini-1.5-flash first, fallback to gemini-pro
    const models = ["gemini-1.5-flash", "gemini-pro"];
    
    let message = null;

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `${CLINIC_CONFIG.chatbotSystemPrompt}\n\nUser question: ${lastMessage.content}`,
                    },
                  ],
                },
              ],
              generationConfig: {
                maxOutputTokens: 400,
                temperature: 0.7,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          message =
            data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (message) break;
        }
      } catch {
        continue;
      }
    }

    if (!message) throw new Error("No response from Gemini");

    return NextResponse.json({ message });

  } catch (error) {
    console.error("Chat error:", error);

    // Smart local fallback — answers basic questions without API
    const { messages } = await req.json().catch(() => ({ messages: [] }));
    const userText = messages?.[messages.length - 1]?.content?.toLowerCase() || "";

    let fallback = "I'd love to help! Please call us at +91 98300 00000 or book a consultation online.";

    if (userText.includes("hair") && userText.includes("transplant"))
      fallback = "FUE Hair Transplant starts from ₹40,000 and FUT from ₹35,000 at D'CosMedics. Dr. Dolly Gupta has performed 3,000+ successful procedures. Book a consultation for a personalized assessment!";
    else if (userText.includes("cost") || userText.includes("price") || userText.includes("fee"))
      fallback = "Consultation fee is ₹1,000 (adjustable against treatment). Treatments range from ₹1,800 for peels to ₹40,000+ for hair transplant. Exact pricing is confirmed at consultation.";
    else if (userText.includes("acne") || userText.includes("scar"))
      fallback = "Dr. Gupta specializes in Acne & Scar Treatment from ₹2,500, Chemical Peels from ₹1,800, and Scar Revision from ₹4,000. Results visible in 3–6 sessions!";
    else if (userText.includes("laser"))
      fallback = "We offer Laser Hair Reduction from ₹2,000/session, Tattoo Removal from ₹3,500/session, and CO2 Laser from ₹12,000 — all using FDA-approved technology.";
    else if (userText.includes("book") || userText.includes("appointment"))
      fallback = "You can book directly on this page! Click 'Book a Premium Consultation' or scroll to the booking section. Consultation fee is ₹1,000.";
    else if (userText.includes("location") || userText.includes("address") || userText.includes("where"))
      fallback = "We have two locations: (1) 82A Rash Behari Avenue, Kalighat Metro Gate 4 and (2) BB 97, Salt Lake, near City Centre 1. Both open Mon–Sat 10am–8pm, Sunday 11am–4pm.";
    else if (userText.includes("prp"))
      fallback = "PRP Hair Therapy starts from ₹6,000 and Vampire Facial (PRP) from ₹7,000. Natural, non-surgical treatment using your own growth factors!";
    else if (userText.includes("botox") || userText.includes("filler"))
      fallback = "Botox & Dysport from ₹8,000, Dermal Fillers from ₹15,000, Lip Augmentation from ₹12,000. Dr. Dolly's approach gives natural-looking results!";

    return NextResponse.json({ message: fallback });
  }
}
