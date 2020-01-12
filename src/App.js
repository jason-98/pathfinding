import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { Container, Row, Col} from "shards-react";
import './App.css';
import Board from './Board.js';
import ControlPanel from './ControlPanel.js';
import Key from './Key.js';
import Header from './Header.js';
import Graph from './graph.js'

import {
  BrowserView,
  MobileView
} from "react-device-detect";

class App extends React.Component {

  constructor(props){
    super(props)

    const sourceIndex = 104
    const targetIndex = 286
    const defaultNumSquares = 625 //make this a sqaure number

    //algorithm options are dijkstra and a-star
    var graph = new Graph(defaultNumSquares,sourceIndex,targetIndex, "dijkstra")
    graph.processAllVerticies()

    this.state = {
          graph: graph,
          sourceIndex: sourceIndex,
          targetIndex: targetIndex,
          isSourceMoving: false, //is the source currently being moved by the user
          isTargetMoving: false, //is the target currently being moved by the user
    };

  }


  //this function calls itself repeatedly and updates state on step at a time
  animateSteps(graph){

    graph.processNextVertex()
    this.setState(this.state);

    //this is essential to allow board a chance to update between steps, think of this as a yield
    if(!graph.isFinished()){
      new Promise((resolve) => setTimeout(resolve, 0)).then(() => {
        this.animateSteps(graph)
      });
    }

}


  handleMouseDown(i){
    const squares = this.state.graph.toGrid()
    if(squares[i]===1){
      this.setState({
        graph: this.state.graph,
        sourceIndex: this.state.sourceIndex,
        targetIndex: this.state.targetIndex,
        isSourceMoving: true,
        isTargetMoving: this.state.isTargetMoving,

      });
    } else if(squares[i]===2){
      this.setState({
        graph: this.state.graph,
        sourceIndex: this.state.sourceIndex,
        targetIndex: this.state.targetIndex,
        isSourceMoving: this.state.isSourceMoving,
        isTargetMoving: true
      });
    }else{
      if(this.state.graph.isWall(i)){
        this.state.graph.clearWall(i)
      }else{
          this.state.graph.placeWall(i)
      }

      this.setState({
        graph: this.state.graph,
        sourceIndex: this.state.sourceIndex,
        targetIndex: this.state.targetIndex,
        isSourceMoving: this.state.isSourceMoving,
        isTargetMoving: this.state.isTargetMoving,
        //indicate if a wall has been placed, will continue to try and place walls until mouse is released
        placementIsWall: this.state.graph.isWall(i)
      });
    }


  }

 //only triggers if mouse is down as well
  handleMouseEnter(i){
    if(this.state.isSourceMoving){
        this.state.graph.changeSourceIndex(i)
    } else if(this.state.isTargetMoving){
        this.state.graph.changeTargetIndex(i)
    } else {
        if(this.state.placementIsWall===true){
          this.state.graph.placeWall(i)
        }else{
          this.state.graph.clearWall(i)
        }
    }

    this.setState(this.state);

  }


  handleMouseUp(i){

    if(this.state.isSourceMoving){
        this.setState({
          graph: this.state.graph,
          sourceIndex: this.state.sourceIndex,
          targetIndex: this.state.targetIndex,
          isSourceMoving: false,
          isTargetMoving: this.state.isTargetMoving,
        });
    } else if(this.state.isTargetMoving){
        this.setState({
          graph: this.state.graph,
          sourceIndex: this.state.sourceIndex,
          targetIndex: this.state.targetIndex,
          isSourceMoving: this.state.isSourceMoving,
          isTargetMoving: false
        });
    } else{
      this.setState(this.state);
    }

  }


  //replaces mouseEvents for mobile
  handleTouchStart(i){

    if(this.state.isSourceMoving){
        this.state.graph.changeSourceIndex(i)
        this.setState({
          graph: this.state.graph,
          sourceIndex: this.state.sourceIndex,
          targetIndex: this.state.targetIndex,
          isSourceMoving: false,
          isTargetMoving: this.state.isTargetMoving,
        });
    } else if (this.state.isTargetMoving){
        this.state.graph.changeTargetIndex(i)
        this.setState({
          graph: this.state.graph,
          sourceIndex: this.state.sourceIndex,
          targetIndex: this.state.targetIndex,
          isSourceMoving: this.state.isSourceMoving,
          isTargetMoving: false
        });
    }else{

      const squares = this.state.graph.toGrid()
      if(squares[i]===1){
        this.state.graph.changeSourceIndex(-1)
        this.setState({
          graph: this.state.graph,
          sourceIndex: this.state.sourceIndex,
          targetIndex: this.state.targetIndex,
          isSourceMoving: true,
          isTargetMoving: this.state.isTargetMoving,

        });
      } else if(squares[i]===2){
        this.state.graph.changeTargetIndex(-1)
        this.setState({
          graph: this.state.graph,
          sourceIndex: this.state.sourceIndex,
          targetIndex: this.state.targetIndex,
          isSourceMoving: this.state.isSourceMoving,
          isTargetMoving: true
        });
      } else {
          if(this.state.graph.isWall(i)){
              this.state.graph.clearWall(i)
          }else{
              this.state.graph.placeWall(i)
          }

          this.setState({
            graph: this.state.graph,
            sourceIndex: this.state.sourceIndex,
            targetIndex: this.state.targetIndex,
            isSourceMoving: this.state.isSourceMoving,
            isTargetMoving: this.state.isTargetMoving,
            //indicate if a wall has been placed, will continue to try and place walls until mouse is released
            placementIsWall: this.state.graph.isWall(i)
          });
      }

    }


  }


  handleAlgorithmChange(algorithm){
      this.state.graph.changeAlgorithm(algorithm)
      this.setState(this.state);
  }

  handleEpsilonChange(value){
    this.state.graph.changeEpsilon(value)
    this.setState(this.state);
  }


  handleRunPressed(){
      this.state.graph.reset()
      this.animateSteps(this.state.graph)
  }



  handleResetPressed(){

    const graph = this.state.graph

    //const sourceIndex = 0
    //const targetIndex = 208

    //graph.changeSourceIndex(sourceIndex)
    //graph.changeTargetIndex(targetIndex)
    graph.clear();
    graph.processAllVerticies()

    this.setState(this.state);


  }

  handleScreenResize() {
    console.log(window.innerWidth)
    let maxCols;
    if(window.innerWidth>768){
      maxCols = 25;
    }else{
      maxCols = 22
    }

    const numCols = Math.min(Math.round((window.innerWidth-50)/23.0),maxCols)
    const numSquares = Math.pow(numCols,2) //NB numSquares must be a square number

    this.state.graph.resize(numSquares)
    this.state.graph.processAllVerticies()

    /*
    var graph = new Graph(numSquares,this.state.sourceIndex,this.state.targetIndex)
    graph.processAllVerticies()
    */

    this.setState(this.state);
  }


  //Add event listener for window resize
  componentDidMount() {
    this.handleScreenResize();
    window.addEventListener("resize", this.handleScreenResize.bind(this));
  }

  //Remove event listener  for window resize
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleScreenResize.bind(this));
  }



  render() {
    return (

      <div className="App">
        <Header/>

        <Container className="mt-3">

          <Row>
            <Col className="order-1 order-lg-1" md="12" lg="4">
                <Row className="mb-4">
                  <Col >
                    <ControlPanel
                      onRunPressed={() => this.handleRunPressed()}
                      onResetPressed={() => this.handleResetPressed()}
                      onAlgorithmChange={(algorithm) => this.handleAlgorithmChange(algorithm)}
                      onEpsilonChange={(value) => this.handleEpsilonChange(value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="visible-md">
                    <Key />
                  </Col>
                </Row>

            </Col>
            <Col className="order-2 order-lg-2" md="12" lg="8" >
              <BrowserView>
                <Board
                    squares={this.state.graph.toGrid()}
                    onMouseDown={(i) => this.handleMouseDown(i)}
                    onMouseEnter={(i) => this.handleMouseEnter(i)}
                    onMouseUp={(i) => this.handleMouseUp(i)}
                />
              </BrowserView>

              <MobileView>
                <Board
                    squares={this.state.graph.toGrid()}
                    onMouseDown={(i) => this.handleTouchStart(i)}
                    onMouseEnter={(i) => console.log()}
                    onMouseUp={(i) => console.log()}
                />
              </MobileView>

            </Col>
            <Col className="order-3 col-12 mt-4 hidden-md"  >
                <Key
                />
            </Col>
          </Row>


        </Container>
      </div>


    );
  }
}

export default App;


/*
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
*/


/*
  updatePath(vertexSet,squares, sourceIndex, targetIndex){

    //clear any previous paths and visited squares
    for(var j = 0; j<squares.length; j++){
      if(squares[j]===4 || squares[j]===5){
          squares[j] = 0
      }
    }

    while(!vertexSet.isFinished()){
      const nextSquare = vertexSet.processNextVertex()

      //dont change source and target squares
      if(nextSquare===sourceIndex || nextSquare===targetIndex){
        continue;
      }
      squares[nextSquare] = 5;
    }

    return squares;

    /*
    //clear any previous paths and visited squares
    for(var j = 0; j<squares.length; j++){
      if(squares[j]===4 || squares[j]===5){
          squares[j] = 0
      }
    }
    const returnVal = dijkstra(squares, sourceIndex, targetIndex)

    const visitedSquares = returnVal[0]
    const path = returnVal[1]

    console.log(visitedSquares)
    for(var i = 0; i<visitedSquares.length ; i++){
      if(visitedSquares[i]===sourceIndex || visitedSquares[i]===targetIndex){
        continue;
      }
      squares[visitedSquares[i]]=5;
    }

    //only update squares if a valid path was found
    if(path.length!==0){
      //skip first and last indices as they contain start and end
      for(var k = 1; k<path.length -1 ; k++){
        squares[path[k]] = 4
      }
    }

    return squares

  }

  */

  /*
  changeSquare(i){
    const squares = this.state.squares.slice()
    //if square is empty or contains a path, or has been visited -> add a wall, otherwise clear
    if(squares[i]===0||squares[i]===4||squares[i]===5){
        squares[i] = 3
    } else if (squares[i] === 3){
        squares[i] = 0
    }

    this.setState({
      squares: squares
    });

  }
  */
