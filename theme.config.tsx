import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Logo from "./components/Logo";

const config: DocsThemeConfig = {
  logo: <Logo />,
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  head: <>{/* HEAD TAG */}</>,
  primaryHue: {
    dark: 180,
    light: 220,
  },
  project: {
    link: "https://github.com/Continuum-Design-System/CDS",
  },
  chat: {
    link: "https://discord.com",
  },
  faviconGlyph: "C",
  docsRepositoryBase: "https://github.com/Continuum-Design-System/docs",
  footer: {
    text: "Continuum Design System",
  },
};

export default config;
