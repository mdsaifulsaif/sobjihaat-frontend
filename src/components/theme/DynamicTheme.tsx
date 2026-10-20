"use client";

import React, { useEffect, useState } from "react";

export interface IThemeConfig {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  surfaceColor?: string;
  textPrimary?: string;
  textSecondary?: string;
  textMuted?: string;
  successColor?: string;
  warningColor?: string;
  errorColor?: string;
  fontFamily?: string;
  headingFont?: string;
  darkMode?: boolean;
}

export const loadGoogleFont = (fontFamilyStr?: string) => {
  if (typeof window === "undefined" || !fontFamilyStr) return;
  const cleanName = fontFamilyStr.split(",")[0].replace(/['"]/g, "").trim();
  if (
    !cleanName ||
    cleanName.toLowerCase() === "sans-serif" ||
    cleanName.toLowerCase() === "serif" ||
    cleanName.toLowerCase() === "monospace"
  ) {
    return;
  }

  const fontId = `dynamic-google-font-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
  if (document.getElementById(fontId)) return;

  const link = document.createElement("link");
  link.id = fontId;
  link.rel = "stylesheet";
  const formattedName = cleanName.replace(/\s+/g, "+");
  link.href = `https://fonts.googleapis.com/css2?family=${formattedName}:wght@300;400;500;600;700;800&display=swap`;
  document.head.appendChild(link);
};

export default function DynamicTheme() {
  const [theme, setTheme] = useState<IThemeConfig | null>(null);

  const applyThemeStyles = (t: IThemeConfig) => {
    if (typeof window === "undefined" || !t) return;

    const root = document.documentElement;
    const prim = t.primaryColor || "#619d23";
    const sec = t.secondaryColor || "#4B5966";
    const acc = t.accentColor || "#FF6B6B";
    const bg = t.backgroundColor || "#FFFFFF";
    const surf = t.surfaceColor || "#F8FAFC";
    const tp = t.textPrimary || "#1E293B";
    const ts = t.textSecondary || "#4B5966";
    const tm = t.textMuted || "#94A3B8";
    const sc = t.successColor || "#22C55E";
    const wc = t.warningColor || "#F59E0B";
    const ec = t.errorColor || "#EF4444";

    // Set directly on root style
    root.style.setProperty("--color-primary", prim);
    root.style.setProperty("--theme-primary", prim);
    root.style.setProperty("--color-secondary", sec);
    root.style.setProperty("--theme-secondary", sec);
    root.style.setProperty("--color-accent", acc);
    root.style.setProperty("--theme-accent", acc);
    root.style.setProperty("--color-background", bg);
    root.style.setProperty("--color-surface", surf);
    root.style.setProperty("--theme-surface", surf);
    root.style.setProperty("--color-text-primary", tp);
    root.style.setProperty("--theme-text-primary", tp);
    root.style.setProperty("--color-text-secondary", ts);
    root.style.setProperty("--theme-text-secondary", ts);
    root.style.setProperty("--color-text-muted", tm);
    root.style.setProperty("--theme-text-muted", tm);
    root.style.setProperty("--color-success", sc);
    root.style.setProperty("--color-warning", wc);
    root.style.setProperty("--color-error", ec);

    // Typography
    if (t.fontFamily) {
      loadGoogleFont(t.fontFamily);
      root.style.setProperty("--font-family", t.fontFamily);
    }
    if (t.headingFont) {
      loadGoogleFont(t.headingFont);
      root.style.setProperty("--font-heading", t.headingFont);
    }

    // Inject dynamic stylesheet for utility classes and overrides
    const styleId = "dynamic-storefront-theme";
    let styleTag = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const appliedFont = t.fontFamily || "'Poppins', sans-serif";
    const appliedHeading = t.headingFont || appliedFont;

    styleTag.innerHTML = `
      :root {
        --color-primary: ${prim};
        --theme-primary: ${prim};
        --color-secondary: ${sec};
        --theme-secondary: ${sec};
        --color-accent: ${acc};
        --theme-accent: ${acc};
        --color-background: ${bg};
        --color-surface: ${surf};
        --theme-surface: ${surf};
        --color-text-primary: ${tp};
        --theme-text-primary: ${tp};
        --color-text-secondary: ${ts};
        --theme-text-secondary: ${ts};
        --color-text-muted: ${tm};
        --theme-text-muted: ${tm};
        --color-success: ${sc};
        --color-warning: ${wc};
        --color-error: ${ec};
        --font-family: ${appliedFont};
        --font-heading: ${appliedHeading};
      }
      
      html, body, button, input, select, textarea {
        font-family: ${appliedFont} !important;
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: ${appliedHeading} !important;
      }

      .bg-primary { background-color: var(--color-primary) !important; }
      .text-primary { color: var(--color-primary) !important; }
      .border-primary { border-color: var(--color-primary) !important; }
      .fill-primary { fill: var(--color-primary) !important; }
      .stroke-primary { stroke: var(--color-primary) !important; }
      .hover-bg-primary:hover { background-color: var(--color-primary) !important; }
      .hover-text-primary:hover { color: var(--color-primary) !important; }
      .hover-border-primary:hover { border-color: var(--color-primary) !important; }
      
      .btn-primary {
        background-color: var(--color-primary) !important;
        color: #ffffff !important;
      }
      .btn-primary:hover {
        filter: brightness(0.92);
      }
      
      .btn-accent {
        background-color: var(--color-accent) !important;
        color: #ffffff !important;
      }
      .btn-accent:hover {
        filter: brightness(0.92);
      }
      
      .bg-primary-light {
        background-color: color-mix(in srgb, var(--color-primary) 12%, white) !important;
      }
    `;
  };

  const fetchTheme = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";
      const res = await fetch(`${apiUrl}/settings/theme`, {
        cache: "no-store",
      });
      const json = await res.json();
      if (json.success && json.data) {
        setTheme(json.data);
        applyThemeStyles(json.data);
        try {
          localStorage.setItem("sobjihaat-theme-cache", JSON.stringify(json.data));
        } catch (e) {}
      }
    } catch (err) {
      console.warn("[Theme] Could not fetch dynamic theme:", err);
    }
  };

  useEffect(() => {
    // 1. Instant paint from cache
    try {
      const cached = localStorage.getItem("sobjihaat-theme-cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        applyThemeStyles(parsed);
      }
    } catch (e) {}

    // 2. Fetch fresh theme from server
    fetchTheme();

    // 3. Listen to window focus or visibility change to immediately sync changes made in admin
    const handleRecheck = () => {
      fetchTheme();
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "sobjihaat-theme-cache" && e.newValue) {
        try {
          applyThemeStyles(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };

    window.addEventListener("focus", handleRecheck);
    document.addEventListener("visibilitychange", handleRecheck);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("focus", handleRecheck);
      document.removeEventListener("visibilitychange", handleRecheck);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return null;
}
