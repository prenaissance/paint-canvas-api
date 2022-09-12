import "../../extensions";
import IToolHandler from "../interfaces/IToolHandler";
import DrawingCanvasContext from "./DrawingCanvasContext";
import { triangle } from "../../helpers/paths";

class TriangleHandler implements IToolHandler {
    private readonly _state = new DrawingCanvasContext();
    private drawTriangle() {
        const ctx = this._state.drawingCanvas.ctx;
        const { x, y, initialX, initialY, strokeColor, fillColor } = this._state;
        ctx.save();

        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = fillColor;
        this._state.drawingCanvas.resetFrame();
        const transformedTriangle = triangle.createTransform({
            a: x - initialX,
            d: initialY - y,
            e: initialX,
            f: initialY
        });

        ctx.stroke(transformedTriangle);
        ctx.fill(transformedTriangle);

        ctx.restore();
    }

    handleDisplay() {
        this._state.drawingCanvas.resetFrame();
        this.drawTriangle();
        this._state.drawingCanvas.drawOutline();
    }

    handleDraw() {
        this._state.drawingCanvas.resetFrame();
        this.drawTriangle();
        this._state.drawingCanvas.drawFrame();
    }
}

export default TriangleHandler;