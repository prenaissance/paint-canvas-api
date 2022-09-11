interface IDrawingCanvasState {
    currentFrame: string,
    initialX: number,
    initialY: number,
    x: number,
    y: number,
    pressed: boolean,
    tool: Tools,
    strokeColor: string,
    fillColor: string,
}

export default IDrawingCanvasState;