import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

import { issueFormSchema } from "@/tools/validate";
import { revalidatePath } from "next/cache";

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
  revalidatePath("/issues");
  return NextResponse.json(issueCreated, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const validate = issueFormSchema.safeParse(body);
  if (!validate.success) {
    return NextResponse.json(validate.error.errors, { status: 400 });
  }
  const title = body.title;
  const description = body.description;
  const status = body.status;
  const id = body.id;
  const issueCreated = await prismaClient.issue.update({
    data: {
      title,
      description,
      status,
    },
    where: {
      id: id,
    },
  });
  revalidatePath("/issues");
  return NextResponse.json(issueCreated, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get("id"));
  console.log(id);
  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }
  const issueDeleted = await prismaClient.issue.delete({ where: { id: id } });
  if (!issueDeleted) {
    return NextResponse.json({ message: "issue not found" }, { status: 404 });
  }
  revalidatePath("/issues");
  return NextResponse.json(issueDeleted, { status: 200 });
}
