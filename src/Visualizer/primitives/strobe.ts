import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../constants";
import { DEFAULT_COLOR } from "../helpers/color";

const MIN_VALUE = -130,
    MAX_VALUE = -40,
    MIDDLE_VALUE = (MIN_VALUE + MAX_VALUE) / 2;

function interpolateToOpacity(value: number) {
    if(value > MIDDLE_VALUE) {
        return (value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE);
    } else {
        return 0;
    }
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