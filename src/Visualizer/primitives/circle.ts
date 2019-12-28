import { WINDOW_CENTER } from "../constants";
import { DEFAULT_COLOR } from "../helpers/color";

const DATA_SCALE = 5;

interface ICircleProps {
    x: number;
    y: number;
    radius: number;
    color: string;
    opacity?: number;
}

export function drawCircle(ctx: CanvasRenderingContext2D, props: ICircleProps) {
    const { x, y, radius, color, opacity = 1 } = props;

    ctx.beginPath();
    ctx.globalAlpha = opacity;
    ctx.ellipse(x, y, radius, radius, 0, 0, 360);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.closePath();
}

export function drawMiddleCircle(
    ctx: CanvasRenderingContext2D,
    radius: number
) {
    drawCircle(ctx, {
        x: WINDOW_CENTER.X,
        y: WINDOW_CENTER.Y,
        radius: radius * DATA_SCALE,
        color: DEFAULT_COLOR
    });
}
