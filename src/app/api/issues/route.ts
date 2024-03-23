import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

import { issueFormSchema } from "@/tools/validate";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validate = issueFormSchema.safeParse(body);
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
