type ToolButtonProps = {
    icon: string;
    onClick: (e: MouseEvent) => void;
    style?: CSSStyleDeclaration;
};

const ToolButton = ({ icon, onClick = () => { }, style }: ToolButtonProps) => {
    const button = document.createElement("button");
    button.classList.add("tools__button");
    button.dataset.enabled = "false";
    button.addEventListener("click", onClick);
    if (style) {
        for (const [key, value] of Object.values(style)) {
            button.style.setProperty(key, value);
        }
    }

    const img = document.createElement("img");
    img.src = icon;

    button.appendChild(img);

    return button;
};

export default ToolButton;