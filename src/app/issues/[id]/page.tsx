import prisma from "@/lib/prisma";

import { notFound } from "next/navigation";
import MDPreview from "./MDPreview";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  if (!issue) {
    notFound();
  }
  return (
    <>
      <div className="text-3xl font-bold my-3">{issue.title}</div>
      <MDPreview value={issue.description}></MDPreview>
    </>
  );
}
