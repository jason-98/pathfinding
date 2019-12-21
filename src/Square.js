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
  } else{
    buttonClass = "square-default"
  }

  return (
    <button className={buttonClass} onMouseDown={props.onClick} onMouseEnter={props.onMouseEnter}>
      {props.index}
    </button>
  );

}

export default Square;
