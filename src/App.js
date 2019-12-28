import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { Container, Row, Col} from "shards-react";
import './App.css';
import Board from './Board.js';
import ControlPanel from './ControlPanel.js';
import Header from './Header.js';
import Graph from './graph.js'

class App extends React.Component {

  constructor(props){
    super(props)

    const sourceIndex = 31
    const targetIndex = 188
    const numSquares = 625

    var graph = new Graph(numSquares,sourceIndex,targetIndex)
    graph.processAllVerticies()

    this.state = {
          graph: graph,
          sourceIndex: sourceIndex,
          targetIndex: targetIndex,
          isSourceMoving: false, //is the source currently being moved by the user
          isTargetMoving: false, //is the target currently being moved by the user
    };

  }


  runAnimation(graph){
      //clear any previous paths and visited squares
      graph.reset()

      this.animationCallBack(graph)
    }


  animationCallBack(graph){

    //var d = new Date().getTime()
    graph.processNextVertex()

    this.setState({
      squares: graph.toGrid()
    });

    //console.log(new Date().getTime()-d)

    if(!graph.isFinished()){
      new Promise((resolve) => setTimeout(resolve, 0)).then(() => {
        this.animationCallBack(graph)
      });
    }



}


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

  handleMouseDown(i){

    const squares = this.state.graph.toGrid()
    if(squares[i]===1){
      this.setState({
        isSourceMoving: true
      });
    } else if(squares[i]===2){
      this.setState({
        isTargetMoving: true
      });
    }else{
      this.state.graph.toggleSquare(i)
      this.setState({
        squares: this.state.graph.toGrid()
      });
    }


  }


  handleMouseEnter(i){

    if(this.state.isSourceMoving){
        this.state.graph.changeSourceIndex(i)
    } else if(this.state.isTargetMoving){
        this.state.graph.changeTargetIndex(i)
    } else {
        this.state.graph.toggleSquare(i)
    }

    this.setState({
      squares: this.state.graph.toGrid(),
    });

  }



  handleMouseUp(i){

    if(this.state.isSourceMoving){
        this.setState({
          isSourceMoving: false
        });
    } else if(this.state.isTargetMoving){
        this.setState({
          isTargetMoving: false
        });
    }

    this.setState({
      squares: this.state.graph.toGrid(),
    });

  }


  handleRunPressed(){
      this.runAnimation(this.state.graph, this.state.sourceIndex,this.state.targetIndex)
  }

  render() {
    return (
      <div className="App">
        <Header/>

        <Container className="mt-3">

          <Row>
            <Col md="12" lg="4">
                <ControlPanel
                  onRunPressed={() => this.handleRunPressed()}
                />
            </Col>
            <Col md="12" lg="8" className="center-stage">
              <Board
                  squares={this.state.graph.toGrid()}
                  onMouseDown={(i) => this.handleMouseDown(i)}
                  onMouseEnter={(i) => this.handleMouseEnter(i)}
                  onMouseUp={(i) => this.handleMouseUp(i)}
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
