export const { floor, random, round } = Math;

/*
* hue 0 - 360
* saturation 50% - 100%
* lightness 
    accent =>
            light -> 50% to 55%
            dark -> 45% to 50%
    foreground => 
            light -> 0% to 10%
            dark -> 90% to 100%
    background =>
            light -> 90% to 100%
            dark -> 0% to 10%
*/

export function randomHue() {
  return floor(random() * 361); // 0 - 360
}

export function randomSaturation() {
  return floor(random() * 51) + 50; // (0..50) + 50 = (50..100)
}

type Type = "accent" | "foreground" | "background";

export function randomLightness(type: Type, isDarkTheme = false) {
  switch (type) {
    case "accent":
      return isDarkTheme
        ? floor(random() * 6) + 45 // (0..5) + 45 = (45..50)
        : floor(random() * 6) + 50; // (0..5) + 50 = (50..55)

    case "foreground":
      return isDarkTheme
        ? floor(random() * 11) // (0..10)
        : floor(random() * 11) + 90; // (0..10) + 90 = (90..100)

    case "background":
      return isDarkTheme
        ? floor(random() * 11) + 90 // (0..10) + 90 = (90..100)
        : floor(random() * 11); // (0..10)
  }
}

export const randomize = (forDarkTheme: boolean) => ({
  accent(h: number): [number, number, number] {
    return [h, randomSaturation(), randomLightness("accent", forDarkTheme)];
  },
  foreground(h: number): [number, number, number] {
    return [h, 100, randomLightness("foreground", forDarkTheme)];
  },
  background(h: number): [number, number, number] {
    return [h, 100, randomLightness("background", forDarkTheme)];
  },
});


export function HSL2RGB(h: number, s: number, l: number): [number, number, number] {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = Hue2RGB(p, q, h + 1 / 3);
    g = Hue2RGB(p, q, h);
    b = Hue2RGB(p, q, h - 1 / 3);
  }

  return [round(r * 255), round(g * 255), round(b * 255)];
}

function Hue2RGB(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

export function HSL2Hex(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

type RGB = [number, number, number];

type dynamicRGB = {
  light: RGB;
  dark: RGB;
}

export function CSSSnippet(accentRGB: dynamicRGB, fgRGB: dynamicRGB, bgRGB: dynamicRGB) {
  return `
  body {
    --ct-bg-rgb: ${accentRGB.light.join(", ")};
    --ct-color-rgb: ${fgRGB.dark.join(", ")};
    color: rgb(var(--ct-color-rgb));
    background-color: rgb(${bgRGB.light.join(", ")});
  }
  @media (prefers-color-scheme: dark) {
    body {
      --ct-bg-rgb: ${fgRGB.dark.join(", ")};
      --ct-color-rgb: ${accentRGB.dark.join(", ")};
      color: rgb(var(--ct-color-rgb));
      background-color: rgb(${bgRGB.dark.join(", ")});
    }
  }
  `
}

