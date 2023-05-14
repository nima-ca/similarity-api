"use client";

import { useTheme } from "next-themes";
import { FunctionComponent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropDownMenu";
import Button from "@/ui/Button";
import { Laptop, Moon, Sun } from "lucide-react";
import { colorModes } from "@src/lib/enum";

const ThemeToggle: FunctionComponent = () => {
  const { setTheme, theme } = useTheme();

  console.log(theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Sun className="rotate-0 scale-100 transition-all hover:text-slate-900 dark:-rotate-90 dark:scale-0 dark:text-slate-400 dark:hover:text-slate-100" />
          <Moon className="absolute rotate-90 scale-0 transition-all hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:text-slate-400 dark:hover:text-slate-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuItem onClick={() => setTheme(colorModes.LIGHT)}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(colorModes.DARK)}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(colorModes.SYSTEM)}>
          <Laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
