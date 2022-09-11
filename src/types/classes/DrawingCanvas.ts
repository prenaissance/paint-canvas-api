import IDrawingCanvasState from "../interfaces/IDrawingCanvasState";
import Tools from "../enums/Tools";
class DrawingCanvas {
    readonly ctx: CanvasRenderingContext2D;
    state: IDrawingCanvasState = {
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

    reset() {
        this.ctx.save();

        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.restore();
    }

    private resetFrame() {
        this.reset();// required because of possible alpha in saved frame

        const snapshot = new Image();
        snapshot.src = this.state.currentFrame;
        this.ctx.drawImage(snapshot, 0, 0);
    }

    private drawFrame() {
        this._undoHistory.push(this.state.currentFrame);
        this._redoHistory.length = 0;
        this.state.currentFrame = this.ctx.canvas.toDataURL("image/png");
    }

    undo() {
        if (this._undoHistory.length === 0) {
            return;
        }
        this._redoHistory.push(this.state.currentFrame);
        this.state.currentFrame = this._undoHistory.pop()!;
        this.resetFrame();
    }

    redo() {
        if (this._redoHistory.length === 0) {
            return;
        }
        this._undoHistory.push(this.state.currentFrame);
        this.state.currentFrame = this._redoHistory.pop()!;
        this.resetFrame();
    }

    private drawOutline() {
        this.resetFrame();

        this.ctx.save();

        this.ctx.setLineDash([5, 10]);
        this.ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        const { initialX, initialY, x, y } = this.state;
        this.ctx.strokeRect(initialX, initialY, x - initialX, y - initialY);

        this.ctx.restore;
    }

    constructor(ctx: CanvasRenderingContext2D, setup: () => void = () => { }) {
        this.ctx = ctx;
        const canvas = ctx.canvas;
        setup();
        this.state.currentFrame = ctx.canvas.toDataURL("image/png");

        canvas.addEventListener("pointermove", (e) => {
            this.state = {
                ...this.state,
                x: e.offsetX,
                y: e.offsetY
            };
            this.state.pressed && this.drawOutline();
        });

        canvas.addEventListener("pointerdown", (e) => {
            this.state = {
                ...this.state,
                initialX: e.offsetX,
                initialY: e.offsetY,
                pressed: true,
            };
        })

        canvas.addEventListener("pointerup", () => {
            this.state.pressed = false;
            // draw with the current state strategy
        })
    }


}

export default DrawingCanvas;