/**
 * Provides the logic to determine the next vertex to visit from a set of
 * vertices according to various pathfinding algorithms. The algorithms that are
 * including are: Dijkstra, A*, Depth first search and Greedy best first search.
 *
 * @summary Provides implementation of various pathfinding algorithms.
 * @author Jason Pilbrough <jasonpilbrough@gmail.com>
 *
 * Start date     : 2019-12-19
 */


 /**
  * @module algorithms
  */


import Vertex from './graph.js'
import Edge from './graph.js'


/**
 * Determines the next vertex to visit according to Dijkstra's algorithm.
 * Updates the distances to all neighbour vertices if a shorter route is found.
 *
 * @param {Vertex[]} unprocessedVertices - list of unvisited vertices
 * @return {Vertex} the next vertex to visit according to Dijkstra's algorithm
 */
export function dijkstra(unprocessedVertices){

  //find index of next node to visit
  var currentIndex = findIndexOfMinFcost(unprocessedVertices)

  //if currentIndex === -1, no other vertex is reachable
  if(currentIndex===-1){
    return null;
  }

  //use variable 'u' to represent next vertex to visit
  //remove vertex from vertexSet and store in u
  var u = unprocessedVertices.splice(currentIndex,1)[0]

  //loop over all neighbour vertices and update distances if better route is
  //found
  for(var j = 0; j < u.edges.length; j++){

      //use variable 'v' for current edge
      const v = u.edges[j]
      const alt = u.fcost + v.cost

      //check if neighbour hasnt been visited yet or if shorter route has been
      //found
      if(v.neighbourVertex.fcost==null || alt < v.neighbourVertex.fcost){
        v.neighbourVertex.fcost = alt
        v.neighbourVertex.prev = u
      }
  }

  //return next vertex to visit
  return u;
}


/**
 * Determines the next vertex to visit according to A*. Updates the distances
 * to all neighbour vertices if a shorter route is found.
 *
 * @param {Vertex[]} unprocessedVertices - list of unvisited vertices
 * @return {Vertex} the next vertex to visit according to A*
 */
export function a_star(unprocessedVertices){

  //find index of next node to visit
  var currentIndex = findIndexOfMinTotalCost(unprocessedVertices)

  //if currentIndex === -1, no other vertex is reachable
  if(currentIndex===-1){
    return null;
  }

  //use variable 'u' to represent next vertex to visit
  //remove vertex from vertexSet and store in u
  var u = unprocessedVertices.splice(currentIndex,1)[0] //remove vertex from vertexSet and store in u


  //loop over all neighbour vertices and update distances if better route is
  //found
  for(var j = 0; j < u.edges.length; j++){

      //use variable 'v' for current edge
      const v = u.edges[j]

      //check if neighbour hasnt been visited yet or if shorter route has been
      //found
      const alt = u.fcost + v.cost
      if(v.neighbourVertex.fcost==null || alt < v.neighbourVertex.fcost){
        v.neighbourVertex.fcost = u.fcost + v.cost
        v.neighbourVertex.prev = u
      }
  }

  //return next vertex to visit
  return u;
}


/**
 * Determines the next vertex to visit according to depth-first search algorithm.
 *
 * @param {Vertex} prevVertex - referance to previous vertex that was visited
 * @return {Vertex} the next vertex to visit according to depth-first search
 */
export function depth_first(prevVertex){

    //may happen if no source or target index
    if(prevVertex===undefined){
      return null
    }

    var nextVertex = null

    //iterate over each vertex of prevVertex, and visit first one that hasnt
    //been visited yet
    for(var j = 1; j< prevVertex.edges.length+1; j++){
        // starting iteration with different value for j will determine which
        // search direction is prefered
        var i = j % prevVertex.edges.length

        // check if neighbour has been visited before
        if(prevVertex.edges[i].neighbourVertex.fcost===null){
            nextVertex = prevVertex.edges[i].neighbourVertex

            //assign a arbitary value of 1 to indicate vertex has been visited
            nextVertex.fcost = 1

            nextVertex.prev = prevVertex
            return nextVertex
        }
    }

    //at this point in the algorithm the path has reached a dead-end, so start
    //backtracking until a vertex has another path to follow
    var backtrackVertex = prevVertex.prev

    //stop backtracking if returned back to source vertex
    while(backtrackVertex!==null){

      //iterate over each vertex of currentVertex, and visit first one that
      //hasnt been visited yet
      for(var j = 1; j< backtrackVertex.edges.length+1; j++){

          //do this to control which search direction is prefered
          var i = j% backtrackVertex.edges.length

          // check if neighbour has been visited before
          if(backtrackVertex.edges[i].neighbourVertex.fcost===null){
              nextVertex = backtrackVertex.edges[i].neighbourVertex
              //assign a arbitary value of 1 to indicate vertex has been visited
              nextVertex.fcost = 1
              nextVertex.prev = backtrackVertex
              return nextVertex
          }
      }

      //if no unvisited vertex was found, backtrack up another level to parent
      backtrackVertex = backtrackVertex.prev
    }

    //if algorithm reaches here, no more paths to explore, return null
    return nextVertex
}

/**
 * Determines the next vertex to visit according to greedy_best_first algorithm.
 *
 * @param {Vertex[]} unprocessedVertices - list of unvisited vertices
 * @return {Vertex} the next vertex to visit according to be greedy best first search
 */
export function greedy_best_first(unprocessedVertices){

  //find index of next vertex to visit
  var currentIndex = findIndexOfMinHCost(unprocessedVertices)

  //if currentIndex === -1, no other vertex is reachable
  if(currentIndex===-1){
    return null;
  }

  //use variable 'u' to represent next vertex to visit
  //remove vertex from vertexSet and store in u
  var u = unprocessedVertices.splice(currentIndex,1)[0] //remove vertex from vertexSet and store in u

  //loop over all neighbour vertices and mark all neighbour as reachable by
  //setting fcost=1
  for(var j = 0; j < u.edges.length; j++){

      //use variable 'v' for current edge
      const v = u.edges[j]

      //check if neighbour hasnt been visited yet
      if(v.neighbourVertex.fcost===null){
        v.neighbourVertex.fcost = 1 //indicates vertex has been visited
        v.neighbourVertex.prev = u
      }
  }

  //return next vertex to visit
  return u;
}


/**
 * Determines the index of a vertex in a set with the lowest fcost (i.e the
 * shortest distance to the source vertex)
 *
 * @param {Vertex[]} vertexSet - set of vertices to search
 * @return {Vertex} the vertex with the lowest fcost
 */
function findIndexOfMinFcost(vertexSet){

    //initialise to some large number
    var minDist = 1000000000;

    //if -1 is returned, no min vertex was found
    var indexOfMin = -1

    for(var i=0; i < vertexSet.length; i++){
      const dist = vertexSet[i].fcost

      //dont consider distance if it is null
      if(dist===null){
        continue;
      }

      if(dist< minDist){
        minDist = dist
        indexOfMin = i
      }
    }

    return indexOfMin
}


/**
 * Determines the index of a vertex in a set with the lowest total cost (i.e the
 * sum of fcost and hcost)
 *
 * @param {Vertex[]} vertexSet - set of vertices to search
 * @return {Vertex} the vertex with the lowest total cost
 */
function findIndexOfMinTotalCost(vertexSet){

    //initialise to some large number
    var minDist = 1000000000;

    //if -1 is returned, no min vertex was found
    var indexOfMin = -1

    for(var i=0; i < vertexSet.length; i++){
      const dist = vertexSet[i].getTotalCost()

      //dont consider distance if it is null
      if(dist===null){
        continue;
      }
      if(dist< minDist){
        minDist = dist
        indexOfMin = i
      }
    }

    return indexOfMin
}


/**
 * Determines the index of a vertex in a set with the lowest hcost (i.e the
 shortest distance to the target vertex)
 *
 * @param {Vertex[]} vertexSet - set of vertices to search
 * @return {Vertex} the vertex with the lowest hcost
 */
function findIndexOfMinHCost(vertexSet){

    //initialise to some large number
    var minDist = 1000000000;

    // if -1 is returned, no min vertex was found
    var indexOfMin = -1

    for(var i=0; i < vertexSet.length; i++){
      const dist = vertexSet[i].fcost

      //dont consider distance if it is null
      if(dist===null){
        continue;
      }

      const hcost = vertexSet[i].hcost
      if(hcost< minDist){
        minDist = hcost
        indexOfMin = i
      }
    }

    return indexOfMin
}
