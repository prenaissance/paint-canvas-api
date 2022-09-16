import IToolHandler from "../interfaces/IToolHandler";

enum ToolsEnum {
    pencil = "pencil",
    brush = "brush",
    line = "line",
    square = "square",
    ellipse = "ellipse",
    triangle = "triangle",
    eyedropper = "eyedropper",
    bucket = "bucket"
}

type ToolsActionData = {
    type: ToolsEnum,
    payload: IToolHandler,
};

class ToolsEvent extends CustomEvent<ToolsActionData>{ };

export default ToolsEvent;
export { ToolsEnum, ToolsActionData };