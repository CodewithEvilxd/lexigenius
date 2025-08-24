import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, type, uid, result, mode = "generate" } = await req.json();

    if (!uid || !result || !type || !prompt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await addDoc(collection(db, "generations"), {
      uid,
      prompt,
      result,
      contentType: type, // ✅ clearer naming
      mode,              // "generate" | "improve"
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Firestore save error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
