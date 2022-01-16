const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearAll = document.getElementById("jsClearAll");

canvas.width = 600;
canvas.height = 400;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 5.05;
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";

let paintingMode = false;
let fillingMode = false;

function startPainting(event) {
    if(fillingMode === false) {
        paintingMode = true;
        ctx.beginPath();
    }
}

function startPaintingTouch(event) {
    //모바일
    event.preventDefault();
    if(fillingMode === false) {
        paintingMode = true;
        ctx.beginPath();
    }
}

function stopPainting(event) {
    ctx.closePath();
    paintingMode = false;
}

function stopPaintingTouch(event) {
    //모바일
    event.preventDefault();
    ctx.closePath();
    paintingMode = false;
}

function handlePainting(event) {
    const X = event.offsetX;
    const Y = event.offsetY;
    if(!paintingMode) {
        ctx.moveTo(X,Y);
    } else {
        ctx.lineTo(X,Y);
        ctx.stroke();
    }
}

function handlePaintingTouch(event) {
    //모바일
    const X = event.targetTouches[0].clientX;
    const Y = event.targetTouches[0].clientY;
    if(!paintingMode) {
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

function handleClickCanvasTouch(event) {
    event.preventDefault();
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

function handleClearAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleClearAllTouch(event) {
    event.preventDefault();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("mousemove", handlePainting);
canvas.addEventListener("click", handleClickCanvas);
canvas.addEventListener("contextmenu", blockContextMenu);

canvas.addEventListener("touchmove", handlePaintingTouch, false);
canvas.addEventListener("touchend", stopPaintingTouch, false);
canvas.addEventListener("touchstart", startPaintingTouch, false);
canvas.addEventListener("touchstart", handleClickCanvasTouch, false);


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

if(clearAll) {
    clearAll.addEventListener("click", handleClearAll);
    clearAll.addEventListener("touchstart", handleClearAllTouch);
}