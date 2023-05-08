import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Logo from "./components/Logo";

const config: DocsThemeConfig = {
  logo: <Logo />,
  sidebar: {
    toggleButton: true,
  },
  head: (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&text=CDS&display=swap"
        rel="stylesheet"
      />
    </>
  ),
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