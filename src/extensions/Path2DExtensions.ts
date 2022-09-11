declare global {
    interface Path2D {
        createTransform(transform: DOMMatrix2DInit): Path2D;
    }
}

Path2D.prototype.createTransform = function (transform: DOMMatrix2DInit) {
    const path = new Path2D();
    path.addPath(this, transform);
    return path;
}

export { };