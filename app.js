const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

ctx.lineWidth = 2.5;
ctx.strokeStyle = "palegreen";

let paintingMode = false;

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

canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("mousemove", onMouseMove);