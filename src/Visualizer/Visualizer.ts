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
        return this.getData()[freq];
    };

    clearCanvas = () => {
        const ctx = this.ctx;

        ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        
        ctx.beginPath();
        ctx.rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }

    redraw = () => {
        this.clearCanvas();

        // drawMiddleCircle(this.ctx, this.getFreqValue(6));
        // drawSpectrum(this.ctx, this.getData());
        drawStrobe(this.ctx, this.getFreqValue(6));
        drawBubbleWorld(this.ctx, this.getData(), true);

        requestAnimationFrame(this.redraw);
    };
}
