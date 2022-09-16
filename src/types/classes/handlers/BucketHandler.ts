import "../../../extensions/StringExtensions";
import { shallowEquals } from "../../../helpers/misc";
import IToolHandler from "../../interfaces/IToolHandler";
import Coords from "../../models/Coords";
import CanvasPixelPicker from "../CanvasPixelPicker";
import DrawingCanvasContext from "../DrawingCanvasContext";
import Queue from "../Queue";

const neighborCoordOffsets: Coords[] = [
    {
        x: 1,
        y: 0
    },
    {
        x: -1,
        y: 0
    },
    {
        x: 0,
        y: 1
    },
    {
        x: 0,
        y: -1
    },
];

class BucketHandler implements IToolHandler {
    private readonly _state = new DrawingCanvasContext();
    private fill() {
        const pixelPicker = new CanvasPixelPicker();
        const queue = new Queue<Coords>();
        const rgba = pixelPicker.at(this._state.x, this._state.y);
        const fillRgba = this._state.fillColor.toRgba();
        if (!rgba || !fillRgba || shallowEquals(rgba, fillRgba)) {// click released outside the canvas
            return;
        }

        queue.push({ x: this._state.x, y: this._state.y });
        pixelPicker.setAt(this._state.x, this._state.y, fillRgba);

        while (!queue.empty()) {
            const current = queue.pop()!;

            const neighbors: Coords[] = neighborCoordOffsets
                .map(({ x, y }) => ({ x: current.x + x, y: current.y + y }));
            neighbors.filter(({ x, y }) =>
                pixelPicker.at(x, y) &&
                shallowEquals(pixelPicker.at(x, y)!, rgba)
            ).forEach(({ x, y }) => {
                pixelPicker.setAt(current.x, current.y, fillRgba);
                queue.push({ x, y });
            });

        }

        this._state.drawingCanvas.resetFrame();
        this._state.drawingCanvas.ctx.putImageData(
            pixelPicker.imageData,
            0,
            0,
        );
    }

    handleDisplay() { }

    handleDraw() {
        this.fill();
        this._state.drawingCanvas.drawFrame();
    }
}

export default BucketHandler;