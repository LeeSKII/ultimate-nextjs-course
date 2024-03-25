"use client";
import React from "react";
import { Button, AlertDialog, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteButton({ issueId }: { issueId: number }) {
  const router = useRouter();
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content size={"3"}>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This behavior is irreversible.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={async () => {
                  const response = await axios.delete(
                    "/api/issues/?id=" + issueId
                  );
                  if (response.status === 200) {
                    router.push("/issues");
                    router.refresh();
                  }
                }}
              >
                Confirm
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
