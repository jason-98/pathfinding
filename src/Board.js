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
        onMouseEnter={() => this.handleMouseEnter(i)}
        onMouseDown={() => this.props.onMouseDown(i)}
        onMouseUp={() => this.props.onMouseUp(i)}
        //onTouch= {(e)=> this.printConsole(e.touches[0].screenX)}
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


  //check if mouse is currently being pressed down before bubbling up
  handleMouseEnter(i){

    if(this.state.isMouseDown){
        this.props.onMouseEnter(i)
    }
  }




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
