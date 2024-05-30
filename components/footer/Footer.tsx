import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex flex-col gap-y-2 justify-center text-center text-xs">
      <Link
        href="https://github.com/luanlcampos/todo-list-with-tags"
        target="_blank"
      >
        <Button variant={"link"} className="inline-flex gap-x-2 items-center">
          <span className="">Github project repo</span>
          <ExternalLink className="w-4 h-4" />
        </Button>
      </Link>

      <span className="text-md">
        &copy; {new Date().getFullYear()} Luan Lima Campos. All rights reserved
      </span>
    </footer>
  );
}
