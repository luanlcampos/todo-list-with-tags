// app/components/ThemeSwitcher.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {theme === "dark" ? (
        <Button variant="outline" onClick={() => setTheme("light")}>
          <Sun className="w-4 h-4" />
        </Button>
      ) : (
        <Button variant="outline" onClick={() => setTheme("dark")}>
          <Moon className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
