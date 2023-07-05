import { useEffect, useMemo, useRef, useState } from "react";
import { useHSL } from "./hook";
import { load } from "cds-design";
import styles from "./palette.module.css";
import Slider from "cds-design/types/components/slider";

load("button", "slider", "toggle");

const { floor, random } = Math;

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

function randomHue() {
  return floor(random() * 361); // 0 - 360
}

function randomSaturation() {
  return floor(random() * 51) + 50; // (0..50) + 50 = (50..100)
}

type Type = "accent" | "foreground" | "background";

function randomLightness(type: Type, isDarkTheme = false) {
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

const randomize = (forDarkTheme: boolean) => ({
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

export default function Palette() {
  const [forDarkTheme, setForDarkTheme] = useState(true);

  const [foreground, setForeground] = useHSL(0, 0, 0);
  const [background, setBackground] = useHSL(0, 100, 0);
  const [accent, setAccent] = useHSL(0, 100, 0);

  function $randomize() {
    const H = randomHue();
    setAccent.HSL(randomize(forDarkTheme).accent(H));
    setForeground.HSL(randomize(forDarkTheme).foreground(H));
    setBackground.HSL(randomize(forDarkTheme).background(H));
  }

  function handleHueChange(e: React.ChangeEvent<Slider>) {
    const newHue = Number(e.target.value);
    setAccent.H(newHue);
    setForeground.H(newHue);
    setBackground.H(newHue);
  }

  useEffect($randomize, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.controls}>
          <label htmlFor="theme">
            Dark Theme
            <cds-toggle
              id="theme"
              toggled={forDarkTheme}
              onInput={(event) => {
                // @ts-ignore
                setForDarkTheme(event.target.toggled);
                $randomize();
              }}
            />
          </label>
          <label htmlFor="hue">
            Hue
            <cds-slider
              id="hue"
              min={0}
              max={360}
              value={accent.h}
              onInput={handleHueChange}
            />
          </label>
        </div>

        <cds-button className={styles.button} onClick={$randomize}>
          Randomize
        </cds-button>
      </div>
      <div className={styles.swatches}>
        <div
          style={{
            backgroundColor: `hsl(${accent.h}, ${accent.s}%, ${accent.l}%)`,
          }}
          className={styles.swatch}
        >
          <span>Accent</span>
        </div>
        <div
          style={{
            backgroundColor: `hsl(${foreground.h}, ${foreground.s}%, ${foreground.l}%)`,
          }}
          className={styles.swatch}
        >
          <span>Foreground</span>
        </div>
        <div
          style={{
            backgroundColor: `hsl(${background.h}, ${background.s}%, ${background.l}%)`,
          }}
          className={styles.swatch}
        >
          <span>Background</span>
        </div>
      </div>
    </div>
  );
}
