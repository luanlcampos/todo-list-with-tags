import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";
import { ReactNode } from "react";
import { Todo } from "@/components/table/Columns";

type TaskFormModalProps = {
  children: ReactNode;
  isEditing?: boolean;
  task?: Todo;
};

export default function TaskFormModal({
  children,
  isEditing = false,
  task,
}: TaskFormModalProps) {
  return (
    <Dialog>
      <DialogTrigger className="">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-3">
          <DialogTitle>
            {isEditing ? "Edit task" : " Add a new task"}
          </DialogTitle>
        </DialogHeader>
        <TaskForm task={task} isEditing={isEditing} />
      </DialogContent>
    </Dialog>
  );
}
