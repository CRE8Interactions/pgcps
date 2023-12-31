import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signUp } from "@/app/lib/data";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5)
})

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });
  const newUser = await signUp({email: body.email,  password: body.password})

  return NextResponse.json({ user: newUser })

}