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

  useEffect(() => {
    // 1. Try to load cached theme from localStorage for instant initial paint
    try {
      const cached = localStorage.getItem("sobjihaat-theme-cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        applyThemeStyles(parsed);
      }
    } catch (e) {
      // Ignore storage errors
    }

    // 2. Fetch latest theme from backend API
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

    fetchTheme();
  }, []);

  const applyThemeStyles = (t: IThemeConfig) => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    if (t.primaryColor) root.style.setProperty("--color-primary", t.primaryColor);
    if (t.secondaryColor) root.style.setProperty("--color-secondary", t.secondaryColor);
    if (t.accentColor) root.style.setProperty("--color-accent", t.accentColor);
    if (t.backgroundColor) root.style.setProperty("--color-background", t.backgroundColor);
    if (t.surfaceColor) root.style.setProperty("--color-surface", t.surfaceColor);
    if (t.textPrimary) root.style.setProperty("--color-text-primary", t.textPrimary);
    if (t.textSecondary) root.style.setProperty("--color-text-secondary", t.textSecondary);
    if (t.textMuted) root.style.setProperty("--color-text-muted", t.textMuted);
    if (t.successColor) root.style.setProperty("--color-success", t.successColor);
    if (t.warningColor) root.style.setProperty("--color-warning", t.warningColor);
    if (t.errorColor) root.style.setProperty("--color-error", t.errorColor);
    
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
        --color-primary: ${t.primaryColor || "#619d23"};
        --color-secondary: ${t.secondaryColor || "#4B5966"};
        --color-accent: ${t.accentColor || "#FF6B6B"};
        --color-background: ${t.backgroundColor || "#FFFFFF"};
        --color-surface: ${t.surfaceColor || "#F8FAFC"};
        --color-text-primary: ${t.textPrimary || "#1E293B"};
        --color-text-secondary: ${t.textSecondary || "#4B5966"};
        --color-text-muted: ${t.textMuted || "#94A3B8"};
        --color-success: ${t.successColor || "#22C55E"};
        --color-warning: ${t.warningColor || "#F59E0B"};
        --color-error: ${t.errorColor || "#EF4444"};
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

  return null;
}
