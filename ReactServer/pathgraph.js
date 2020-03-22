const graph = {
    vertices: ["A", "B", "C", "D", "E", "F" ,"G"],
    edges: [
      { u: "A", v: "B", w: 2 },
      { u: "B", v: "A", w: 2 },

      { u: "A", v: "C", w: 2 },
      { u: "C", v: "A", w: 2 },

      { u: "B", v: "C", w: 3 },
      { u: "C", v: "B", w: 3 },

      { u: "B", v: "D", w: 3 },
      { u: "D", v: "B", w: 3 },

      { u: "B", v: "E", w: 1 },
      { u: "E", v: "B", w: 1 },

      { u: "C", v: "F", w: 4 },
      { u: "F", v: "C", w: 4 },

      { u: "C", v: "G", w: 1.5 },
      { u: "G", v: "C", w: 1.5 },

    ]
};

function BellmanFord(vertices, edges, source){
    let distance = {};
    let predecessor = {};

    vertices.map(v => {
        distance[v] = Infinity;
        predecessor[v] = null;
    });

    distance[source] = 0;

    for (let i = 1; i < vertices.length; i++){
        for(let {u, v, w} of edges){
            if(distance[u] + w < distance[v]){
                distance[v] = distance[u] + w;
                predecessor[v] = u;
            }
        }
    }

    for (let {u, v, w} of edges){
        if(distance[u] + w < distance[v]){
            throw 'Graph contains a negative-weight cycle';
        }
    }
    
    return {distance, predecessor};
}

function findRoute (){
    
    let searchresult = [];
    let pathS = [];

    this.definresult = function(vertices, edges, start){
        let result = BellmanFord(vertices, edges, start);
        searchresult = result.predecessor;
    }

    this.printPath = function(finalV) {
        let result = printPath(searchresult, finalV, pathS);
        result.push(finalV);
        return result;
    }
}

// Recursive Function to print path 
const printPath = (predecessor, finalV, pathS) => {
    if(predecessor[finalV] !== null){
        printPath(predecessor, predecessor[finalV], pathS);
        pathS.push(predecessor[finalV]);
    } 
    return pathS;
}


exports.countPath = (start, end) => {
    const newgraph = new findRoute();
    // 起始點
    newgraph.definresult(graph.vertices, graph.edges, start);
    // 結束點
    return newgraph.printPath(end);
}



