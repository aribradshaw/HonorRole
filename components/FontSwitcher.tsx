'use client';

import { useEffect, useMemo, useState } from "react";

const FONT_OPTIONS = [
  "Manrope",
  "Inter",
  "Lora",
  "Merriweather",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Source Sans 3",
  "Work Sans",
  "Nunito",
  "DM Sans",
  "Libre Baskerville",
  "Spectral",
  "Crimson Text",
  "PT Serif",
  "Fira Sans",
  "Noto Sans",
  "IBM Plex Sans",
  "Inter Tight",
  "Baskerville",
  "Alegreya",
  "Assistant",
];

const SPECIAL_OPTIONS = [
  "Playfair Display",
  "Cormorant Garamond",
  "EB Garamond",
  "Cinzel",
  "Cinzel Decorative",
  "Bodoni Moda",
  "Italiana",
  "DM Serif Display",
  "Abril Fatface",
  "Prata",
  "Marcellus",
  "Cardo",
  "Cormorant",
  "Unica One",
  "Monoton",
  "Yeseva One",
  "Libre Caslon Display",
  "Zeyada",
  "Forum",
];

type FontValue = {
  body: string;
  display: string;
};

export default function FontSwitcher() {
  const [fonts, setFonts] = useState<FontValue>({
    body: "Manrope",
    display: "Playfair Display",
  });
  const [isOpen, setIsOpen] = useState(true);

  const bodyOptions = useMemo(() => FONT_OPTIONS, []);
  const specialOptions = useMemo(() => SPECIAL_OPTIONS, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--font-body", `"${fonts.body}", "Helvetica Neue", "Helvetica", "Arial", sans-serif`);
    root.style.setProperty("--font-display", `"${fonts.display}", "Times New Roman", serif`);
  }, [fonts]);

  useEffect(() => {
    document.body.classList.add("font-switcher-spacing");
    if (!isOpen) document.body.classList.add("font-switcher-closed");
    return () => {
      document.body.classList.remove("font-switcher-spacing", "font-switcher-closed");
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.remove("font-switcher-closed");
    } else {
      document.body.classList.add("font-switcher-closed");
    }
  }, [isOpen]);

  const handleBodyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFonts((prev) => ({ ...prev, body: e.target.value }));
  };

  const handleSpecialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFonts((prev) => ({ ...prev, display: e.target.value }));
  };

  return (
    <div className="font-switcher-bar">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="font-switcher-tab"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Hide font switcher" : "Show font switcher"}
      >
        {isOpen ? "▼ Hide" : "▲ Font switcher"}
      </button>
      <div
        className="font-switcher-content"
        style={{ maxHeight: isOpen ? "180px" : "0" }}
      >
        <div className="w-full max-w-6xl mx-auto px-4 py-3 text-white">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/70">Font Switcher</p>
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <label className="text-xs uppercase tracking-wider text-white/70">
                Body
                <select
                  value={fonts.body}
                  onChange={handleBodyChange}
                  style={{ fontFamily: `"${fonts.body}", "Helvetica Neue", sans-serif` }}
                  className="mt-2 block w-full md:w-56 rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/40 [&>option]:bg-[#181619]"
                >
                  {bodyOptions.map((font) => (
                    <option key={font} value={font} style={{ fontFamily: `"${font}", "Helvetica Neue", sans-serif` }}>
                      {font}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs uppercase tracking-wider text-white/70">
                Special
                <select
                  value={fonts.display}
                  onChange={handleSpecialChange}
                  style={{ fontFamily: `"${fonts.display}", "Times New Roman", serif` }}
                  className="mt-2 block w-full md:w-56 rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/40 [&>option]:bg-[#181619]"
                >
                  {specialOptions.map((font) => (
                    <option key={font} value={font} style={{ fontFamily: `"${font}", "Times New Roman", serif` }}>
                      {font}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
