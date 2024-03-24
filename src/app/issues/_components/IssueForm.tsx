"use client";
import { issueFormSchema } from "@/tools/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Issue } from "@prisma/client";
import {
  Button,
  Select,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import ErrorCallout from "./ErrorCallout";
import Spinner from "./Spinner";

// type IssueForm = {
//   title: string;
//   status?: "OPEN" | "IN_PROGRESS" | "CLOSED";
//   description: string;
// };

//simplified the type of issueFormSchema to make it easier to use
type IssueForm = z.infer<typeof issueFormSchema>;

export default function IssueForm({ issue }: { issue?: Issue }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>({
    defaultValues: issue || { title: "", description: "" },
    // the filed registered here will be validated against the schema
    resolver: zodResolver(issueFormSchema),
  });
  const router = useRouter();

  return (
    <form
      className="space-y-3 max-w-xl"
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
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
      {issue && (
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            // some time the components can't simple received the props deconstructed from field,because the props are may
            // be not the same as the props defined in the component,so we need to use separate the props and pass them to the component
            <Select.Root onValueChange={field.onChange} value={field.value}>
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="OPEN">Open</Select.Item>
                <Select.Item value="IN_PROGRESS">In progress</Select.Item>
                <Select.Item value="CLOSED">Done</Select.Item>
              </Select.Content>
            </Select.Root>
          )}
        ></Controller>
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
