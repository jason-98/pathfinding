import React from 'react';
import { Row, Col } from 'antd';

import './ControlPanel.css';
import Square from './Square';


export default class Key extends React.Component {

  render() {
    return (
      <div>
        <div className="p-2 mb-4">


            <Row  type="flex" justify="left" align="top">

              <Col className="mb-1" xs={{ span: 4, offset: 0}} sm={3} md={{ span: 2, offset: 2}} lg={{ span: 2, offset: 1}} xl={{ span: 2, offset: 2}}>
                <Square
                  index={0}
                  value={1}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col xs={4} sm={3} md={1}>
                  Source
              </Col>

              <Col className="mb-1" xs={4} sm={3} md={2}>
                <Square
                  index={0}
                  value={2}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col xs={4} sm={3} md={1}>
                  Target
              </Col>


              <Col className="mb-1" xs={4} sm={3} md={2}>
                <Square
                  index={0}
                  value={0}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col xs={4} sm={3} md={1}>
                  Empty
              </Col>

              <Col className="mb-1" xs={4} sm={3} md={2}>
                <Square
                  index={0}
                  value={5}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col xs={4} sm={3} md={1}>
                  Visited
              </Col>

              <Col className="mb-1" xs={4} sm={3} md={2}>
                <Square
                  index={0}
                  value={4}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col xs={4} sm={3} md={1}>
                  Path
              </Col>






            <Col className="mb-1" xs={4} sm={3} md={2}>
              <Square
                index={0}
                value={3}
                onMouseEnter={() => console.log()}
                onMouseDown={() => console.log()}
                onMouseUp={() => console.log()}
              />

            </Col>
            <Col xs={4} sm={3} md={1}>
                Wall
            </Col>






          </Row>


        </div>

      </div>

    );
  }
}


/*
<Row className="mb-2">
  <Col xs={24} lg={24}>
      <p className="text-small"> Click and drag to move source and target squares</p>
      <p className="text-small"> Click and/or drag to place walls in the grid</p>

  </Col>
</Row>
*/
