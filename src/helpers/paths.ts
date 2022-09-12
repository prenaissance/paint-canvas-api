const unitTriangle = new Path2D();

unitTriangle.lineTo(0.5, -1)
unitTriangle.lineTo(1, 0);
unitTriangle.lineTo(0, 0);
unitTriangle.closePath();

export const triangle = Object.freeze(unitTriangle);