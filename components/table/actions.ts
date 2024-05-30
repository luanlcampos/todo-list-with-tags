"use server";

import { createClient } from "@/utils/supabase/server";

export async function updateTodoStatus(todo: any) {
  "use server";
  const supabase = createClient();

  const res = await supabase.from("todos").update(todo).eq("id", todo.id);
}

export async function deleteTodo(todoId: string) {
  const supabase = createClient();

  const res = await supabase.from("todos").delete().eq("id", todoId);
}
