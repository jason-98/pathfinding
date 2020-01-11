import React from 'react';
import { Row, Col } from 'antd';

import './ControlPanel.css';
import Square from './Square';


export default class Key extends React.Component {

  render() {
    return (
      <div>
        <div className="panel p-3 mb-4">

            <Row>
              <Col>
                <h4 className="mb-2"> Key </h4>
              </Col>
            </Row>


            <Row className="mb-1">
              <Col xs={4} lg={4}>
                <Square
                  index={0}
                  value={1}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col xs={8} lg={8}>
                  Source
              </Col>

              <Col xs={4} lg={4}>
                <Square
                  index={0}
                  value={2}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col xs={8} lg={8}>
                  Target
              </Col>
            </Row>




            <Row className="mb-1">
              <Col xs={4} lg={4}>
                <Square
                  index={0}
                  value={4}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col xs={8} lg={8}>
                  Path
              </Col>

              <Col xs={4} lg={4}>
                <Square
                  index={0}
                  value={3}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col xs={8} lg={8}>
                  Wall
              </Col>
            </Row>


            <Row className="mb-2">

              <Col xs={4} lg={4}>
                <Square
                  index={0}
                  value={5}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col xs={8} lg={8}>
                  Visited
              </Col>

              <Col xs={4} lg={4}>
                <Square
                  index={0}
                  value={0}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col xs={8} lg={8}>
                  Empty
              </Col>
            </Row>

            <Row className="mb-2">
              <Col xs={24} lg={24}>
                  <p className="text-small"> Click and drag to move source and target squares</p>
                  <p className="text-small"> Click and/or drag to place walls in the grid</p>

              </Col>
            </Row>


        </div>

      </div>

    );
  }
}
