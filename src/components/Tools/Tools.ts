import "./Tools.scss";
import pencilSvg from "assets/svg/pencil.svg";
import line from "assets/images/line.png";
import triangle from "assets/images/triangle.jpg";
import square from "assets/svg/square.svg";
import ellipse from "assets/images/ellipse.png";

import ToolButton from "./ToolButton";
import { getDrawingCanvas } from "../../helpers/misc";
import ToolsEvent, { ToolsEnum } from "../../types/events/ToolsEvent";
import PencilHandler from "../../types/classes/handlers/PencilHandler";
import IToolHandler from "../../types/interfaces/IToolHandler";
import TriangleHandler from "../../types/classes/handlers/TriangleHandler";
import SquareHandler from "../../types/classes/handlers/SquareHandler";
import EllipseHandler from "../../types/classes/handlers/EllipseHandler";
import LineHandler from "../../types/classes/handlers/LineHandler";

const handleEnabled = (tool: ToolsEnum, handler: IToolHandler) => (e: MouseEvent) => {
    const button = e.currentTarget as HTMLButtonElement;
    button.classList.add("tools__button--enabled");
    getDrawingCanvas().dispatchTool(tool, handler);
};

const handleDisabledStyle = (tool: ToolsEnum) => (e: ToolsEvent) => {
    if (e.detail.type !== tool) {
        const button = e.currentTarget as HTMLButtonElement;
        button.classList.remove("tools__button--enabled");
    }
};

const PencilButton = () => {
    const pencilButton = ToolButton({
        icon: pencilSvg,
        onClick: handleEnabled(ToolsEnum.pencil, new PencilHandler()),
        onTool: handleDisabledStyle(ToolsEnum.pencil)
    });

    pencilButton.classList.add("tools__button--enabled");
    return pencilButton;
};

const LineButton = () => (
    ToolButton({
        icon: line,
        onClick: handleEnabled(ToolsEnum.line, new LineHandler()),
        onTool: handleDisabledStyle(ToolsEnum.line)
    })
);

const SquareButton = () => (
    ToolButton({
        icon: square,
        onClick: handleEnabled(ToolsEnum.square, new SquareHandler()),
        onTool: handleDisabledStyle(ToolsEnum.square)
    })
);

const TriangleButton = () => (
    ToolButton({
        icon: triangle,
        onClick: handleEnabled(ToolsEnum.triangle, new TriangleHandler()),
        onTool: handleDisabledStyle(ToolsEnum.triangle)
    })
);

const EllipseButton = () => (
    ToolButton({
        icon: ellipse,
        onClick: handleEnabled(ToolsEnum.ellipse, new EllipseHandler()),
        onTool: handleDisabledStyle(ToolsEnum.ellipse)
    })
);

const Tools = () => {
    const tools = document.createElement("div");
    tools.className = "tools";

    tools.append(
        PencilButton(),
        LineButton(),
        SquareButton(),
        TriangleButton(),
        EllipseButton()
    );
    return tools;
};

export default Tools;