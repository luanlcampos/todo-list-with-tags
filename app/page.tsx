import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/table/DataTable";
import { Todo, columns } from "@/components/table/Columns";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

async function getData(): Promise<Todo[]> {
  const supabase = createClient();

  const tasksWithTagsQuery = await supabase
    .from("todos")
    .select(
      "id,created_at,updated_at,title,user_id,done,todo_tags (id, color,description)"
    )
    .order("updated_at", { ascending: false });

  const { data, error } = tasksWithTagsQuery;

  if (error) throw error;

  const tasksWithTags = data;

  return tasksWithTags as any;
}

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  if (isSupabaseConnected) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/login");
    }
  }

  const data = await getData();

  return (
    <div className="flex-1 w-full flex flex-col justify-center items-center gap-y-4">
      <Navbar isSupabaseConnected={isSupabaseConnected} />

      <div className="animate-in flex-1 flex min-w-full justify-center px-3">
        <main className="flex-1 w-full flex gap-6 max-w-4xl">
          <div className="flex flex-col flex-[3] min-h-full border px-8 py-4">
            <h3 className="text-lg font-semibold mb-4">Tasks</h3>
            <DataTable columns={columns} data={data} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
