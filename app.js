const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = 600;
canvas.height = 400;

ctx.lineWidth = 5.05;
ctx.strokeStyle = "#2c2c2c";

let paintingMode = false;
let fillingMode = false;

function startPainting() {
    paintingMode = true;
}

function stopPainting() {
    paintingMode = false;
}

function onMouseMove(event) {
    const X = event.offsetX;
    const Y = event.offsetY;
    if(!paintingMode) {
        ctx.beginPath();
        ctx.moveTo(X,Y);
    } else {
        ctx.lineTo(X,Y);
        ctx.stroke();
    }
}

function handleChangeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleChangeRange(event) {
    const value = event.target.value;
    ctx.lineWidth = value;
}

function handleModeClick() {
    if(fillingMode === false) {
        mode.innerText = "Paint";
        fillingMode = true;
    } else {
        mode.innerText = "Fill";
        fillingMode = false;
    }
}

canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("mousemove", onMouseMove);

Array.from(colors).forEach((color) => color.addEventListener("click", handleChangeColor));

if(range) {
    range.addEventListener("input", handleChangeRange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}