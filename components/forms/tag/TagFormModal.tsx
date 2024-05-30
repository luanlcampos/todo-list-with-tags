import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TagForm } from "./TagForm";
import { ReactNode } from "react";

import { Tag } from "../task/actions";

type TagFormModalProps = {
  children: ReactNode;
  isEditing?: boolean;
  tag?: Tag;
};

export default function TagFormModal({
  children,
  isEditing = false,
  tag,
}: TagFormModalProps) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-3">
          <DialogTitle>{isEditing ? "Edit tag" : " Add a new tag"}</DialogTitle>
        </DialogHeader>
        <TagForm tag={tag} isEditing={isEditing} />
      </DialogContent>
    </Dialog>
  );
}
