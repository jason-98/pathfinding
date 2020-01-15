import {dijkstra, a_star, depth_first, greedy_best_first} from './algorithms.js'


/**
 * Class representing an individual vertex in a graph.
 */
export class Vertex{

  /**
   * Creates a vertex.
   * @param {number} id - A unique identifier for the vertex.
   * @param {number} isVisitable - Whether or not this vertex can be visited
   * (cant be visited if a wall has been placed at this vertex).
   */
  constructor(id,isVisitable){
    this.id = id;
    this.fcost = null;    //cost (or distance) from source node to this node
    this.hcost = null;    //heuristic cost - estimated cost to destination
    this.prev = null;     //reference to parent vertex
    this.edges = [];      //stores array of edges to neighbouring vertices
    this.isVisitable = isVisitable
  }

  /**
   * Returns the total cost associated with a vertex as the sum of fcost and
   * hcost.
   *
   * @return {number} The total cost associated with a vertex
   */
  getTotalCost(){
    if(this.fcost===null){
      return null
    }else{
      return this.fcost + this.hcost
    }
  }

}

/**
 * Class representing the connection between vertices in a graph. Edges belong
 * to one specific vertex, and point to each vertex that is connected to the
 * current vertex.
 */
export class Edge{

  /**
   * Creates a Edge.
   * @param {Vertex} neighbourVertex - The vertex that the edge is pointing to.
   * @param {number} cost - The cost associated with traversing this edge (i.e.
   * the distance between vertices).
   */
    constructor(neighbourVertex, cost){
      this.neighbourVertex = neighbourVertex;
      this.cost = cost;
    }
}


/**
 * Class representing a set of connected vertices. Assumes underlying structure
 * is a square grid.
 */
class Graph{
  /**
   * Creates a Graph.
   * @param {number} size - The number of vertices in the graph. Must be a
   * square number.
   * @param {number} sourceIndex - The index of the source vertex.
   * @param {number} targetIndex - The index of the target vertex.
   * @param {string} algorithm - The name of the algorithm to use for
   * pathfinding. The accepted algorithms are: "dijkstra", "a-star",
   * "depth-first" and "greedy-best-first".
   */
  constructor(size, sourceIndex, targetIndex, algorithm){
    this.size = size;
    this.sourceIndex = sourceIndex;
    this.targetIndex = targetIndex;
    this.algorithm = algorithm;

    //mask indicating the positions of walls in the graph -   0 corresponds to
    //no wall at a given index, 1 corresponds to wall at index
    this.wallMask = Array(size).fill(0)

    //generate a set of vertices and store them in a list
    this.unprocessedVertices = this.build(this.wallMask, sourceIndex, targetIndex, algorithm);

    //set distance to source vertex to 0
    this.unprocessedVertices[sourceIndex].fcost=0

    //list to store vertices after they have been visited/processed
    this.processedVerticies = []

    //stores where the pathfinding algorithm is finished. Will be true if a path
    //has been found, or if no more vertices remain.
    this.finished = false;

    //weighting on a-star heuristic function - defaults to 1
    this.eplison = 1
  }

  /**
   * Builds vertex set.
   * @param {number[]} wallmask - mask indicating the positions of walls in the
   * graph -   0 corresponds to no wall at a given index, 1 corresponds to wall
   * at index.
   * @param {number} sourceIndex - The index of the source vertex.
   * @param {number} targetIndex - The index of the target vertex.
   * @param {string} algorithm - The name of the algorithm to use for
   * pathfinding. The accepted algorithms are: "dijkstra", "a-star",
   * "depth-first" and "greedy-best-first".
   * @return {Vertex[]} Generated vertex set. Will return an empty set if no
   * start or target index provided.
   */
  build(wallMask, sourceIndex, targetIndex, algorithm){

    //if no sourceIndex or targetIndex is set return empty set []
    if(sourceIndex===-1 || targetIndex===-1){
      return []
    }

    //determine size of each row in the graph - assumes graph is square grid
    const rowLength = Math.ceil(Math.sqrt(this.size))

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



    //determine all neighbours, and compute hcost if applicable
    for(var m = 0; m < vertexSet.length; m++){

      //interpret m as bxb matrix
      const rowIndex = Math.floor(m/rowLength)
      const colIndex = m % rowLength

      //loop over neighbouring vertexes (accounting for edge cases), and add to
      //current vertex neighbour list
      for(var n = Math.max(rowIndex-1,0); n <= Math.min(rowIndex+1, rowLength-1); n++){
        for(var p = Math.max(colIndex-1,0); p <= Math.min(colIndex+1, rowLength-1); p++){

          //dont want to add currentVertex as a neighbour to itself
          if(n===rowIndex && p===colIndex){
            continue;
          }

          //determine if current neighbour is connected to current Vertex by diagonal
          const isDiagonal = n!==rowIndex && p!==colIndex
          const neighbour = vertexSet[n*rowLength+p]

          //only add to list of neighbours if able to visit
          if(neighbour.isVisitable){
              //diagonal has cost of sqrt(2) = 1.414
              vertexSet[m].edges.push(new Edge(neighbour, isDiagonal ? 1.414 : 1))
          }

        }
      }

      //must add h-cost for a-star and greedy best first search algorithm - NB
      //no eplison scaling factor for best-first
      if(algorithm==="a-star"){
        //interpret m as bxb matrix
        const targetRowIndex = Math.floor(targetIndex/rowLength)
        const targetColIndex = targetIndex % rowLength

        //h-cost is calculated as straight line distance between current node
        //and target node (ignoring walls)
        const hcost = Math.sqrt(Math.pow(rowIndex-targetRowIndex,2)+Math.pow(colIndex - targetColIndex,2))
        vertexSet[m].hcost = this.eplison * hcost

      } else if(algorithm==="greedy-best-first"){
        //interpret m as bxb matrix
        const targetRowIndex = Math.floor(targetIndex/rowLength)
        const targetColIndex = targetIndex % rowLength

        //h-cost is calculated as straight line distance between current node
        //and target node (ignoring walls)
        const hcost = Math.sqrt(Math.pow(rowIndex-targetRowIndex,2)+Math.pow(colIndex - targetColIndex,2))
        vertexSet[m].hcost = hcost //no eplison scaling factor
      }
    }

    return vertexSet;
  }


  /**
   * Processes the next vertex as determined by the selected pathfinding
   * algorithm. Moves the processed vertex from unprocessedVertices set to
   * processedVerticies set. Sets finished flag to true if path has been found
   * or no more vertices ti process.
   */
  processNextVertex(){
    if(this.finished){
      console.log("All reachable verticies have already been processed")
      return null;
    }

    let nextClosestVertex =null

    if(this.algorithm==="a-star"){
        nextClosestVertex = a_star(this.unprocessedVertices)

    } else if(this.algorithm==="depth-first"){
        if(this.sourceIndex!==-1 && this.targetIndex!==-1){
          //if this is the first time time this function is called, add source
          //vertex
          if(this.processedVerticies.length===0){
            this.processedVerticies.push(this.unprocessedVertices[this.sourceIndex])
          }
          //pass the last vertex that was processed
          nextClosestVertex = depth_first(this.processedVerticies[this.processedVerticies.length-1])
        }

    } else if(this.algorithm==="greedy-best-first"){
        nextClosestVertex = greedy_best_first(this.unprocessedVertices)

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


  /**
   * Processes all vertices in set until path is found, or no more remaining
   * vertices.
   */
  processAllVerticies(){
    while(!this.isFinished()){
      this.processNextVertex()
    }
  }

  /**
   * Returns true if target vertex has been reached, or no other verticies
   * left to visit.
   * @return {boolean} True if pathfinding algorithm has completed.
   */
  isFinished(){
    return this.finished;
  }


  /**
   * Returns a list of vertices on the path from the source vertex to the target
   * vertex. Returns an empty list of no valid path.
   * @return {Vertex[]} Vertices on path from source to target.
   */
  getPath(){
    var processedVerticies = this.processedVerticies.slice();

    //array with indices of vertices on shortest path to target
    const pathToTarget = []

    //use variable 't' to represent current vertex on path. Remove current
    //vertex from list of processed vertices
    var t = processedVerticies.pop()

    //if t is underfined, no valid path, return empty list
    if(t===undefined){
      return []
    }

    //check if the target is on the path, if not then no path was found
    if(t.id!==this.targetIndex){
      return [];
    }

    //add vertex to path until source vertex is reached
    while(t!==null){
      pathToTarget.unshift(t.id)
      t = t.prev
    }

    return pathToTarget
  }

  /**
   * Converts graph into a sqaure grid representation to display. At each
   * position in the grid a number is used to indicate the type of tile present.
   * The available type are: 1=sourceTile, 2=targetTile, 3=wallTile, 4=pathTile
   * 5=visitedTile.
   * @return {Vertex[]} Square grid representation of graph
   */
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

    //show shortest path, if one was found
    const pathToTarget = this.getPath()
    if(pathToTarget!==null){
      for(var k = 0; k<pathToTarget.length;k++){
        const currentVertex = pathToTarget[k]
        grid[currentVertex] = 4

      }
    }

    //show source and target tiles
    grid[this.sourceIndex] = 1
    grid[this.targetIndex] = 2;

    return grid

  }

  /**
   * Returns all vertices to unprocessed state, but does not clear walls.
   */
  reset(){

    //build new vertexSet
    this.unprocessedVertices = this.build(this.wallMask, this.sourceIndex, this.targetIndex, this.algorithm);

    //check if there is a start index set, and set distance to source vertex to 0
    if(this.unprocessedVertices.length!==0){
      this.unprocessedVertices[this.sourceIndex].fcost=0
    }

    this.processedVerticies = []
    this.finished = false;

  }

  /**
   * Clears all walls, and returns all vertices to unprocessed state.
   */
  clear(){
    this.wallMask = Array(this.size).fill(0)
    this.reset()
  }

  /**
   * Changes the current algorithm being used for pathfinding.
   * @param {string} algorithm - The name of the algorithm to use for
   * pathfinding. The accepted algorithms are: "dijkstra", "a-star",
   * "depth-first" and "greedy-best-first".
   */
  changeAlgorithm(algorithm){
    this.algorithm = algorithm;
    this.reset()
    this.processAllVerticies()
  }

  /**
   * Changes the value of epsilon used to weight the heuristic function for A*.
   * @param {number} value - The new value for epsilon.
   */
  changeEpsilon(value){
    this.eplison = value
    this.reset()
    this.processAllVerticies()
  }

  //
  /**
   * Handles the resize board, removing walls as neccessary, while attempting to
   * maintaining position of source/target tiles. Returns all vertices to
   * unprocessed state.
   * @param {number} size - The new size of the graph. Must be a square number.
   */
  resize(size){

    //keep record of previous size
    const prevSize = this.size;

    //update to new size
    this.size = size;

    //determine size of each row in the previous graph and the new graph -
    //assumes graph is square grid
    const prevRowLength = Math.ceil(Math.sqrt(prevSize))
    const prevNumRows = prevRowLength //assumes square grid
    const newRowLength = Math.ceil(Math.sqrt(size))
    const newNumRows = newRowLength //assumes square grid

    //determine row and column of target in previous grid
    const prevTarget = this.targetIndex;
    const prevTargetRow = Math.floor(prevTarget/prevRowLength)
    const prevTargetCol = prevTarget%prevRowLength

    //determine row and colum of target in new grid
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

    //determine row and column of source in previous grid
    const prevSource = this.sourceIndex;
    const prevSourceRow = Math.floor(prevSource/prevRowLength)
    const prevSourceCol = prevSource%prevRowLength

    //determine row and colum of target in new grid
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

    //check that source and target are on same square after resize
    if(this.sourceIndex===this.targetIndex){
      // if they are on same square, move source 1 square to left
      this.sourceIndex -= 1
    }

    const newWallMask = Array(size).fill(0)

    //update wallmask to remove walls that are no longer present.
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

  /**
   * Changes index of the source vertex in the grid. Returns all vertices to
   * unprocessed state.
   * @param {number} i - The new source vertex index.
   */
  changeSourceIndex(i){
    this.sourceIndex = i
    this.reset()
    this.processAllVerticies()
  }

  /**
   * Changes index of the target vertex in the grid. Returns all vertices to
   * unprocessed state.
   * @param {number} i - The new target vertex index.
   */
  changeTargetIndex(i){
    this.targetIndex = i
    this.reset()
    this.processAllVerticies()
  }


  /**
   * Updates the wallmask to indicate that a wall is present to the specified
   * index in the grid. Re-processes all vertices.
   * @param {number} i - The index of the new wall.
   */
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

  /**
   * Updates the wallmask to indicate that a wall is no longer present at the
   * specified index in the grid. Re-processes all vertices.
   * @param {number} i - The index of the wall to remove.
   */
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

  /**
   * Determines if a wall is present at a given index in the grid.
   * @return {boolean} True if a wall is present at the given index.
   */
  isWall(i){

    const wallMask = this.wallMask.slice();

    if(wallMask[i] === 1){
      return true
    }else{
      return false
    }

  }

}

export default Graph;
