const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = 600;
canvas.height = 400;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 5.05;
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";

let paintingMode = false;
let fillingMode = false;

function startPainting() {
    if(fillingMode === false) {
        paintingMode = true;
    }
}

function stopPainting() {
    paintingMode = false;
}

function handlePainting(event) {
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
    ctx.fillStyle = color;
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

function handleClickCanvas() {
    if(fillingMode) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleClickSave() {
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "picture🎨🖼";
    link.click();
}

function blockContextMenu(event) {
    event.preventDefault();
}

canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("mousemove", handlePainting);
canvas.addEventListener("click", handleClickCanvas);
canvas.addEventListener("contextmenu", blockContextMenu);

canvas.addEventListener("touchmove", handlePainting);
canvas.addEventListener("touchend", stopPainting);
canvas.addEventListener("touchstart", startPainting);

Array.from(colors).forEach((color) => color.addEventListener("click", handleChangeColor));

if(range) {
    range.addEventListener("input", handleChangeRange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleClickSave);
}