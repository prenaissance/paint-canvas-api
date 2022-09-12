import "./ColorPicker.scss";
import stick from "assets/images/stick.png";
import bucket from "assets/images/bucket.png";
import ColorPickerObserver from "../../types/classes/ColorPickerObserver";
import ColorButton from "./ColorButton";
import { getDrawingCanvas } from "../../helpers/misc";
import ColorChangeEvent from "../../types/events/ColorChangeEvent";

const fillObserver = new ColorPickerObserver();
const lineObserver = new ColorPickerObserver();

const colors = [
    "rgba(0, 0, 0, 0)",
    "#000",
    "#00f",
    "#0f0",
    "#f00",
    "#ff0",
    "#0ff",
    "#f0f"
];

const IconImage = (src: string) => {
    const image = new Image();
    image.src = src;
    return image;
};

const handleLineClick = (color: string) => (e: MouseEvent) => {
    const button = e.currentTarget as HTMLButtonElement;
    getDrawingCanvas().state.strokeColor = color;
    button.classList.add("color-picker__button--enabled");
    lineObserver.dispatch(color);
}

const handleFillClick = (color: string) => (e: MouseEvent) => {
    const button = e.currentTarget as HTMLButtonElement;
    getDrawingCanvas().state.fillColor = color;
    button.classList.add("color-picker__button--enabled");
    fillObserver.dispatch(color);
}

const handleColorChange = (color: string) => (e: ColorChangeEvent) => {
    const button = e.currentTarget as HTMLButtonElement;
    if (e.detail.color !== color) {
        button.classList.remove("color-picker__button--enabled");
    }
}

const LineColorButton = (color: string) => {
    const button = ColorButton({
        color,
        onClick: handleLineClick(color),
        onColorChange: handleColorChange(color)
    });
    lineObserver.subscribe(button);

    return button;
};

const FillColorButton = (color: string) => {
    const button = ColorButton({
        color,
        onClick: handleFillClick(color),
        onColorChange: handleColorChange(color)
    });
    fillObserver.subscribe(button);

    return button;
};

const LineContainer = () => {
    const lineContainer = document.createElement("dev");
    lineContainer.className = "color-picker__container color-picker__container--1";
    lineContainer.appendChild(IconImage(stick));
    colors.forEach((color) => {
        const lineColorButton = LineColorButton(color);
        if (color === "#000") {
            lineColorButton.dispatchEvent(new Event("click"));
        }
        lineContainer.appendChild(lineColorButton);
    });

    return lineContainer;
}

const FillContainer = () => {
    const fillContainer = document.createElement("dev");
    fillContainer.className = "color-picker__container color-picker__container--2";
    fillContainer.appendChild(IconImage(bucket));
    colors.forEach((color) => {
        const fillColorButton = FillColorButton(color);
        if (color === "rgba(0, 0, 0, 0)") {
            fillColorButton.dispatchEvent(new Event("click"));
        }
        fillContainer.appendChild(fillColorButton);
    });

    return fillContainer;
}

const ColorPicker = () => {

    const colorPicker = document.createElement("div");
    colorPicker.className = "color-picker";

    colorPicker.append(LineContainer(), FillContainer());

    return colorPicker;
};

export default ColorPicker;