"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./validate";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addTodo } from "./actions";
import TagSelect from "./TagSelect";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Todo } from "@/components/table/Columns";

type TaskFormProps = {
  isEditing?: boolean;
  task?: Todo;
};

export function TaskForm({ isEditing = false, task }: TaskFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: task?.id ?? undefined,
      title: task?.title ?? "",
      tag_id: task?.todo_tags.id ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const { error } = await addTodo(values);

      if (!error) {
        if (isEditing) {
          toast({
            title: "Task was edited",
            description: `The task ${values.title} was edited.`,
          });
        } else {
          toast({
            title: "Task added successfully",
            description: `The task ${values.title} was added to your list.`,
          });
        }
        router.refresh();
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a task title" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tag_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag</FormLabel>
              <TagSelect defaultValue={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <DialogTrigger asChild>
            <Button type="submit" disabled={!form.formState.isValid}>
              {isLoading ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : isEditing ? (
                "Edit"
              ) : (
                "Add"
              )}
            </Button>
          </DialogTrigger>
        </div>
      </form>
    </Form>
  );
}
