import prisma from "@/lib/prisma";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default async function Home() {
  const issues = await prisma.issue.findMany();
  return (
    <>
      <Link href="/issues/new">
        <Button>Add Issue</Button>
      </Link>
      {issues.map((issue) => {
        return (
          <div key={issue.id}>
            {issue.title}-{issue.description}
          </div>
        );
      })}
    </>
  );
}
