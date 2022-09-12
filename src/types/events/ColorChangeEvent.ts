enum ColorTypeEnum {
    line = "line",
    fill = "fill"
}

type ColorChangeData = {
    color: string;
};

class ColorChangeEvent extends CustomEvent<ColorChangeData>{ };

export default ColorChangeEvent;
export { ColorTypeEnum, ColorChangeData };