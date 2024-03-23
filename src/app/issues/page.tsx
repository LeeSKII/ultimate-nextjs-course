import prisma from "@/lib/prisma";
export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();
  return (
    <>
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
