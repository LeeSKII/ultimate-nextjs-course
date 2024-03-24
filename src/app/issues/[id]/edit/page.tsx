import prisma from "@/lib/prisma";

import IssueForm from "@/app/issues/_components/IssueForm";

export default async function Page({ params }: { params: { id: string } }) {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });
  return <IssueForm issue={issue} />;
}
