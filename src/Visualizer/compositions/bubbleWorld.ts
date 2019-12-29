import { drawCircle } from "../primitives/circle";
import { getRandomPosition, IPoint } from "../helpers/position";
import { makePositive, random } from "../helpers/math";
import { getRandomColor, DEFAULT_COLOR } from "../helpers/color";

const REPOSITION_FREQUENCY = 2;
const BUBBLE_COUNT = 30;
const LIFECYCLE_LENGTH = REPOSITION_FREQUENCY * BUBBLE_COUNT;
let CIRCLE_COORDS = randomizeCoords();

interface IScaledPoint extends IPoint {
    scaleMultiplier: number;
    color: string;
}

function randomizeCoords(): IScaledPoint[] {
    let array: IScaledPoint[] = [];

    for (let i = 0; i < BUBBLE_COUNT; i++) {
        array.push({
            ...getRandomPosition(),
            scaleMultiplier: random(1, 5),
            color: getRandomColor()
        });
    }

    return array;
}

let time = 0;

function update() {
    if(time === LIFECYCLE_LENGTH) {
        time = 0;
    } else {
        time++
    }

    if(time % REPOSITION_FREQUENCY === 0) {
        CIRCLE_COORDS[time / REPOSITION_FREQUENCY] = {
            ...getRandomPosition(),
            scaleMultiplier: random(1, 5),
            color: getRandomColor()
        }
    }
}

function getOpacityByLifeCycleTime(time: number) {
    if(time < LIFECYCLE_LENGTH / 2) {
        return time * 2 / LIFECYCLE_LENGTH
    } else {
        return (LIFECYCLE_LENGTH - time) * 2 / LIFECYCLE_LENGTH
    }
}

function getOpacityByIndex(index: number) {
    let offsettedTime = time - index * REPOSITION_FREQUENCY;

    if(offsettedTime < 0) {
        offsettedTime += LIFECYCLE_LENGTH 
    }

    return getOpacityByLifeCycleTime(offsettedTime);
}

export function drawBubbleWorld(ctx: CanvasRenderingContext2D, data: Float32Array, colorized = false) {
    update();

    [0, 128, 256, 384, 512].forEach((freq, i) => {
        for (let j = 0; j < 6; j++) {
            const index = i * 6 + j,
                { scaleMultiplier, color, ...coords } = CIRCLE_COORDS[index];

            drawCircle(ctx, {
                radius: makePositive(data[freq]) * scaleMultiplier,
                ...coords,
                color: colorized ? color : DEFAULT_COLOR,
                opacity: getOpacityByIndex(index)
            });
        }
    })
}