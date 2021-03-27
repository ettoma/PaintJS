const canvas = document.getElementById('jsCanvas')
const ctx = canvas.getContext('2d')
const colors = document.getElementsByClassName('controls-color');
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById("jsSave")

canvas.width = document.getElementById('jsCanvas').offsetWidth;
canvas.height = document.getElementById('jsCanvas').offsetHeight;

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;
ctx.fillStyle = '#2c2c2c'

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true
}


function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y)
    } else {
        ctx.lineTo(x,y)
        ctx.stroke()
    }
    
}

function onMouseDown(){
    painting = true;
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleMode(){
    if (filling === true){
        filling = false;
        mode.innerText = 'Fill'
    } else {
        filling = true;
        mode.innerText = 'Paint'
        ctx.fillStyle = ctx.strokeStyle
    }
}

function handleCanvasClick(){
    if (filling){
        ctx.fillRect(0,0, canvas.height, canvas.width)
    }
}

function handleCM(event) {
    event.preventDefault();
  }
  
function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}



if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', stopPainting)
    canvas.addEventListener('mouseleave', stopPainting)
    canvas.addEventListener('click', handleCanvasClick)
    canvas.addEventListener("contextmenu", handleCM);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if(range){
    range.addEventListener('change', handleRange)
}

if(mode){
    mode.addEventListener('click', handleMode)
}

Array.from(colors).forEach(color => color.addEventListener('click', changeColor));