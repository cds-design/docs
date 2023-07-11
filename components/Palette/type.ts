type Hue = number;
type Saturation = number;
type Lightness = number;

type HSL = [Hue, Saturation, Lightness];

type Red = number;
type Green = number;
type Blue = number;

type RGB = [Red, Green, Blue];

type Hex = string;

type CSS_RGB = `rgb(${Red}, ${Green}, ${Blue})`;
type CSS_HSL = `hsl(${Hue}, ${Saturation}%, ${Lightness}%)`;
type CSS_Hex = `#${Hex}`;

type Category = 'accent' | 'background' | 'foreground';

type AllLightness = {
    [category in Category]: Lightness;
}

type ThemedLightness = {
    light: AllLightness,
    dark: AllLightness,
}

type Palette = {
    hue: Hue,
    saturation: Saturation,
    lightness: AllLightness,
}