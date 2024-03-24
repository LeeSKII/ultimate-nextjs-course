import { Callout } from "@radix-ui/themes";
import React from "react";
import { AiTwotoneFrown } from "react-icons/ai";

export default function ErrorCallout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Callout.Root>
      <Callout.Icon>
        <AiTwotoneFrown />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
}
