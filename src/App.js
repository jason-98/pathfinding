import React from 'react';
import logo from './logo.svg';
import './App.css';

import Board from './Board.js';
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

  handlePlaceWall(i){
    const squares = this.state.squares.slice()
    squares[i] = 3
    this.setState({
      squares: squares
    });

  }


  handleUpdatePath() {

    const squares_copy = this.state.squares.slice()
    const squares = this.updatePath(squares_copy,this.state.sourceIndex, this.state.targetIndex)

    this.setState({
      squares: squares
    });

  }

  render() {
    return (
      <div className="App">
        <div>
          <Board
            squares={this.state.squares}
            onUpdatePath={(i) => this.handleUpdatePath()}
            onPlaceWall={(i) => this.handlePlaceWall(i)}
            />
        </div>
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
