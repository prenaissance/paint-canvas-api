import ColorChangeEvent from "../../types/events/ColorChangeEvent";

type ColorButtonProps = {
    color: string;
    onClick: (e: MouseEvent) => void;
    onColorChange: (e: ColorChangeEvent) => void;
};

const ColorButton = ({ color, onClick = () => { }, onColorChange = () => { } }: ColorButtonProps) => {
    const button = document.createElement("button");
    button.className = "color-picker__button";
    button.style.backgroundColor = color;

    button.addEventListener("click", onClick);
    button.addEventListener("colorchange", (e: Event) => {
        onColorChange(e as ColorChangeEvent);
    });

    return button;
};

export default ColorButton;