// Get the canvas element and its context
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
let isDragging = false;
let dragStartX, dragStartY;
let selectedShape = null;

const selected_mes = "No Node selected"
const selected_shape_id = document.getElementById("selected_shape_id")
let graph = new Graph()
let shapes = new Map()


function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let [key, value] of shapes) {
    shapes.get(key).draw(context);
  }

}

function getMousePos(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function onMouseDown(event) {
  const mousePos = getMousePos(canvas, event);
  for (let [key, value] of shapes) {
    selectedShape = shapes.get(key);
    if (selectedShape instanceof Arrow || selectedShape instanceof Line) {
      selectedShape = null;
      selected_shape_id.innerText = selected_mes
      return
      
    }
    if (selectedShape.is_in_shape(mousePos.x, mousePos.y) ) {
      selected_shape_id.innerText = key
      dragStartX = mousePos.x - selectedShape.x;
      dragStartY = mousePos.y - selectedShape.y;
      isDragging = true;
      return
    }
  }


}

function onMouseMove(event) {
  if (isDragging) {
    const mousePos = getMousePos(canvas, event);
    selectedShape.x = mousePos.x - dragStartX;
    selectedShape.y = mousePos.y - dragStartY;
    draw();
  }
}

function onMouseUp(event) {
  isDragging = false;
  selectedShape = null;
}

draw();

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);
