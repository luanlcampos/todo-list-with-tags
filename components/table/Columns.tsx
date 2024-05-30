"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Pen, Trash } from "lucide-react";

import { Checkbox } from "../ui/checkbox";
import { updateTodoStatus } from "./actions";

import { useState } from "react";
import DeleteAlertModal from "./DeleteAlertModal";
import { useRouter } from "next/navigation";
import TaskFormModal from "../forms/task/TaskFormModal";

export type Todo = {
  id: string;
  title: string;
  done: boolean;
  todo_tags: {
    id: string;
    color: string;
    description: string;
  };
  created_at: number;
  updated_at: number;
};

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "done",
    header: "Status",
    cell: ({ row }) => {
      const task = row.original;
      const router = useRouter();
      return (
        <div className="flex  items-center  ">
          <Checkbox
            onCheckedChange={async () => {
              await updateTodoStatus({
                id: task.id,
                done: !task.done,
              });
              router.refresh();
            }}
            checked={task.done}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "todo_tags",
    header: "Tag",
    cell: ({ row }) => {
      const task = row.original;
      if (task.todo_tags) {
        const tagColor = task.todo_tags.color;
        return (
          <div
            style={{ backgroundColor: tagColor }}
            className="py-2 px-4 rounded-xl w-fit border border-zinc-200"
          >
            <span>{task.todo_tags.description}</span>
          </div>
        );
      }
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const task = row.original;
      const [open, setOpen] = useState<boolean>(false);

      return (
        <div className="inline-flex">
          <TaskFormModal isEditing task={task}>
            <div className="p-2 rounded-md hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50">
              <span className="sr-only">Edit task</span>
              <Pen className="h-4 w-4" />
            </div>
          </TaskFormModal>
          <DeleteAlertModal entry={task.id} open={open} setOpen={setOpen}>
            <div className="p-2 rounded-md hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50">
              <span className="sr-only">Delete task</span>
              <Trash className="h-4 w-4" />
            </div>
          </DeleteAlertModal>
        </div>
      );
    },
  },
];
