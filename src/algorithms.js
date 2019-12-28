import Vertex from './graph.js'
import Edge from './graph.js'


//returns the next closest vertex - updates neighbour distances
function dijkstra(unprocessedVertices){
  //represent current vertex index
  var currentIndex = findIndexOfMinDist(unprocessedVertices)
  //if cureentIndex === -1 no other vertex is reachable
  if(currentIndex===-1){
    return null;
  }
  //use variable 'u' to represent current vertex index
  var u = unprocessedVertices.splice(currentIndex,1)[0] //remove vertex from vertexSet and store in u


  for(var j = 0; j < u.edges.length; j++){
      const v = u.edges[j] //use variable 'v' for current edge

      const alt = u.dist + v.cost
      if(v.neighbourVertex.dist==null || alt < v.neighbourVertex.dist){
        v.neighbourVertex.dist = alt
        v.neighbourVertex.prev = u
      }
  }

  return u;
}



function dijkstraOld(graph, sourceIndex, targetIndex){

  //determine size of each row in the graph - assumes graph is square grid
  const rowLength = Math.ceil(Math.sqrt(graph.length))

  //initialise vertex set
  const vertexSet = []
  for(var i =0; i < graph.length; i++){
    let isVisitable
    if(graph[i]!==3){
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

  //initialise array to store all processed vertices
  var processedVerticies = []

  //set distace to source vertex to 0
  vertexSet[sourceIndex].dist=0

  while(vertexSet.length>0){

    //represent current vertex index
    var currentIndex = findIndexOfMinDist(vertexSet)
    //if cureentIndex === -1 no other vertex is reachable
    if(currentIndex===-1){
      break;
    }
    //use variable 'u' to represent current vertex index
    var u = vertexSet.splice(currentIndex,1)[0] //remove vertex from vertexSet and store in u

    //if currentVertex is the target vertex, stop early
    if(u.id===targetIndex){
      processedVerticies.push(u)
      break;
    }


    for(var j = 0; j < u.edges.length; j++){
        const v = u.edges[j] //use variable 'v' for current edge

        const alt = u.dist + v.cost
        if(v.neighbourVertex.dist==null || alt < v.neighbourVertex.dist){
          v.neighbourVertex.dist = alt
          v.neighbourVertex.prev = u
        }
    }

    processedVerticies.push(u)

  }

  var processedVertexIds = processedVerticies.slice().map(a => a.id);

  //array with indices of vertices on shortest path to target
  const pathToTarget = []
  var t = processedVerticies.pop()

  //if target is not found
  if(t.id!==targetIndex){
    console.log("No path from source to target")
    return [];
  }

  while(t!==null){
    pathToTarget.unshift(t.id)
    t = t.prev
  }

  //console.log("Path to target:", pathToTarget)
  return [processedVertexIds, pathToTarget]
}


function findIndexOfMinDist(vertexSet){
    var minDist = 1000000000; //some large number
    var indexOfMin = -1 // if -1 is returned, no min was found

    for(var i=0; i < vertexSet.length; i++){
      const dist = vertexSet[i].dist
      if(dist===null){
        continue; //dont consider distance if it is null
      }
      if(dist< minDist){
        minDist = dist
        indexOfMin = i
      }
    }
    return indexOfMin
}

export default dijkstra
