class Graph {
  constructor() {
    this.nodes = new Map();
    
  }

  addNode(Node) {
    if (!this.nodes.has(Node)) {
      this.nodes.set(Node, new Set());
      return 1
    }
    return 0
  }

  deleteNode(Node) {
    if (this.nodes.has(Node)) {
      // delete all edges to the Node
      for (let [v, edges] of this.nodes) {
        edges.delete(Node);
      }
      // delete the Node itself
      this.nodes.delete(Node);
    }
  }

  addEdge(Node1, Node2) {
    if (this.nodes.has(Node1) && this.nodes.has(Node2)) {
      // add edges in both directions (undirected graph)
      this.nodes.get(Node1).add(Node2);
      //this.nodes.get(Node2).add(Node1);
     
      return 1
    }
    return 0


  }

  deleteEdge(Node1, Node2) {
    if (this.nodes.has(Node1) && this.nodes.has(Node2)) {
      // remove edges in both directions (undirected graph)
      this.nodes.get(Node1).delete(Node2);
      //this.nodes.get(Node2).delete(Node1);
     
    }
  }
}



/*
const graph = new Graph();

graph.addNode('A');
graph.addNode('B');
graph.addNode('C');

graph.addEdge('A', 'B');
graph.addEdge('B', 'C');

console.log(graph.vertices); // Map { 'A' => Set { 'B' }, 'B' => Set { 'A', 'C' }, 'C' => Set { 'B' } }

graph.deleteEdge('B', 'C');

console.log(graph.vertices); // Map { 'A' => Set { 'B' }, 'B' => Set { 'A' }, 'C' => Set {} }

graph.deleteNode('A');

console.log(graph.vertices); // Map { 'B' => Set {}, 'C' => Set {} }
 
*/