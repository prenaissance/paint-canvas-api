import DrawingCanvasContext from "../types/classes/DrawingCanvasContext";

const shallowEquals = (obj1: Object, obj2: Object) =>
    Object.keys(obj1).length === Object.keys(obj2).length &&
    (Object.keys(obj1) as (keyof typeof obj1)[]).every((key) => {
        return (
            Object.prototype.hasOwnProperty.call(obj2, key) && obj1[key] === obj2[key]
        );
    });

const getDrawingCanvas = () => new DrawingCanvasContext().drawingCanvas;

export {
    shallowEquals,
    getDrawingCanvas
};