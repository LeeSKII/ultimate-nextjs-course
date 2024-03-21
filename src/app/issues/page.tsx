"use client";
import React from "react";
import {
  Button,
  TextFieldRoot,
  TextFieldInput,
  TextArea,
} from "@radix-ui/themes";

export default function Page() {
  return (
    <div className="flex flex-col gap-3 w-1/2">
      <TextFieldRoot>
        <TextFieldInput placeholder="Title" />
      </TextFieldRoot>
      <TextArea placeholder="Description" />
      <Button className="w-48">Submit New Issue</Button>
    </div>
  );
}
