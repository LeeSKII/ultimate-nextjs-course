"use client";
import React from "react";
import dynamic from "next/dynamic";

// but some dependencies need to access the other resources on web, so sometime it not work.
import "easymde/dist/easymde.min.css";

export default function Page() {
  // Dynamically import SimpleMDEEditor to avoid SSR issues,because it uses DOM APIs
  const SimpleMDEEditor = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
  });
  return (
    <>
      <SimpleMDEEditor />
    </>
  );
}
