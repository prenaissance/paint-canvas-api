type TextButtonProps = {
    text: string;
    onClick: (e: MouseEvent) => void;
    style?: CSSStyleDeclaration;
    className?: string;
};

const TextButton = ({ text, onClick, style, className }: TextButtonProps) => {
    const button = document.createElement("button");
    button.innerText = text;
    button.addEventListener("click", onClick);

    if (className) {
        button.className = className;
    }
    if (style) {
        for (const [key, value] of Object.values(style)) {
            button.style.setProperty(key, value);
        }
    }

    return button;
}

export default TextButton;