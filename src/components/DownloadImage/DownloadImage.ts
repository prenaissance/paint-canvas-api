import { getDrawingCanvas } from "../../helpers/misc";
import TextButton from "../ui/ActionButton/TextButton";
import "./DownloadImage.scss";

const getImageData = () => getDrawingCanvas().currentFrame.replace("image/png", "image/octet-stream");

const DownloadImage = () => {
    const anchor = document.createElement("a");
    anchor.download = "image.png";
    anchor.className = "download-image";

    const button = TextButton({
        text: "Download",
        onClick: () => {
            anchor.href = getImageData();
        }
    });

    anchor.appendChild(button);

    return anchor;
};

export default DownloadImage;