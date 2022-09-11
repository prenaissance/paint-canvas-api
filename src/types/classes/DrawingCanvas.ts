import IDrawingCanvasState from "../interfaces/IDrawingCanvasState";

class DrawingCanvas {
    readonly ctx: CanvasRenderingContext2D;
    readonly state: IDrawingCanvasState = {
        currentFrame: "",
        initialX: 0,
        initialY: 0,
        x: 0,
        y: 0,
        pressed: false,
        tool: Tools.pencil,
        strokeColor: "rgba(0, 0, 0, 1)",
        fillColor: "rgba(0, 0, 0, 0)"
    };
    private readonly _undoHistory: string[] = [];
    private readonly _redoHistory: string[] = [];

    private drawOutline() {
        this.ctx.save();

        this.ctx.setLineDash([5, 15]);
        this.ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        const { initialX, initialY, x, y } = this.state;
        this.ctx.strokeRect(initialX, initialY, x, y);

        this.ctx.restore;
    }

    constructor(ctx: CanvasRenderingContext2D, setup: () => void = () => { }) {
        this.ctx = ctx;
        const canvas = ctx.canvas;
        canvas.addEventListener("mousemove", (e) => {
            this.state.x = e.offsetX;
            this.state.y = e.offsetY;
        })
    }


}

export default DrawingCanvas;