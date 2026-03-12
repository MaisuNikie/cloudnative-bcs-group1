"use client";
import { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { themesByFamily } from "@styles/themes/themes";

const DEFAULT_THEME = "base16-emil";

export default function ThemeChanger() {
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);
  const [openFamily, setOpenFamily] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const valid = Object.values(themesByFamily)
      .flat()
      .find((t) => t.value === stored);
    const active = valid ? stored! : DEFAULT_THEME;
    setTheme(active);
    document.documentElement.className = active;
  }, []);

  useEffect(() => {
    if (!menuOpen) setOpenFamily(null);
  }, [menuOpen]);

  const handleThemeChange = (value: string) => {
    setTheme(value);
    document.documentElement.className = value;
    localStorage.setItem("theme", value);
  };

  const currentLabel =
    Object.values(themesByFamily)
      .flat()
      .find((t) => t.value === theme)?.label || "Theme";

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => {
        if (open !== menuOpen) setTimeout(() => setMenuOpen(open), 0);
        return (
          <>
            <MenuButton className="btn">
              {currentLabel} <span className="ml-2">▾</span>
            </MenuButton>
            <MenuItems className="Border absolute right-0 focus:outline-none z-50 max-h-96 overflow-y-auto w-56">
              <div className="Wrapper flex-col bg-800">
                {Object.entries(themesByFamily).map(([family, members]) => (
                  <div key={family}>
                    <button
                      className="flex Padding text-200 font-semibold w-full text-left hover:bg-700 whitespace-nowrap"
                      onClick={() => setOpenFamily(openFamily === family ? null : family)}
                    >
                      {family} <span className="ml-auto pl-4">▾</span>
                    </button>
                    {openFamily === family && (
                      <div className="flex flex-col border-l-2 border-600 ml-3">
                        {members.map((t) => (
                          <MenuItem key={t.value}>
                            {({ active }) => (
                              <button
                                className={`flex Padding text-100 whitespace-nowrap ${active || theme === t.value ? "bg-700" : ""}`}
                                onClick={() => handleThemeChange(t.value)}
                              >
                                {t.label}
                              </button>
                            )}
                          </MenuItem>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </MenuItems>
          </>
        );
      }}
    </Menu>
  );
}
