"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { Todo } from "@/components/table/Columns";
import { useState } from "react";

type EditTaskFormModalProps = {
  task: Todo;
};

export default function EditTaskFormModal({ task }: EditTaskFormModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen}>
      <DialogTrigger className="flex flex-row items-center">
        <CirclePlus className="mr-2 h-5 w-5" />
        <span className="">Create a task</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
          <TaskForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
