import { Tag, getTagOptions } from "./actions";
import { useEffect, useState } from "react";
import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderCircle } from "lucide-react";

type TagSelectProps = {
  onChange: (...event: any[]) => void;
  defaultValue: string;
};

export default function TagSelect({ onChange, defaultValue }: TagSelectProps) {
  const [tagOptions, setTagOptions] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchTagOptions = async () => {
      setIsLoading(true);
      const res = await getTagOptions();
      setTagOptions(res);
      setIsLoading(false);
    };

    fetchTagOptions();
  }, []);

  return (
    <Select
      onValueChange={(e) => onChange(e)}
      defaultValue={defaultValue}
      value={defaultValue}
    >
      <FormControl>
        <SelectTrigger className="w-full text-left">
          <SelectValue placeholder="Select a tag for your task" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {isLoading ? (
          <div className="flex w-full items-center justify-center h-20">
            <LoaderCircle className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          tagOptions.map((tag) => (
            <SelectItem key={tag.id} value={tag.id}>
              <div className="flex items-center gap-x-2">
                <div
                  style={{ backgroundColor: tag.color }}
                  className={`h-4 w-4  rounded-lg border border-zinc-200`}
                />
                {tag.description}
              </div>
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
