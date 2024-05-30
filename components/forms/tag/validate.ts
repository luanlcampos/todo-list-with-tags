"use client";

import { z } from "zod";

// regex pattern for hex color code
// Example usage
// "#AABBCC" => Valid
// "#AABBCCDD" => Valid
// "#GGHHII" => Invalid
// "123456");  => In valid
const hexColorPattern = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

export const formSchema = z.object({
  id: z.string().uuid().nullish(),
  color: z.string().regex(hexColorPattern),
  description: z.string().min(2).max(20),
});
