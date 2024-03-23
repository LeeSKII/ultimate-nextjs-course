"use client";
import { Button, TextFieldRoot, TextFieldInput } from "@radix-ui/themes";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { issueFormSchema } from "@/tools/validate";

type IssueForm = {
  title: string;
  description: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueFormSchema),
  });
  const router = useRouter();

  return (
    <form
      className="space-y-3 max-w-xl"
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        const response = await axios.post("/api/issues", data);
        if (response.status === 201) {
          router.push("/issues");
          // refresh to invalidate client-side cache
          router.refresh();
        }
      })}
    >
      <TextFieldRoot>
        <TextFieldInput {...register("title")} placeholder="Title" />
      </TextFieldRoot>
      {errors.title?.message && <p>{errors.title?.message}</p>}

      {/* ref={null} to eliminate error: ele.focus is not a function  */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => {
          return <MDEditor {...field} ref={null} />;
        }}
      />
      {errors.description?.message && <p>{errors.description?.message}</p>}
      {/* This is markdown preview */}
      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}

      <Button>Submit New Issue</Button>
    </form>
  );
}
