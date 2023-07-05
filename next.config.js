import nextra from "nextra";
import transpileModule from "next-transpile-modules";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

const withTranspileModule = transpileModule(["ahooks"]);

const nextConfig = {};

export default withNextra(withTranspileModule(nextConfig));
