import IToolHandler from "../interfaces/IToolHandler";
import DrawingCanvasContext from "./DrawingCanvasContext";

class LineHandler implements IToolHandler {
    private readonly _state = new DrawingCanvasContext();
    private drawLine() {
        const ctx = this._state.drawingCanvas.ctx;
        const { x, y, initialX, initialY, strokeColor, fillColor } = this._state;
        ctx.save();

        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.moveTo(initialX, initialY);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.restore();
    }

    handleDisplay() {
        this._state.drawingCanvas.resetFrame();
        this.drawLine();
    }

    handleDraw() {
        this._state.drawingCanvas.resetFrame();
        this.drawLine();
        this._state.drawingCanvas.drawFrame();
    }
}

export default LineHandler;