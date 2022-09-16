import "../../../extensions/StringExtensions";
import IToolHandler from "../../interfaces/IToolHandler";
import CanvasPixelPicker from "../CanvasPixelPicker";
import DrawingCanvasContext from "../DrawingCanvasContext";

class EyedropperHandler implements IToolHandler {
    private readonly _state = new DrawingCanvasContext();
    private pickColor() {
        const pixelPicker = new CanvasPixelPicker();
        const rgba = pixelPicker.at(this._state.x, this._state.y);

        if (rgba) {
            this._state.fillColor = String.fromRgba(rgba);
        }

    }

    handleDisplay() { }

    handleDraw() {
        this.pickColor();
    }
}

export default EyedropperHandler;