import React from 'react';
import Square from './Square';
import './Board.css';

class Board extends React.Component {

  constructor(props){
    super(props)
    this.state = {
          isMouseDown: false,
    };
  }

  renderSquare(i) {
    return (
      <Square
        index={i}
        value={this.props.squares[i]}
        onMouseDown={() => this.handleMouseDown(i)}
        onMouseEnter={() => this.handleMouseEnter(i)}
        onMouseUp={() => this.handleMouseUp()}
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


  handleMouseDown(i){
      this.props.onPlaceWall(i)
  }

  handleMouseEnter(i){
    if(this.state.isMouseDown){
        this.props.onPlaceWall(i)
    }
  }

  handleMouseUp(){
      this.props.onUpdatePath()
  }



  render() {

    const rows = []
    const rowLength = Math.ceil(Math.sqrt(this.props.squares.length))

    for (var i = 0; i < this.props.squares.length; i+=rowLength) {
      rows.push(this.renderRow(i,Math.min(i+rowLength, this.props.squares.length)))
    }

    return (
      <div
          onMouseDown={()=> this.setState({ isMouseDown: true })}
          onMouseUp={()=> this.setState({ isMouseDown: false })}
      >
        {rows}
      </div>
    );
  }
}

export default Board;
