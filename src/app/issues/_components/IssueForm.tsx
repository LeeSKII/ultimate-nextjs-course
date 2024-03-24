"use client";
import { issueFormSchema } from "@/tools/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextFieldInput, TextFieldRoot } from "@radix-ui/themes";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import ErrorCallout from "./ErrorCallout";
import Spinner from "./Spinner";
import type { Issue } from "@prisma/client";

type IssueForm = {
  title: string;
  description: string;
};

export default function IssueForm({ issue }: { issue?: Issue }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>({
    defaultValues: issue || { title: "", description: "" },
    resolver: zodResolver(issueFormSchema),
  });
  const router = useRouter();

  return (
    <form
      className="space-y-3 max-w-xl"
      onSubmit={handleSubmit(async (data) => {
        let response;
        if (issue) {
          response = await axios.put("/api/issues", { ...data, id: issue.id });
        } else {
          response = await axios.post("/api/issues", data);
        }

        if (response.status === 201 || response.status === 200) {
          router.push("/issues");
          // refresh to invalidate client-side cache
          router.refresh();
        }
      })}
    >
      <TextFieldRoot>
        <TextFieldInput {...register("title")} placeholder="Title" />
      </TextFieldRoot>
      {errors.title?.message && (
        <ErrorCallout>{errors.title?.message}</ErrorCallout>
      )}

      {/* ref={null} to eliminate error: ele.focus is not a function  */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => {
          return <MDEditor height={500} {...field} ref={null} />;
        }}
      />
      {errors.description?.message && (
        <ErrorCallout>{errors.description?.message}</ErrorCallout>
      )}
      {/* This is markdown preview */}
      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}

      <Button disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Spinner></Spinner>
            Submitting...
          </>
        ) : (
          <>{issue ? "Save Changes" : "Submit Issue"}</>
        )}
      </Button>
    </form>
  );
}