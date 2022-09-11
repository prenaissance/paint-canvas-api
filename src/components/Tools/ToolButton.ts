import ActionButton from "../ui/ActionButton/ActionButton";

type ToolButtonProps = {
    icon: string;
    onClick: (e: MouseEvent) => void;
    style?: CSSStyleDeclaration;
};

const ToolButton = ({ icon, onClick = () => { }, style }: ToolButtonProps) => {
    const button = ActionButton({
        icon,
        onClick,
        style,
        className: "tools__button"
    });
    button.dataset.enabled = "false";

    return button;
};

export default ToolButton;