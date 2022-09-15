import "./extensions";
import "./style.scss";
import Tools from "./components/Tools/Tools";
import DrawingCanvas from "./types/classes/DrawingCanvas";
import History from "./components/History/History";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import DownloadImage from "./components/DownloadImage/DownloadImage";

const container = document.querySelector(".grid-container")!;
const canvas: HTMLCanvasElement = document.querySelector("#canvas")!;
const ctx = canvas.getContext("2d", { alpha: true })!;

const drawingCanvas = new DrawingCanvas(ctx, 1, () => {
    ctx.fillStyle = "rgba(13, 13, 120, 0.5)";
    ctx.fillRect(15, 15, 50, 50);

    ctx.fillStyle = "rgba(120, 13, 13, 0.5)";
    ctx.fillRect(25, 25, 50, 50);
});

//mutate DOM after canvas creation, some events depend on the context being initialized.
container.append(
    Tools(),
    History(),
    ColorPicker(),
    DownloadImage()
);

drawingCanvas.drawFrame();
drawingCanvas.undo();
