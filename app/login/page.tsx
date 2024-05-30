"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./validate";
import { signIn, signUp } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderCircle, OctagonAlert } from "lucide-react";
import { useState } from "react";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (formData: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await signIn(formData);
    setIsLoading(false);
  };

  const handleSignUp = async (formData: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await signUp(formData);
    setIsLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <div className="flex flex-col pb-5 gap-y-2">
        <span className="font-mono text-5xl tracking-widest">todo.</span>
        <span className="font-mono ml-1">
          a better way to create and tag your tasks
        </span>
      </div>
      <Form {...form}>
        {searchParams?.message && (
          <Alert variant={"destructive"}>
            <OctagonAlert className="h-5 w-5" />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{searchParams.message}</AlertDescription>
          </Alert>
        )}

        <form className="animate-in flex flex-col w-full justify-center gap-y-5 text-foreground">
          <FormField
            control={form.control}
            name="email"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} required />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passowrd</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    {...field}
                    required
                    type="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex flex-col gap-y-4 pt-5 relative">
        {isLoading && (
          <div className="absolute flex justify-center items-center w-full h-full bg-black bg-opacity-80 rounded-md">
            <LoaderCircle className="w-6 h-6 animate-spin" />
          </div>
        )}
        <>
          <Button
            onClick={form.handleSubmit(handleSignIn)}
            variant={"default"}
            disabled={!form.formState.isValid || isLoading}
          >
            Sign In
          </Button>

          <Button
            onClick={form.handleSubmit(handleSignUp)}
            variant={"secondary"}
            disabled={!form.formState.isValid || isLoading}
          >
            Sign Up
          </Button>
        </>
      </div>
    </div>
  );
}
