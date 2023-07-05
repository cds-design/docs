import Image from "next/image";
import { useTheme } from "nextra-theme-docs";
import colorsImage from "./cds-color.excalidraw.svg";

export default function ColorScheme() {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      src={colorsImage}
      alt="Color Scheme"
      style={{
        filter: `invert(${resolvedTheme === "dark" ? 1 : 0})`,
      }}
    />
  );
}
