export const { floor, random } = Math;

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
