import React from 'react';
import Square from './Square';
import './Board.css';

/**
 * Class representing the game board. This is formed by a grid of Squares.
 */
class Board extends React.Component {

  /**
   * Creates the game board.
   */
  constructor(props){
    super(props)
    this.state = {
          isMouseDown: false,
    };
  }

  /**
   * Helper function to render an individual square.
   *
   * @param {number} i - Index of position in grid where square is created.
   */
  renderSquare(i) {
    return (
      <Square
        index={i}
        value={this.props.squares[i]}
        onMouseEnter={() => this.handleMouseEnter(i)}
        onMouseDown={() => this.props.onMouseDown(i)}
        onMouseUp={() => this.props.onMouseUp(i)}
      />
    );
  }

  /**
   * Helper function to render an entire row of squares.
   *
   * @param {number} i_start - Start index of position in grid.
   * @param {number} i_end - End index of position in grid.
   */
  renderRow(i_start, i_end){
    const row = []
    for (var i = i_start; i < i_end; i++) {
      row.push(this.renderSquare(i))
    }

    return(
      <div className="board-row">
        {row}
      </div>
    );
  }


  /**
   * Handles when mouse enters a new square. If the mouse is currently held
   * down, bubble this event up, else do nothing.
   *
   * @param {number} i - Index of position in grid where event occured.
   */
  handleMouseEnter(i){

    if(this.state.isMouseDown){
        this.props.onMouseEnter(i)
    }
  }



  /**
   * Renders game board. 
   */
  render() {

    const rows = []
    const rowLength = Math.ceil(Math.sqrt(this.props.squares.length))

    for (var i = 0; i < this.props.squares.length; i+=rowLength) {
      rows.push(this.renderRow(i,Math.min(i+rowLength, this.props.squares.length)))
    }

    return (
        <div className="board"
          onMouseDown={()=> this.setState({ isMouseDown: true })}
          onMouseUp={()=> this.setState({ isMouseDown: false })}
          >
          {rows}
        </div>
    );
  }
}

/*
printConsole(message){
  var console = this.state.console
  console+=message+"\n"
  this.setState({
    isMouseDown: this.state.isMouseDown,
    console: console
  })
}

import Swipe from 'react-easy-swipe';

//returning true from this functions prevents the view from scolling on swipe (for mobile)
onSwipeMove(event) {
  return true;
}

<Swipe onSwipeMove={this.onSwipeMove} >
</Swipe>
*/

export default Board;
