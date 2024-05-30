import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default async function AccountMenu() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger>Hey, {user.email}!</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <form action={signOut}>
              <button className="flex gap-x-2 items-center py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
