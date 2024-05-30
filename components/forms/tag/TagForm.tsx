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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

import { Tag, addTag } from "./actions";

type TagFormProps = {
  isEditing?: boolean;
  tag?: Tag;
};

export function TagForm({ isEditing = false, tag }: TagFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: tag?.id ?? undefined,
      description: tag?.description ?? "",
      color: tag?.color ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { error } = await addTag(values);

      if (!error) {
        toast({
          title: "Task added successfully",
          description: `The tag ${values.description} was added to your list.`,
        });
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
        <div className="grid grid-cols-6 gap-x-4">
          <div className="col-span-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a tag description"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Input
                  placeholder="Enter a tag color hexcode"
                  {...field}
                  required
                  type="color"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
