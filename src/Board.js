import React from 'react';
import Square from './Square';
import './Board.css';

class Board extends React.Component {

  constructor(props){
    super(props)
    this.state = {
          mouseDown: false,
    };
  }

  renderSquare(i) {
    return (
      <Square
        index={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        onMouseEnter={() => this.props.onMouseEnter(i,this.state.mouseDown)}
      />
    );
  }

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

  render() {

    const rows = []
    const rowLength = Math.ceil(Math.sqrt(this.props.squares.length))

    for (var i = 0; i < this.props.squares.length; i+=rowLength) {
      rows.push(this.renderRow(i,Math.min(i+rowLength, this.props.squares.length)))
    }

    return (
      <div
          onMouseDown={()=> this.setState({ mouseDown: true })}
          onMouseUp={()=> this.setState({ mouseDown: false })}
      >
        {rows}
      </div>
    );
  }
}

export default Board;
