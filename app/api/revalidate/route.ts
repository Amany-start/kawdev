import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { secret } = await request.json();
  if (secret !== "kawdev2026") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  revalidatePath("/");
  return NextResponse.json({ revalidated: true });
}
