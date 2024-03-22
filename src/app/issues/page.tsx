"use client";
import { Button, TextFieldRoot, TextFieldInput } from "@radix-ui/themes";
import MDEditor from "@uiw/react-md-editor";
import React from "react";

export default function Page() {
  const [value, setValue] = React.useState<string | undefined>(
    "**Hello world!!!**"
  );
  return (
    <div className="space-y-3 max-w-xl">
      <TextFieldRoot>
        <TextFieldInput placeholder="Title" />
      </TextFieldRoot>
      <MDEditor value={value} onChange={setValue} />
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
      <Button>Submit New Issue</Button>
    </div>
  );
}
