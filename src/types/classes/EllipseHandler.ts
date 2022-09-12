import IToolHandler from "../interfaces/IToolHandler";
import DrawingCanvasContext from "./DrawingCanvasContext";

class EllipseHandler implements IToolHandler {
    private readonly _state = new DrawingCanvasContext();
    private drawEllipse() {
        const ctx = this._state.drawingCanvas.ctx;
        ctx.save();

        const { x, y, initialX, initialY, strokeColor, fillColor } = this._state;
        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = fillColor;
        this._state.drawingCanvas.resetFrame();
        ctx.beginPath();
        ctx.ellipse(x - (x - initialX) / 2, y - (y - initialY) / 2, Math.abs((x - initialX) / 2), Math.abs((y - initialY) / 2), 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();

        ctx.restore();
    }

    handleDisplay() {
        this._state.drawingCanvas.resetFrame();
        this.drawEllipse();
        this._state.drawingCanvas.drawOutline();
    }

    handleDraw() {
        this.drawEllipse();
        this._state.drawingCanvas.drawFrame();
    }
}

export default EllipseHandler;