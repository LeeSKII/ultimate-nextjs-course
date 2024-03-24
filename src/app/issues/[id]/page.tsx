import prisma from "@/lib/prisma";
import { Button } from "@radix-ui/themes";
import { notFound, redirect } from "next/navigation";
import MDPreview from "./MDPreview";
import Link from "next/link";

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
    <div className="flex flex-col gap-3">
      <div className="flex space-x-3">
        <Link href={`/issues/${params.id}/edit`}>
          <Button>Edit</Button>
        </Link>
        <form
          action={async (data: FormData) => {
            "use server";
            await prisma.issue.delete({
              where: {
                id: Number(params.id),
              },
            });
            redirect("/issues");
          }}
        >
          <Button type="submit">Delete</Button>
        </form>
      </div>
      <div className="w-full">
        <div className="text-3xl font-bold my-3">{issue.title}</div>
        <MDPreview value={issue.description}></MDPreview>
      </div>
    </div>
  );
}
