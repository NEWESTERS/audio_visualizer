import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../constants";
import { random } from "./math";

export interface IPoint {
    x: number;
    y: number;
}

export function getRandomPosition(): IPoint {
    return {
        x: random(0, WINDOW_WIDTH),
        y: random(0, WINDOW_HEIGHT)
    }
}