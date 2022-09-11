import "./extensions";
import "./style.scss";
import { triangle } from "./paths";
import Tools from "./components/Tools/Tools";

const container = document.querySelector(".grid-container")!;
container.appendChild(Tools());

const canvas: HTMLCanvasElement = document.querySelector("#canvas")!;
const ctx = canvas.getContext("2d", { alpha: true })!;

ctx.fillStyle = "rgba(13, 13, 120, 0.5)";
ctx.fillRect(15, 15, 50, 50);

ctx.fillStyle = "rgba(120, 13, 13, 0.5)";
ctx.fillRect(25, 25, 50, 50);
let interval: number;

canvas.addEventListener("pointerdown", e => {
    const x = e.offsetX;
    const y = e.offsetY;
    console.log({ x, y })
    ctx.fill(triangle.createTransform({ a: 30, d: 30, e: x, f: y }));

});

canvas.addEventListener("pointerup", e => {
    clearInterval(interval);

});

