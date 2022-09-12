import IToolHandler from "../interfaces/IToolHandler";
import DrawingCanvasContext from "./DrawingCanvasContext";

class TriangleHandler implements IToolHandler {
    private readonly _state = new DrawingCanvasContext();
    private drawSquare() {
        const ctx = this._state.drawingCanvas.ctx;
        const { x, y, initialX, initialY, strokeColor, fillColor } = this._state;
        ctx.save();

        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = fillColor;
        ctx.strokeRect(initialX, initialY, x - initialX, y - initialY);
        ctx.fillRect(initialX, initialY, x - initialX, y - initialY);

        ctx.restore();
    }

    handleDisplay() {
        this._state.drawingCanvas.resetFrame();
        this.drawSquare();
    }

    handleDraw() {
        this._state.drawingCanvas.resetFrame();
        this.drawSquare();
        this._state.drawingCanvas.drawFrame();
    }
}

export default TriangleHandler;