import prisma from "@/lib/prisma";
import { Table, Button } from "@radix-ui/themes";
import Link from "next/link";

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();
  return (
    <>
      <div className="mb-3">
        <Link href="/issues/new">
          <Button>Add Issue</Button>
        </Link>
      </div>

      <Table.Root variant="surface" className="max-w-2xl">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link
                    className="text-blue-500 hover:underline hover:text-blue-700"
                    href={`/issues/${issue.id}`}
                  >
                    {issue.title}
                  </Link>
                  <div className="md:hidden">{issue.status}</div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.status}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
}
