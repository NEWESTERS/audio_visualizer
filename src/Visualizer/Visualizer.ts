import { AudioAPI } from "../AudioAPI";
import { drawSpectrum } from "./compositions/spectrum";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "./constants";
import { drawMiddleCircle } from "./primitives/circle";
import { drawBubbleWorld } from "./Compositions/bubbleWorld";
import { makePositive } from "./helpers/math";
import { drawStrobe } from "./primitives/strobe";

export class Visualizer {
    private ctx: CanvasRenderingContext2D;
    private audioAPI: AudioAPI;

    constructor(ctx: CanvasRenderingContext2D, audioAPI: AudioAPI) {
        this.ctx = ctx;
        this.audioAPI = audioAPI;

        this.redraw();
    }

    getData = () => this.audioAPI.getAudioData();

    getFreqValue = (freq: number) => {
        return makePositive(this.getData()[freq]);
    };

    redraw = () => {
        this.ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

        // drawMiddleCircle(this.ctx, this.getFreqValue(6));
        drawSpectrum(this.ctx, this.getData());
        drawBubbleWorld(this.ctx, this.getData(), true);
        // drawStrobe(this.ctx, this.getFreqValue(6));

        requestAnimationFrame(this.redraw);
    };
}

function smoothOutValue(value: number) {
    return Math.round(value / 10) * 10;
}
