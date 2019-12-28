import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../constants";
import { DEFAULT_COLOR } from "../helpers/color";

const MAX_VALUE = 80

function interpolateToOpacity(value: number) {
    return value / MAX_VALUE;
}

export function drawStrobe(ctx: CanvasRenderingContext2D, value: number) {
    ctx.beginPath();
    ctx.globalAlpha = interpolateToOpacity(value);
    ctx.rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    ctx.fillStyle = DEFAULT_COLOR;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.closePath();
}