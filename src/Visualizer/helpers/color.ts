import { random } from "./math";

export const DEFAULT_COLOR = "#FFFFFF";

export enum Color {
    Green = "#5EBD3E",
    Yellow = "#FFB900",
    Orange = "#F78200",
    Red = "#E23838",
    Purple = "#973999",
    Blue = "#009CDF"
};

const COLORS = [
    Color.Green,
    Color.Yellow,
    Color.Orange,
    Color.Red,
    Color.Purple,
    Color.Blue
];

export function getRandomColor() {
    return COLORS[Math.round(random(0, COLORS.length - 1))];
}

export function getColorByKey(key: number) {
    return COLORS[key % 6]
}