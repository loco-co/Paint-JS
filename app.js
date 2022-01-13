const canvas = document.getElementById("jsCanvas");

let paintingMode = false;

function onMouseDown(event) {
    paintingMode = true;
}

function onMouseUp(event) {
    paintingMode = false;
}

function stopPainting() {
    paintingMode = false;
}

function onMouseMove(event) {
    const X = event.offsetX;
    const Y = event.offsetY;
    console.log(X, Y);
}

canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("mousemove", onMouseMove);