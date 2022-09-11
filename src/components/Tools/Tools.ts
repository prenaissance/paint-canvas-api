import "./Tools.scss";
import pencilSvg from "assets/svg/pencil.svg";
import ToolButton from "./ToolButton";

const switchEnabled = (text: string) => {
    return text == "true" ? "false" : "true";
}

const Tools = () => {
    const tools = document.createElement("div");
    tools.classList.add("tools");

    const pencilButton = ToolButton({
        icon: pencilSvg,
        onClick(e) {
            const button = e.currentTarget as HTMLButtonElement;
            console.log(button);
            button.dataset.enabled = switchEnabled(button.dataset.enabled || "false");
        }
    })

    tools.append(pencilButton);
    return tools;
}

export default Tools;