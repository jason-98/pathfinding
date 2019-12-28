
import dijkstra from './algorithms.js'


export class Vertex{
  constructor(id,isVisitable){
    this.id = id;
    this.dist = null;
    this.prev = null;
    this.edges = []; // stores array of edges to neighbouring vertices
    this.isVisitable = isVisitable
  }

}

export class Edge{
    constructor(neighbourVertex,cost){
      this.neighbourVertex = neighbourVertex;
      this.cost = cost;
    }
}

export default class Graph{

  constructor(size, sourceIndex, targetIndex){
    this.size = size;
    this.sourceIndex = sourceIndex;
    this.targetIndex = targetIndex;

    // 0 corresponds to no wall at a given index, 1 corresponds to wall at index
    this.wallMask = Array(size).fill(0)

    this.unprocessedVertices = this.build(this.wallMask, sourceIndex);

    //set distace to source vertex to 0
    this.unprocessedVertices[sourceIndex].dist=0

    this.processedVerticies = []
    this.finished = false;
  }

  build(wallMask, sourceIndex){
    //determine size of each row in the graph - assumes graph is square grid
    const rowLength = Math.ceil(Math.sqrt(this.size))

    //initialise vertex set
    const vertexSet = []
    for(var i =0; i < this.size; i++){
      let isVisitable
      if(wallMask[i]===0){ //no wall
        isVisitable = true
      }else{
        isVisitable = false;
      }


      vertexSet.push(new Vertex(i,isVisitable))
    }

    //determine all neighbours
    for(var m = 0; m < vertexSet.length; m++){
      const rowIndex = Math.floor(m/rowLength) //interpret m as bxb matrix
      const colIndex = m % rowLength  //interpret m as bxb matrix
      //loop over neighbouring vertexes (accounting for edge cases), and add to current vertex neighbour list
      for(var n = Math.max(rowIndex-1,0); n <= Math.min(rowIndex+1, rowLength-1); n++){
        for(var p = Math.max(colIndex-1,0); p <= Math.min(colIndex+1, rowLength-1); p++){ //TODO handle if not square matrix
          if(n===rowIndex && p===colIndex){
            continue; //dont want to add currentVertex as a neighbour to itself
          }

          //determine if current neighbour is connected to current Vertex by diagonal
          const isDiagonal = n!==rowIndex && p!==colIndex
          const neighbour = vertexSet[n*rowLength+p]

          //only add to list of neighbours if able to visit
          if(neighbour.isVisitable){
              vertexSet[m].edges.push(new Edge(neighbour, isDiagonal ? 1.414 : 1)) //diagonal has cost of sqrt(2) = 1.14
          }

        }
      }
    }
    return vertexSet;
  }

  processNextVertex(){
    if(this.finished){
      console.log("All reachable verticies have already been processed")
      return null;
    }

    var nextClosestVertex = dijkstra(this.unprocessedVertices)

    //happens if no path from source to target
    if(nextClosestVertex===null){
        this.finished=true;
          console.log("No path from source to dest")
        return;
    }

    //if currentVertex is the target vertex, set isFinished to true
    if(nextClosestVertex.id===this.targetIndex){
      this.finished=true;
    }

    this.processedVerticies.push(nextClosestVertex)
  }

  processAllVerticies(){
    while(!this.isFinished()){
      this.processNextVertex()
    }
  }

  //returns true if targetIndex has been reached, or no other verticies to visit
  isFinished(){
    return this.finished;
  }

  getPath(){
    var processedVerticies = this.processedVerticies.slice();

    //array with indices of vertices on shortest path to target
    const pathToTarget = []
    var t = processedVerticies.pop()

    //check if no path exisits
    if(t===undefined){
      return []
    }

    //check if the target is on the path, if not then no path was found
    if(t.id!==this.targetIndex){
      return [];
    }

    while(t!==null){
      pathToTarget.unshift(t.id)
      t = t.prev
    }

    return pathToTarget
  }

  toGrid(){
    var grid = Array(this.size).fill(0)

    //show all walls
    for(var j = 0; j<this.wallMask.length;j++){
      if(this.wallMask[j]===1){
          grid[j] = 3
      }
    }

    //show all verticies that have been visited
    for(var i = 0; i<this.processedVerticies.length; i++){
      var currentVertex = this.processedVerticies[i].id;
      grid[currentVertex] = 5
    }

    //show shortest path
    const pathToTarget = this.getPath()
    //only show path if a path has been found
    if(pathToTarget!==null){
      for(var k = 0; k<pathToTarget.length;k++){
        const currentVertex = pathToTarget[k]
        grid[currentVertex] = 4

      }
    }


    grid[this.sourceIndex] = 1
    grid[this.targetIndex] = 2;

    return grid

  }

  reset(){

    this.unprocessedVertices = this.build(this.wallMask, this.sourceIndex);

    //set distace to source vertex to 0
    this.unprocessedVertices[this.sourceIndex].dist=0

    this.processedVerticies = []
    this.finished = false;

  }

  changeSourceIndex(i){
    this.sourceIndex = i
    this.reset()
    this.processAllVerticies()
  }

  changeTargetIndex(i){
    this.targetIndex = i
    this.reset()
    this.processAllVerticies()
  }

  toggleSquare(i){

    //do nothing if source or target square
    if(i===this.sourceIndex || i===this.targetIndex){
      return;
    }

    const wallMask = this.wallMask.slice();

    if(wallMask[i]===0){
        wallMask[i] = 1
    } else{
        wallMask[i] = 0
    }

    this.wallMask = wallMask

    //must reset and recalc verticies
    this.reset();
    this.processAllVerticies()

  }
}
