const { random, ceil, round } = Math;

export function HSL2RGB(hue: number, saturation: number, lightness: number) {
    let rgb = [0, 0, 0] as RGB;

    if (typeof window !== 'undefined') {
        const refElem = document.createElement('div');
        refElem.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        let CSS_RGB = refElem.style.color;
        let sep = CSS_RGB.indexOf(",") > -1 ? "," : " ";
        if (rgb) {
            rgb = CSS_RGB.substr(4).split(")")[0].split(sep).map(Number) as RGB;
        }
        refElem.remove();
    }

    return rgb;
}

export const RGB2Hex = (red: Red, green: Green, blue: Blue) =>
    ((red << 16) + (green << 8) + blue).toString(16).padStart(6, '0');

/**
 * 
 * Returns a random Hue value
 * between 0 and 360
 * 
 * @param base 0 ≤ base ≤ 1 - default: a random number
 *  
 */
export function getHue(base = random()): Hue {
    return ceil(base * 360);
}

/**
 * 
 * Returns a random Saturation value
 * between 50 and 100
 * 
 * @param base 0 ≤ base ≤ 1 - default: a random number
 */
export function getSaturation(base = random()): Saturation {
    return ceil(base * 50) + 50; // 50% to 100%
}

/**
 * 
 * Returns a random Lightness value
 * between 0 and 100 depending on the category and isDarkTheme
 * 
 * ### Accent
 * | Theme | min | max |
 * | ----- | --- | --- |
 * | light | 50% | 55% |
 * | dark  | 45% | 50% |
 * ### Foreground
 * | Theme | min | max  |
 * | ----- | --- | ---- |
 * | light |  0% | 10%  |
 * | dark  | 90% | 100% |
 * ### Background
 * | Theme | min | max  |
 * | ----- | --- | ---- |
 * | light | 90% | 100% |
 * | dark  |  0% |  10% |
 * 
 * @param name 
 * @param isForDarkTheme 
 * @param base 
 * @returns 
 */
export function getLightness(name: Category, isForDarkTheme: boolean, base = random()) {
    let min = 0;
    let max = 0;
    switch (name) {
        case 'accent':
            min = isForDarkTheme ? 45 : 50;
            max = isForDarkTheme ? 50 : 55;
            break;

        case 'foreground':
            min = isForDarkTheme ? 90 : 0;
            max = isForDarkTheme ? 100 : 10;
            break;

        case 'background':
            min = isForDarkTheme ? 0 : 90;
            max = isForDarkTheme ? 10 : 100;
            break;
    }

    return ceil(base * (max - min)) + min; // min% to max%
}

export function getAllLightness(base1 = random(), base2 = random(), base3 = random(), isForDarkTheme: boolean): AllLightness {
    return {
        accent: getLightness('accent', isForDarkTheme, base1),
        foreground: getLightness('foreground', isForDarkTheme, base2),
        background: getLightness('background', isForDarkTheme, base3),
    };
}


export function CSSSnippet(hue: Hue, saturation: Saturation, lightness: ThemedLightness) {
    return `body {
    --ct-bg-rgb: ${HSL2RGB(hue, saturation, lightness.light.accent).join(", ")};
    --ct-color-rgb: ${HSL2RGB(hue, saturation, lightness.light.foreground).join(", ")};
    color: rgb(var(--ct-color-rgb));
    background-color: rgb(${HSL2RGB(hue, saturation, lightness.light.background).join(", ")});
  }
  @media (prefers-color-scheme: dark) {
    body {
      --ct-bg-rgb: ${HSL2RGB(hue, saturation, lightness.dark.accent).join(", ")};
      --ct-color-rgb: ${HSL2RGB(hue, saturation, lightness.dark.foreground).join(", ")};
      color: rgb(var(--ct-color-rgb));
      background-color: rgb(${HSL2RGB(hue, saturation, lightness.dark.background).join(", ")});
    }
  }`
}