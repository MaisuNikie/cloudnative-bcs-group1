"use client";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { themes, Theme } from "@styles/themes/index";

export default function ThemeChanger() {
  const [theme, setTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored && themes.includes(stored)) {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  const handleThemeChange = (t: Theme) => {
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="btn">
        {theme} <span className="ml-2">▾</span>
      </MenuButton>
      <MenuItems className="absolute Padding right-0 focus:outline-none">
        <div className="Wrapper Border flex-col bg-primary">
          {themes.map((t) => (
            <MenuItem key={t}>
              {({ active }) => (
                <button
                  className={`flex Padding ${active ? "bg-secondary text-tx-secondary" : "text-tx-primary"}`}
                  onClick={() => handleThemeChange(t)}
                >
                  {t}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
