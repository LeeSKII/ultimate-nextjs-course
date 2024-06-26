import prisma from "@/lib/prisma";
import type { IssueStatus } from "@prisma/client";
import { Table, Button, Badge } from "@radix-ui/themes";
import Link from "next/link";

type IssueBadgeType = Record<
  IssueStatus,
  { label: string; color: "orange" | "blue" | "red" }
>;

function IssueBadge({ status }: { status: IssueStatus }) {
  const issueBadges: IssueBadgeType = {
    OPEN: {
      label: "Open",
      color: "red",
    },
    IN_PROGRESS: {
      label: "In Progress",
      color: "blue",
    },
    CLOSED: {
      label: "Closed",
      color: "orange",
    },
  };
  return (
    <>
      <Badge color={issueBadges[status].color}>
        {issueBadges[status].label}
      </Badge>
    </>
  );
}

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();
  return (
    <>
      <div className="mb-3 space-x-3">
        <Link href="/issues/new">
          <Button>Add Issue</Button>
        </Link>
        <Link href="/issues/raw-new">
          <Button>Add Use Simple MD</Button>
        </Link>
      </div>

      <Table.Root variant="surface" className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              <span className="md:hidden">Bug Info</span>
              <span className="hidden md:table-cell">Title</span>
            </Table.ColumnHeaderCell>
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
                  <div className="flex justify-between px-3 md:px-0 items-center gap-3">
                    <Link
                      className="text-blue-500 hover:underline hover:text-blue-700"
                      href={`/issues/${issue.id}`}
                    >
                      {issue.title}
                    </Link>
                    <div className="md:hidden">
                      <IssueBadge status={issue.status} />
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueBadge status={issue.status} />
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
