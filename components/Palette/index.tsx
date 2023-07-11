import { useMount, useBoolean } from "ahooks";
import load from "cds-design";
import { Code, CopyToClipboard, Pre } from "nextra/components";
import { CSSSnippet, HSL2RGB, RGB2Hex } from "./helpers";
import { usePalette } from "./hook";
import styles from "./palette.module.css";

const { random } = Math;

load("slider", "toggle", "button")

type SliderProps = {
    label: string;
    value: number;
    setter: (value: number) => void;
}
function Slider({
    label,
    value,
    setter,
}: SliderProps) {
    const id = label.toLowerCase().split(" ").join("-");

    return (
        <label htmlFor={id} className={styles.slider}>
            {label}
            <cds-slider
                id={id}
                min={0}
                max={1}
                step={0.01}
                value={value}
                onInput={(event) => setter(Number(event.currentTarget.value))}
            />
        </label>
    )
}

type ControlsProps = {
    palette: ReturnType<typeof usePalette>;
};

function Controls({
    palette
}: ControlsProps) {

    function randomize() {
        palette.base = {
            hue: random(),
            saturation: random(),
            lightness: {
                accent: random(),
                foreground: random(),
                background: random(),
            }
        }
    }

    function setBase(property: string, category?: Category) {
        return (value: number) => {
            if (category === undefined) {
                palette.base = {
                    ...palette.base,
                    [property]: value,
                }
            } else {
                palette.base = {
                    ...palette.base,
                    lightness: {
                        ...palette.base.lightness,
                        [category]: value,
                    }
                }
            }
        }
    }

    useMount(randomize);

    return (
        <div className={styles.controls}>
            <div className={styles.sliders}>
                <Slider
                    label="Hue"
                    value={palette.base.hue}
                    setter={setBase("hue")}
                />
                <Slider
                    label="Saturation"
                    value={palette.base.saturation}
                    setter={setBase("saturation")}
                />
                <details>
                    <summary>Advanced Lightness</summary>
                    <Slider
                        label="Accent"
                        value={palette.base.lightness.accent}
                        setter={setBase("lightness", 'accent')}
                    />
                    <Slider
                        label="Foreground"
                        value={palette.base.lightness.foreground}
                        setter={setBase("lightness", 'foreground')}
                    />
                    <Slider
                        label="Background"
                        value={palette.base.lightness.background}
                        setter={setBase("lightness", 'background')}
                    />
                </details>
            </div>
            <div className={styles.otherControls}>
                <label htmlFor="dark">
                    Dark Theme
                    <cds-toggle
                        toggled={palette.isForDarkTheme}
                        onInput={(event) => {
                            palette.isForDarkTheme = event.currentTarget.toggled;
                        }}
                    />
                </label>
                <cds-button onClick={randomize}>Randomize</cds-button>
            </div>
        </div>
    )
}

type SwatchesProp = {
    palette: ReturnType<typeof usePalette>;
};

function Swatches({ palette }: SwatchesProp) {
    return (
        <div className={styles.swatches}>
            {
                Object.entries(palette.lightness).map(([key, lightness]) => {
                    const hexCode = `#${RGB2Hex(...HSL2RGB(palette.hue, palette.saturation, lightness))}`;
                    return (
                        <div
                            className={styles.swatch}
                            style={{
                                backgroundColor: `hsl(${palette.hue}, ${palette.saturation}%, ${lightness}%)`,
                            }}
                        >
                            <span>
                                {key}

                                <Code className={styles.code}>
                                    {hexCode}
                                    <CopyToClipboard getValue={() => hexCode} />
                                </Code>
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default function Palette() {
    const palette = usePalette();

    const CSS_Code = CSSSnippet(palette.hue, palette.saturation, palette.themedLightness);

    return (
        <>
            <Controls palette={palette} />
            <Swatches palette={palette} />
            <Pre>
                <Code className={styles.cssSnippet}>
                    {CSS_Code}
                    <CopyToClipboard getValue={() => CSS_Code} />
                </Code>
            </Pre>
        </>
    )
}