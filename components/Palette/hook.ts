import { getAllLightness, getHue, getSaturation } from "./helpers"
import { useReactive } from "ahooks";

const { random } = Math;

export const usePalette = () => {
    const palette = useReactive<{
        base: Palette,
        isForDarkTheme: boolean,
        hue: Hue,
        saturation: Saturation,
        lightness: AllLightness,
        themedLightness: ThemedLightness,
    }>({
        base: {
            hue: random(),
            saturation: random(),
            lightness: {
                accent: random(),
                foreground: random(),
                background: random(),
            }
        },
        isForDarkTheme: false,
        get hue() {
            return getHue(this.base.hue);
        },
        get saturation() {
            return getSaturation(this.base.saturation);
        },
        get lightness() {
            return getAllLightness(
                this.base.lightness.accent,
                this.base.lightness.foreground,
                this.base.lightness.background,
                this.isForDarkTheme
            );
        },
        get themedLightness() {
            return {
                light: getAllLightness(
                    this.base.lightness.accent,
                    this.base.lightness.foreground,
                    this.base.lightness.background,
                    false
                ),
                dark: getAllLightness(
                    this.base.lightness.accent,
                    this.base.lightness.foreground,
                    this.base.lightness.background,
                    true
                ),
            }
        },
    })

    return palette;
}