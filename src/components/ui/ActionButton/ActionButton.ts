type ActionButtonProps = {
    icon: string;
    onClick: (e: MouseEvent) => void;
    style?: CSSStyleDeclaration;
    className?: string;
};

const ActionButton = ({ icon, onClick, style, className }: ActionButtonProps) => {
    const button = document.createElement("button");

    button.addEventListener("click", onClick);

    if (className) {
        button.className = className;
    }
    if (style) {
        for (const [key, value] of Object.values(style)) {
            button.style.setProperty(key, value);
        }
    }

    const img = document.createElement("img");
    img.src = icon;

    button.appendChild(img);

    return button;
}

export default ActionButton;