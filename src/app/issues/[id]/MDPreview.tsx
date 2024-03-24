"use client";
import MDEditor from "@uiw/react-md-editor";

export default function MDPreview({ value }: { value: string }) {
  return (
    <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
  );
}
