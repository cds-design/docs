import { useEffect, useState } from "react";
import { useHSL } from "./hooks";
import { load } from "cds-design";
import styles from "./palette.module.css";
import { randomHue, randomize } from "./helpers";
import { useMount } from "ahooks";

load("button", "slider", "toggle");

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

  function handleHueChange(e: React.ChangeEvent<any>) {
    const newHue = Number(e.target.value);
    setAccent.H(newHue);
    setForeground.H(newHue);
    setBackground.H(newHue);
  }

  useMount($randomize);

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
