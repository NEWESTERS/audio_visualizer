import { WINDOW_WIDTH, AUDIO_DATA_LENGTH } from "../constants";
import { makePositive } from "../helpers/math";
import { getColorByKey, DEFAULT_COLOR } from "../helpers/color";

const GROUP_FREQUENCIES = 16,
  BAR_WIDTH = WINDOW_WIDTH * GROUP_FREQUENCIES / AUDIO_DATA_LENGTH;

const BAR_HEIGHT_SCALE = 8;

interface IBarProps {
  size: number,
  offset: number,
  color: string;
}

function drawBar(ctx: CanvasRenderingContext2D, props: IBarProps) {
  const { size, offset, color = DEFAULT_COLOR } = props;

  ctx.beginPath();
  ctx.rect(offset * BAR_WIDTH, 0, BAR_WIDTH, size * BAR_HEIGHT_SCALE);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

let time = 0;

function getTimeOffset() {
  time++;
  return Math.round(time/600);
}

export function drawSpectrum(
  ctx: CanvasRenderingContext2D,
  data: Float32Array
) {
  data.filter((_, index) => index % GROUP_FREQUENCIES === 0).forEach((value, index) => {
    drawBar(ctx, {
      size: makePositive(value),
      offset: index,
      color: getColorByKey(index + getTimeOffset())
    });
  });
}
