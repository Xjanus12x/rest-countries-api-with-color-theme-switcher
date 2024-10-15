import { createContext, PropsWithChildren, useContext, useState } from "react";

type ThemeContextType = {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

const ThemeContext = createContext<null | ThemeContextType>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme hook must be used inside ThemeProvider");
  }
  return {
    theme: context.theme,
    setTheme: context.setTheme,
  };
}
type ThemeProviderProps = PropsWithChildren;
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
