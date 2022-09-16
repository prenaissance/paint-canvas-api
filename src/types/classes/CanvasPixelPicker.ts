import Rgba from "../models/Rgba";
import DrawingCanvasContext from "./DrawingCanvasContext";
import RgbaFactory from "./RgbaFactory";

// should be a singleton that listens to render events to update imageData
class CanvasPixelPicker {
    imageData: ImageData;
    private readonly width: number;
    private readonly height: number;
    private readonly _state = new DrawingCanvasContext();
    constructor() {
        const ctx = this._state.drawingCanvas.ctx;
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height;
        this.imageData = ctx.getImageData(0, 0, this.width, this.height);
    }

    at(x: number, y: number): Rgba | null {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return null;
        }

        const clampedIndex = (y * this.width + x) * 4;
        const [r, g, b, a] = this.imageData.data.slice(
            clampedIndex,
            clampedIndex + 4
        );

        return RgbaFactory.getRgba(r, g, b, a / 255);
    }

    setAt(x: number, y: number, rgba: Rgba) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            throw Error("index out of range");
        }
        const clampedIndex = (y * this.width + x) * 4;
        const { r, g, b, a } = rgba;
        this.imageData.data.set([r, g, b, Math.round(a * 255)], clampedIndex);
    }
}

export default CanvasPixelPicker;