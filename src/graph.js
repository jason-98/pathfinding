
import dijkstra, {a_star} from './algorithms.js'


export class Vertex{
  constructor(id,isVisitable){
    this.id = id;
    this.fcost = null;  //cost (or distance) from source node to this node
    this.hcost = null;  //heuristic cost - estimated cost to destination
    this.prev = null;
    this.edges = []; // stores array of edges to neighbouring vertices
    this.isVisitable = isVisitable
  }

  getTotalCost(){
    if(this.fcost===null){
      return null
    }else{
      return this.fcost + this.hcost
    }
  }

}

export class Edge{
    constructor(neighbourVertex, cost){
      this.neighbourVertex = neighbourVertex;
      this.cost = cost;
    }
}

export default class Graph{

  //algorithm options are dijkstra and a-star
  constructor(size, sourceIndex, targetIndex, algorithm){
    this.size = size;
    this.sourceIndex = sourceIndex;
    this.targetIndex = targetIndex;
    this.algorithm = algorithm;

    // 0 corresponds to no wall at a given index, 1 corresponds to wall at index
    this.wallMask = Array(size).fill(0)

    this.unprocessedVertices = this.build(this.wallMask, sourceIndex, targetIndex, algorithm);

    //set distace to source vertex to 0
    this.unprocessedVertices[sourceIndex].fcost=0

    this.processedVerticies = []
    this.finished = false;

    this.eplison = 1 //weighting on a-star heuristic function - defaults to 1
  }

  build(wallMask, sourceIndex, targetIndex, algorithm){

    //if no sourceIndex or targetIndex is set return empty list []
    if(sourceIndex===-1 || targetIndex===-1){
      return []
    }

    //determine size of each row in the graph - assumes graph is square grid
    const rowLength = Math.ceil(Math.sqrt(this.size))

    //initialise vertex set
    const vertexSet = []
    for(var i =0; i < this.size; i++){
      let isVisitable
      if(wallMask[i]===0 || i===targetIndex){ //no wall
        isVisitable = true
      }else{
        isVisitable = false;
      }


      vertexSet.push(new Vertex(i,isVisitable))
    }



    //determine all neighbours, and add h-cost (a-star only)
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
              vertexSet[m].edges.push(new Edge(neighbour, isDiagonal ? 1.414 : 1)) //diagonal has cost of sqrt(2) = 1.414
          }

        }
      }

      //must add h-cost for a-star algorithm
      if(algorithm==="a-star"){
        const targetRowIndex = Math.floor(targetIndex/rowLength) //interpret m as bxb matrix
        const targetColIndex = targetIndex % rowLength  //interpret m as bxb matrix

        //h-cost is calculated as distance between current node and target node (ignoring walls)
        const hcost = Math.sqrt(Math.pow(rowIndex-targetRowIndex,2)+Math.pow(colIndex - targetColIndex,2))
        vertexSet[m].hcost = this.eplison * hcost
      }
    }

    return vertexSet;
  }


  processNextVertex(){
    if(this.finished){
      console.log("All reachable verticies have already been processed")
      return null;
    }

    let nextClosestVertex
    if(this.algorithm==="a-star"){
        nextClosestVertex = a_star(this.unprocessedVertices)
    } else { //else use dijkstra
        nextClosestVertex = dijkstra(this.unprocessedVertices)
    }


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

  //return all verticies to unprocessed state, do not reset board (i.e. keep walls)
  reset(){

    this.unprocessedVertices = this.build(this.wallMask, this.sourceIndex, this.targetIndex, this.algorithm);

    // check if there is a start index set
    if(this.unprocessedVertices.length===0){
        this.processedVerticies = []
        this.finished = false;
    } else{
        //set distace to source vertex to 0
        this.unprocessedVertices[this.sourceIndex].fcost=0

        this.processedVerticies = []
        this.finished = false;
    }


  }

  //clear game board by removing all walls, and cll reset
  clear(){
    this.wallMask = Array(this.size).fill(0)
    this.reset()
  }

  changeAlgorithm(algorithm){
    this.algorithm = algorithm;
    this.reset()
    this.processAllVerticies()
  }

  changeEpsilon(value){
    this.eplison = value
    this.reset()
    this.processAllVerticies()
  }

  //handle resize board whileattempting to maintaining position of source/target squares
  resize(size){

    const prevSize = this.size;
    this.size = size;

    //determine size of each row in the graph - assumes graph is square grid
    const prevRowLength = Math.ceil(Math.sqrt(prevSize))
    const prevNumRows = prevRowLength //assumes square grid
    const newRowLength = Math.ceil(Math.sqrt(size))
    const newNumRows = newRowLength //assumes square grid

    const prevTarget = this.targetIndex;
    const prevTargetRow = Math.floor(prevTarget/prevRowLength)
    const prevTargetCol = prevTarget%prevRowLength

    const newTarget = prevTargetRow * newRowLength + prevTargetCol
    const newTargetRow = Math.floor(newTarget/newRowLength)
    const newTargetCol = newTarget%newRowLength

    //check if new target is outside bounds of new board
    if(prevTargetRow>=newRowLength && prevTargetCol>=newRowLength){
      //if outside bound below AND to right of board
      this.targetIndex = newRowLength * newRowLength -1
    } else if(prevTargetRow>=newRowLength){
      //if outside bound below board
      this.targetIndex = (newRowLength-1) * newRowLength + newTargetCol
    } else if(prevTargetCol>=newRowLength){
      //if outside bound to right of board
      this.targetIndex = (newTargetRow-1) * newRowLength + (newRowLength -1)
    } else{
      this.targetIndex = newTarget
    }

    const prevSource = this.sourceIndex;
    const prevSourceRow = Math.floor(prevSource/prevRowLength)
    const prevSourceCol = prevSource%prevRowLength

    const newSource = prevSourceRow * newRowLength + prevSourceCol
    const newSourceRow = Math.floor(newSource/newRowLength)
    const newSourceCol = newSource%newRowLength


    //check if new source is outside bounds of new board
    if(prevSourceRow>=newRowLength && prevSourceCol>=newRowLength){
      //if outside bound below AND to right of board
      this.sourceIndex = newRowLength * newRowLength -1
    } else if(prevSourceRow>=newRowLength){
      //if outside bound below board
      this.sourceIndex = (newRowLength-1) * newRowLength + newSourceCol
    } else if(prevSourceCol>=newRowLength){
      //if outside bound to right of board
      this.sourceIndex = (newSourceRow-1) * newRowLength + (newRowLength -1)
    } else{
      this.sourceIndex = newSource
    }

    //check that source and target are not on same square after resize
    if(this.sourceIndex===this.targetIndex){
      // if they are on same square, move source 1 square to left
      this.sourceIndex -= 1
    }

    const newWallMask = Array(size).fill(0)

    for(var i = 0; i < newWallMask.length; i++){
        const currentRowInNew = Math.floor(i/newRowLength)
        const currentColInNew = i%newRowLength

        if((currentColInNew+1)>prevRowLength){
          newWallMask[i]=0 //if the current col was no present in prev grid, set mask to 0
        }else if(this.wallMask[currentRowInNew*prevRowLength + currentColInNew]===1){
          newWallMask[i]=1
        }else{
          newWallMask[i]=0
        }
    }

    this.wallMask = newWallMask
    this.reset()


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


  placeWall(i){

    //do nothing if source or target square
    if(i===this.sourceIndex || i===this.targetIndex){
      return;
    }

    const wallMask = this.wallMask.slice();
    wallMask[i] = 1
    this.wallMask = wallMask

    //must reset and recalc verticies
    this.reset();
    this.processAllVerticies()


  }

  clearWall(i){

    //do nothing if source or target square
    if(i===this.sourceIndex || i===this.targetIndex){
      return;
    }

    const wallMask = this.wallMask.slice();
    wallMask[i] = 0
    this.wallMask = wallMask

    //must reset and recalc verticies
    this.reset();
    this.processAllVerticies()

  }

  isWall(i){

    const wallMask = this.wallMask.slice();

    if(wallMask[i] === 1){
      return true
    }else{
      return false
    }

  }

}
