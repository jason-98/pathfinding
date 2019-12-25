import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import {
  Container,
  Row,
  Col,
} from "shards-react";
import './App.css';
import Board from './Board.js';
import ControlPanel from './ControlPanel.js';
import Header from './Header.js';
import dijkstra from './algorithms.js'

class App extends React.Component {

  constructor(props){
    super(props)

    const sourceIndex = 31
    const targetIndex = 868

    const squares = Array(900).fill(0)
    squares[sourceIndex] = 1  //start
    squares[targetIndex] = 2  //end

    //show initial path
    const squares_copy = this.updatePath(squares,sourceIndex,targetIndex)

    this.state = {
          squares: squares_copy,
          sourceIndex: sourceIndex,
          targetIndex: targetIndex,
          isSourceMoving: false, //is the source currently being moved by the user
          isTargetMoving: false, //is the target currently being moved by the user
    };
  }

  updatePath(squares, sourceIndex, targetIndex){
    //clear any previous paths
    for(var j = 0; j<squares.length; j++){
      if(squares[j]===4){
          squares[j] = 0
      }
    }

    const path = dijkstra(squares, sourceIndex, targetIndex)

    //only update squares if a valid path was found
    if(path.length!==0){
      //skip first and last indices as they contain start and end
      for(var k = 1; k<path.length -1 ; k++){
        squares[path[k]] = 4
      }
    }

    return squares
  }

  changeSquare(i){
    const squares = this.state.squares.slice()
    //if square is empty or contains a path -> add a wall, otherwise clear
    if(squares[i]===0||squares[i]===4){
        squares[i] = 3
    } else if (squares[i] === 3){
        squares[i] = 0
    }

    this.setState({
      squares: squares
    });

  }


  handleMouseDown(i){
    const squares = this.state.squares.slice()
    if(squares[i]===1){
      this.setState({
        isSourceMoving: true
      });
    } else if(squares[i]===2){
      this.setState({
        isTargetMoving: true
      });
    }else{
      this.changeSquare(i)
    }
  }


  handleMouseEnter(i){

    if(this.state.isSourceMoving){
        const squares = this.state.squares.slice()
        const oldSourceIndex = this.state.sourceIndex

        squares[i]=1
        squares[oldSourceIndex]=0

        this.setState({
          squares: squares,
          sourceIndex: i
        });

    } else if(this.state.isTargetMoving){
        const squares = this.state.squares.slice()
        const oldTargetIndex = this.state.targetIndex

        squares[i]=2
        squares[oldTargetIndex]=0

        this.setState({
          squares: squares,
          targetIndex: i
      });
    } else {
        this.changeSquare(i)
    }


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

    const squares_copy = this.state.squares.slice()
    const squares = this.updatePath(squares_copy,this.state.sourceIndex, this.state.targetIndex)

    this.setState({
      squares: squares
    });



  }

  render() {
    return (
      <div className="App">
        <Header/>

        <Container className="mt-3">

          <Row>
            <Col md="12" lg="4">
                <ControlPanel/>
            </Col>
            <Col md="12" lg="8" className="center-stage">
              <Board
                  squares={this.state.squares}
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
