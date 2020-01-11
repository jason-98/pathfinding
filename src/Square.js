import React from 'react';
import './Square.css';

function Square(props) {
  let buttonClass
  if(props.value===1){
    buttonClass = "square-start"
  } else if (props.value===2) {
    buttonClass = "square-end"
  } else if (props.value===3) {
    buttonClass = "square-wall"
  } else if (props.value===4) {
    buttonClass = "square-path"
  } else if (props.value===5) {
    buttonClass = "square-visited"
  }else{
    buttonClass = "square-default"
  }

  return (
    <button
        className={"square "+buttonClass}
        onMouseDown={props.onMouseDown}
        onMouseEnter={props.onMouseEnter}
        onMouseUp={props.onMouseUp}
    >


    </button>
  );

}

//{props.index}

export default Square;
