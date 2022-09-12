import ActionButton from "../ui/ActionButton/ActionButton";
import "./History.scss";
import undo from "assets/images/undo.png";
import redo from "assets/images/redo.png";
import HistoryEvent, { HistoryEnum } from "../../types/events/HistoryEvent";
import { getDrawingCanvas } from "../../helpers/misc";
import TextButton from "../ui/ActionButton/TextButton";


// ! lazy load so the canvas loads the context first
const handleUndoClick = () => getDrawingCanvas().undo();
const handleRedoClick = () => getDrawingCanvas().redo();
const handleClearClick = () => getDrawingCanvas().clear();

const UndoButton = () => {
    const drawingCanvas = getDrawingCanvas();
    const undoButton = ActionButton({
        icon: undo,
        onClick: handleUndoClick,
        className: "history__button"
    });
    undoButton.disabled = true;
    undoButton.addEventListener("history", (e: Event) => {
        const event = e as HistoryEvent;
        const { type, stackLength } = event.detail;
        const isStackEmpty = type == HistoryEnum.undo && stackLength == 0;
        if (isStackEmpty) {
            undoButton.disabled = true;
        }
        else {
            undoButton.disabled = false;
        }
    });

    drawingCanvas.subscribe(undoButton, "history");

    return undoButton;
};

const RedoButton = () => {
    const drawingCanvas = getDrawingCanvas();
    const redoButton = ActionButton({
        icon: redo,
        onClick: handleRedoClick,
        className: "history__button"
    });
    redoButton.disabled = true;
    redoButton.addEventListener("history", (e: Event) => {
        const event = e as HistoryEvent;
        const { type, stackLength } = event.detail;
        const isStackEmpty = type == HistoryEnum.redo && stackLength == 0;
        if (isStackEmpty) {
            redoButton.disabled = true;
        }
        else {
            redoButton.disabled = false;
        }
    });

    drawingCanvas.subscribe(redoButton, "history");

    return redoButton;
};

const ClearButton = () => (
    TextButton({
        text: "Clear",
        onClick: handleClearClick,
        className: "history__button history__button--long"
    })
);

const History = () => {

    const container = document.createElement("div");
    container.className = "history";
    container.append(UndoButton(), ClearButton(), RedoButton());

    return container;
};

export default History;