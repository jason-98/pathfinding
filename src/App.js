import React from 'react';
import logo from './logo.svg';
import './App.css';

import Board from './Board.js';
import dijkstra from './algorithms.js'

class App extends React.Component {

  constructor(props){
    super(props)

    const squares = Array(400).fill(0)
    squares[11] = 1  //start
    squares[88] = 2  //end

    this.state = {
          squares: squares,
    };
  }

  updatePath(squares){
    //clear any previous paths
    for(var j = 0; j<squares.length; j++){
      if(squares[j]===4){
          squares[j] = 0
      }
    }

    const path = dijkstra(squares, 11, 88)

    //only update squares if a valid path was found
    if(path.length!==0){
      //skip first and last indices as they contain start and end
      for(var k = 1; k<path.length -1 ; k++){
        squares[path[k]] = 4
      }
    }

    return squares
  }



  handleClick(i) {

    const squares_copy = this.state.squares.slice()
    squares_copy[i] = 3

    const squares = this.updatePath(squares_copy)

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
            onClick={(i) => this.handleClick(i)}
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
