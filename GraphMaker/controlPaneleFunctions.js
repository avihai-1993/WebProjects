
//set up 
const label_node_id = document.getElementById("label-node-id")
const color_select = document.getElementById("color")
const size_input = document.getElementById("size")
const shape_select = document.getElementById("shape-select")
const edge_from_node = document.getElementById("edge-from-node-id")
const edge_to_node = document.getElementById("edge-to-node-id")


function addNode(){
    addNode1(graph,shapes)
}
function addNode1(graph,shapes_map){
    let node_id = label_node_id.value
    if (node_id == null || node_id == undefined || node_id.trim() === ""){
        alert("no ID !!!")
        return
    }
    let s = null
    let size = 42
    try{
         size = parseInt(size_input.value)
    }catch{
        alert("size is not a numbe")
        return
    }
    
    switch (shape_select.value) {
        case "circle":
            s = new Circle(200, 300, size, color_select.value,node_id);
           
         break
        case "square":
            s =  new Rectangle(50, 50, size, size,color_select.value,node_id);
         break
    }
    if (graph.addNode(node_id) == 1){
        shapes_map.set(node_id, s)
        draw()
    } 
    else{
        alert("this ID already exists!!!")
        return 
    }

    
}

function addEdge(){
    addEdge1(graph,shapes)
}

function addEdge1(graph,shapes_map){
    let node_id_from = edge_from_node.value
    let node_id_to = edge_to_node.value
    if (node_id_from == null || node_id_from == undefined || node_id_from.trim() === ""){
        alert("no ID from !!!")
        return
    }
    if (node_id_to == null || node_id_to == undefined || node_id_to.trim() === ""){
        alert("no ID to !!!")
        return
    }
    if(graph.addEdge(node_id_from,node_id_to) == 1){
        let {x1,y1,x2,y2} = calc_lines(shapes_map.get(node_id_from),shapes_map.get(node_id_to))
        let id = node_id_from+"->"+node_id_to
        //let line = new Line(x1,y1,x2,y2, color_select.value, 3)
        let arrow = new Arrow(x1,y1,x2,y2, 10, 20, id);
        //shapes_map.set(id, line)
        shapes_map.set(id, arrow)
        draw()
    }
    else{
        alert("cannot connect nodes!!!")
        return 
    }
    
}

function deleteItem(){
    deleteItem1(graph,shapes)
}

function deleteItem1(graph,shapes){
    const shape_id = document.getElementById("selected_shape_id").innerText
    graph.deleteNode(shape_id)
    shapes.delete(shape_id)
    for (let [key, value] of shapes) {
        if (key.includes(shape_id) && (shapes.get(key) instanceof Arrow || shapes.get(key) instanceof Line ) ){
        shapes.delete(key)
        }
    }
    
    draw()

}

function calc_lines(s1,s2){
    let o = 0.2
    return {x1 : s1.x - o ,y1: s1.y - o, x2: s2.x - o,y2 : s2.y - o} 
}