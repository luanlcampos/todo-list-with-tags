"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { formSchema } from "./validate";

export const signIn = async (formData: z.infer<typeof formSchema>) => {
  const { email, password } = formData;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/");
};

export const signUp = async (formData: z.infer<typeof formSchema>) => {
  const { email, password } = formData;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/");
};
