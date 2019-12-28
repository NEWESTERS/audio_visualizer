import { AudioAPI } from './AudioAPI';
import { Visualizer } from './Visualizer';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from './Visualizer/constants';

const start = (ctx: CanvasRenderingContext2D) => {
    const audioAPI = new AudioAPI();

    const visualizer = new Visualizer(ctx, audioAPI);

    return visualizer;
}

window.onload = () => {
    const startButton = document.getElementById("start-button"),
        fullscreenButton = document.getElementById("fullscreen-button"),
        mainCanvas = document.getElementById("main-canvas") as HTMLCanvasElement,
        ctx = mainCanvas.getContext("2d");

    mainCanvas.width = WINDOW_WIDTH;
    mainCanvas.height = WINDOW_HEIGHT;

    startButton.addEventListener("click", () => {
        start(ctx);
        startButton.remove();
    });

    fullscreenButton.addEventListener("click", () => {
        const canvas = mainCanvas as any;

        if (canvas.webkitRequestFullScreen) {
            canvas.webkitRequestFullScreen();
        }
        else {
            canvas.mozRequestFullScreen();
        }
    });
}