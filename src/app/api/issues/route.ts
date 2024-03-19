import { NextRequest, NextResponse } from "next/server";
import zod from "zod";
import prismaClient from "@/lib/prisma";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const schema = zod.object({
    title: zod.string().min(1).max(255),
    description: zod.string().min(1),
  });
  const validate = schema.safeParse(body);
  if (!validate.success) {
    return NextResponse.json(validate.error.errors, { status: 400 });
  }
  const title = body.title;
  const description = body.description;
  const issueCreated = await prismaClient.issue.create({
    data: {
      title,
      description,
    },
  });
  return NextResponse.json(issueCreated, { status: 201 });
}
