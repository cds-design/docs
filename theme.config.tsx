import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Logo from "./components/Logo";

const config: DocsThemeConfig = {
  logo: <Logo />,
  useNextSeoProps() {
    return {
      titleTemplate: '%s - CDS',
    }
  },
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
    link: "https://github.com/cds-design/CDS",
  },
  // chat: {
  //   link: "https://discord.com",
  // },
  faviconGlyph: "C",
  docsRepositoryBase: "https://github.com/cds-design/docs",
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://github.com/ve-r-ve" target="_blank">
          Verve
        </a>
        .
      </span>
    )
  }
};

export default config;
