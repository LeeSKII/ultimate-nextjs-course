"use client";
import { Button, TextFieldRoot, TextFieldInput } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function Page() {
  return (
    <div className="space-y-3 max-w-xl">
      <TextFieldRoot>
        <TextFieldInput placeholder="Title" />
      </TextFieldRoot>
      <SimpleMDE placeholder="Describe your issue" />
      <Button>Submit New Issue</Button>
    </div>
  );
}
