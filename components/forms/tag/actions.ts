"use server";

import { createClient } from "@/utils/supabase/server";

export async function addTag(tag: any) {
  "use server";
  const supabase = createClient();
  const res = await supabase.from("todo_tags").upsert(tag);
  return res;
}

export type Tag = {
  id: string;
  created_at: string;
  color: string;
  description: string;
  user_id: string;
};

export async function getTagOptions(): Promise<Tag[]> {
  const supabase = createClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  const { data, error } = await supabase
    .from("todo_tags")
    .select()
    .eq("user_id", userId);
  return data as Tag[];
}
