import { getDrawingCanvas } from "../../helpers/misc";
import ToolsEvent from "../../types/events/ToolsEvent";
import ActionButton from "../ui/ActionButton/ActionButton";

type ToolButtonProps = {
    icon: string;
    onClick: (e: MouseEvent) => void;
    onTool: (e: ToolsEvent) => void;
    style?: CSSStyleDeclaration;
};

const ToolButton = ({ icon, onClick = () => { }, style, onTool }: ToolButtonProps) => {
    const button = ActionButton({
        icon,
        onClick,
        style,
        className: "tools__button"
    });

    button.addEventListener("tool", (e: Event) => {
        onTool(e as ToolsEvent);
    });

    getDrawingCanvas().subscribe(button, "tool");

    return button;
};

export default ToolButton;