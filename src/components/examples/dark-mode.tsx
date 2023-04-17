import { useEffect } from "react";
import { useDarkMode } from "usehooks-ts";
import { darkTheme } from "theme/stitches.config";

// TODO: expand this to support more than just dark mode
// https://github.com/pacocoursey/next-themes/blob/main/src/index.tsx
const themes = {
  light: "light-theme",
  dark: darkTheme.className,
};

export default function DarkModeToggle() {
  const { isDarkMode, toggle } = useDarkMode();

  useEffect(() => {
    const d = document.documentElement;
    const name = isDarkMode ? themes.dark : themes.light;
    d.classList.remove(themes.dark, themes.light);
    d.classList.add(name);
    d.style.colorScheme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <div>
      <p>Current theme: {isDarkMode ? "dark" : "light"}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
