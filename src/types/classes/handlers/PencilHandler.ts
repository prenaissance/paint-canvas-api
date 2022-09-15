import IToolHandler from "../../interfaces/IToolHandler";
import DrawingCanvasContext from "../DrawingCanvasContext";

class PencilHandler implements IToolHandler {
    private readonly _state = new DrawingCanvasContext();
    private isDrawing = false;
    private path = new Path2D();

    private drawLine() {
        const ctx = this._state.drawingCanvas.ctx;
        if (!this.isDrawing) {
            this.isDrawing = true;
            ctx.beginPath();
            ctx.moveTo(this._state.initialX, this._state.initialY);
            return;
        }
        ctx.save();

        ctx.strokeStyle = this._state.strokeColor;
        ctx.fillStyle = this._state.fillColor;
        ctx.lineWidth = 1;
        this.path.lineTo(this._state.x, this._state.y);

        ctx.stroke(this.path);
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
        this.path = new Path2D();
    }
}

export default PencilHandler;