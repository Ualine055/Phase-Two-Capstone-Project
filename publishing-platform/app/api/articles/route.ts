import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.title || !data.content) {
      return NextResponse.json({ success: false, message: "Title and content are required" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "articles"), {
      title: data.title,
      excerpt: data.excerpt || "",
      content: data.content,
      tags: data.tags || [],
      status: data.status || "draft",
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err) {
    console.error("Error saving article:", err);
    return NextResponse.json({ success: false, message: "Failed to save article" }, { status: 500 });
  }
}
