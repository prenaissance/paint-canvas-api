import IHandler from "../interfaces/IToolHandler";
import DrawingCanvas from "./DrawingCanvas";
import PencilHandler from "./PencilHandler";
import TriangleHandler from "./TriangleHandler";

class DrawingCanvasContext {// this should be a global state
    private static _instance: DrawingCanvasContext | null = null;
    drawingCanvas: DrawingCanvas;// probably more canvases will be used in the future for layers

    initialX = 0;
    initialY = 0;
    x = 0;
    y = 0;
    pressed = false;
    tool: IHandler;
    strokeColor = "rgba(0, 0, 0, 1)";
    fillColor = "rgba(0, 0, 0, 0)";

    constructor(drawingCanvas?: DrawingCanvas) {
        if (drawingCanvas) {
            this.drawingCanvas = drawingCanvas;
        }
        if (!DrawingCanvasContext._instance) {
            DrawingCanvasContext._instance = this;
            this.tool = new PencilHandler();
        }

        return DrawingCanvasContext._instance;
    }
}

export default DrawingCanvasContext;