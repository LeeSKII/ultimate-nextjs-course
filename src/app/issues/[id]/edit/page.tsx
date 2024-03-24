import prisma from "@/lib/prisma";

import IssueForm from "@/app/issues/_components/IssueForm";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });
  if (!issue) {
    notFound();
  }
  return <IssueForm issue={issue} />;
}
