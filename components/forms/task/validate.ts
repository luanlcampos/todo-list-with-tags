"use client";

import { z } from "zod";

export const formSchema = z.object({
  id: z.string().uuid().nullish(),
  title: z.string().min(2).max(100),
  tag_id: z.string(),
});
