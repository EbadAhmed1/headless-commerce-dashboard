import { createContext } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export type { Theme, ThemeContextType };
