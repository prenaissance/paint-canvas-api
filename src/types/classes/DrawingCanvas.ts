import ToolsEvent, { ToolsEnum } from "../events/ToolsEvent";
import IObservable from "../interfaces/IObservable";
import HistoryEvent, { HistoryEnum } from "../events/HistoryEvent";
import DrawingCanvasContext from "./DrawingCanvasContext";
import IToolHandler from "../interfaces/IToolHandler";
class DrawingCanvas implements IObservable<"history" | "tool"> {
    readonly ctx: CanvasRenderingContext2D;
    currentFrame: string;
    state: DrawingCanvasContext;

    private readonly _undoHistory: string[] = [];
    private readonly _redoHistory: string[] = [];

    private readonly _historySubscribers: HTMLElement[] = [];
    private readonly _toolSubscribers: HTMLElement[] = [];

    constructor(ctx: CanvasRenderingContext2D, setup: () => void = () => { }) {
        this.ctx = ctx;
        const canvas = ctx.canvas;
        setup();
        this.currentFrame = ctx.canvas.toDataURL("image/png");
        this.state = new DrawingCanvasContext(this);

        canvas.addEventListener("pointermove", (e) => {
            this.state.x = e.offsetX;
            this.state.y = e.offsetY;
            this.state.pressed && this.state.tool.handleDisplay();
        });

        canvas.addEventListener("pointerdown", (e) => {
            this.state.initialX = e.offsetX;
            this.state.initialY = e.offsetY;
            this.state.pressed = true;
        })

        canvas.addEventListener("pointerup", () => {
            this.state.pressed = false;
            this.state.tool.handleDraw();
        })
    }

    subscribe(element: HTMLElement, type: "history" | "tool") {
        if (type === "tool") {
            this._toolSubscribers.push(element);
        }
        else if (type === "history") {
            this._historySubscribers.push(element);
        }
        else {
            throw new Error(`Can't subscribe type ${type}`);
        }
    }

    private dispatchHistory(type: HistoryEnum, stackLength: number) {
        const event = new HistoryEvent("history", { detail: { type, stackLength } });
        this._historySubscribers.forEach((elem) => {
            elem.dispatchEvent(event);
        });
    }

    dispatchTool(type: ToolsEnum, payload: IToolHandler) {
        const event = new ToolsEvent("tool", { detail: { type, payload } });
        this._toolSubscribers.forEach((elem) => {
            elem.dispatchEvent(event);
        });

        this.state.tool = payload;
    }

    reset() {
        this.ctx.save();

        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.restore();
    }

    clear() {
        this.resetFrame();
        this.reset();
        this.drawFrame();
    }

    resetFrame() {
        this.reset();// required because of possible alpha in saved frame

        const snapshot = new Image();
        snapshot.src = this.currentFrame;
        this.ctx.drawImage(snapshot, 0, 0);
    }

    drawFrame() {
        this._undoHistory.push(this.currentFrame);
        this._redoHistory.splice(0, this._redoHistory.length);
        this.currentFrame = this.ctx.canvas.toDataURL("image/png");

        this.dispatchHistory(HistoryEnum.undo, this._undoHistory.length);
        this.dispatchHistory(HistoryEnum.redo, this._redoHistory.length);
    }

    undo() {
        if (this._undoHistory.length === 0) {
            return;
        }
        this._redoHistory.push(this.currentFrame);
        this.currentFrame = this._undoHistory.pop()!;
        this.resetFrame();
        this.dispatchHistory(HistoryEnum.undo, this._undoHistory.length);
    }

    redo() {
        if (this._redoHistory.length === 0) {
            return;
        }
        this._undoHistory.push(this.currentFrame);
        this.currentFrame = this._redoHistory.pop()!;
        this.resetFrame();
        this.dispatchHistory(HistoryEnum.redo, this._redoHistory.length);
    }

    public drawOutline() {
        this.ctx.save();

        this.ctx.setLineDash([5, 10]);
        this.ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
        const { initialX, initialY, x, y } = this.state;
        this.ctx.strokeRect(initialX, initialY, x - initialX, y - initialY);
        this.ctx.setLineDash([]);

        this.ctx.restore;
    }
}

export default DrawingCanvas;