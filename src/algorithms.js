import Vertex from './graph.js'
import Edge from './graph.js'


//returns the next closest vertex - updates neighbour distances
export default function dijkstra(unprocessedVertices){
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

      const alt = u.fcost + v.cost
      if(v.neighbourVertex.fcost==null || alt < v.neighbourVertex.fcost){
        v.neighbourVertex.fcost = alt
        v.neighbourVertex.prev = u
      }
  }

  return u;
}


//returns the next closest vertex - updates neighbour fcosts
export function a_star(unprocessedVertices){
  //represent current vertex index
  var currentIndex = findIndexOfMinTotalCost(unprocessedVertices)
  //if cureentIndex === -1 no other vertex is reachable
  if(currentIndex===-1){
    return null;
  }
  //use variable 'u' to represent current vertex index
  var u = unprocessedVertices.splice(currentIndex,1)[0] //remove vertex from vertexSet and store in u


  //update neighbour fcosts if better route found
  for(var j = 0; j < u.edges.length; j++){
      const v = u.edges[j] //use variable 'v' for current edge

      const alt = u.fcost + v.cost
      if(v.neighbourVertex.fcost==null || alt < v.neighbourVertex.fcost){
        v.neighbourVertex.fcost = u.fcost + v.cost
        v.neighbourVertex.prev = u
      }
  }

  return u;
}


export function depth_first(prevVertex){

    //may happen if no source or target index
    if(prevVertex===undefined){
      return null
    }

    var nextVertex = null
    for(var j = 1; j< prevVertex.edges.length+1; j++){
        // do this to control which search direction is prefered
        var i = j% prevVertex.edges.length
        // check if neighbour has been visited before
        if(prevVertex.edges[i].neighbourVertex.fcost===null){
          nextVertex = prevVertex.edges[i].neighbourVertex
          nextVertex.fcost = 1 //assign a arbitary value of 1 to indicate vertex has been visited
          nextVertex.prev = prevVertex
          return nextVertex
        }
    }

    var backtrackVertex = prevVertex.prev
    while(backtrackVertex!==null){

      for(var j = 1; j< backtrackVertex.edges.length+1; j++){
          // do this to control which search direction is prefered
          var i = j% backtrackVertex.edges.length
          // check if neighbour has been visited before
          if(backtrackVertex.edges[i].neighbourVertex.fcost===null){
            nextVertex = backtrackVertex.edges[i].neighbourVertex
            nextVertex.fcost = 1 //assign a arbitary value of 1 to indicate vertex has been visited
            nextVertex.prev = backtrackVertex
            return nextVertex
          }
      }
      backtrackVertex = backtrackVertex.prev
    }

    return nextVertex
}

//returns the next closest vertex
export function greedy_best_first(unprocessedVertices){
  //represent current vertex index
  var currentIndex = findIndexOfMinHCost(unprocessedVertices)
  //if cureentIndex === -1 no other vertex is reachable
  if(currentIndex===-1){
    return null;
  }
  //use variable 'u' to represent current vertex index
  var u = unprocessedVertices.splice(currentIndex,1)[0] //remove vertex from vertexSet and store in u

  //mark all neighbour as visited by setting fcost=1
  for(var j = 0; j < u.edges.length; j++){
      const v = u.edges[j] //use variable 'v' for current edge

      const alt = u.fcost + v.cost
      if(v.neighbourVertex.fcost===null){
        v.neighbourVertex.fcost = 1 //indicates vertex has been visited
        v.neighbourVertex.prev = u
      }
  }

  return u;
}



function findIndexOfMinDist(vertexSet){
    var minDist = 1000000000; //some large number
    var indexOfMin = -1 // if -1 is returned, no min was found

    for(var i=0; i < vertexSet.length; i++){
      const dist = vertexSet[i].fcost
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

function findIndexOfMinTotalCost(vertexSet){
    var minDist = 1000000000; //some large number
    var indexOfMin = -1 // if -1 is returned, no min was found

    for(var i=0; i < vertexSet.length; i++){
      const dist = vertexSet[i].getTotalCost()
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

function findIndexOfMinHCost(vertexSet){
    var minDist = 1000000000; //some large number
    var indexOfMin = -1 // if -1 is returned, no min was found

    for(var i=0; i < vertexSet.length; i++){
      const dist = vertexSet[i].fcost
      if(dist===null){
        continue; //dont consider distance if it is null
      }
      const hcost = vertexSet[i].hcost
      if(hcost< minDist){
        minDist = hcost
        indexOfMin = i
      }
    }
    return indexOfMin
}
