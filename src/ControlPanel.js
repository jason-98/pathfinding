import React from 'react';
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Slider,
  FormCheckbox,
  FormSelect,
  Button,
} from "shards-react";

import './ControlPanel.css';
import Square from './Square';


class ControlPanel extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdown1: false,
      dropdown2: false,
      dropdown3: false
    };
  }

  toggle(nr) {
    this.setState(prevState => {
      const newState = {};
      newState[`dropdown${nr}`] = !prevState[`dropdown${nr}`];
      return { ...prevState, ...newState };
    });
  }


  render() {
    return (
      <div>
        <div className="panel p-3 mb-4">
          <Container>

            <Row >
              <Col>
                <h4 className="mb-2"> Setup </h4>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="12" lg="8">Select algorithm:</Col>
              <Col md="12" lg="12">
              <FormSelect className="limit-height">
                <option value="first">Dyjkstra</option>
                <option value="second">A*</option>
                <option value="third" disabled>
                  This option is disabled.
                </option>
              </FormSelect>


              </Col>
            </Row>

            <Row>
              <Col className="mb-1">
                Set animation speed:
              </Col>
            </Row>
            <Row className="mb-2">
                <Col md="12" lg="10" >
                  <Slider className="mt-2 mb-2" theme="light" connect={[true, false]} start={[20]} range={{ min: 0, max: 100 }} />
                </Col>
                <Col md="12" lg="2">
                  Fast
                </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                  <p className="text-small"> Drag slider far left for no animation </p>
              </Col>

            </Row>
            <Row className="mb-3">
                <Col>
                  <FormCheckbox
                    toggle
                    small
                    checked={this.state.checked}
                    onChange={this.handleChange}>
                      Allow diagonal movement
                  </FormCheckbox>
                </Col>
            </Row>

            <Row>
                <Col xs="6" lg="6">
                    <Button className="btn-run" theme="primary">
                      Run
                    </Button>
                </Col>
                <Col xs="6" lg="6">
                    <Button className="btn-clear" theme="danger">
                      Clear
                    </Button>

                </Col>
                <Col>

                </Col>
            </Row>


          </Container>
        </div>

        <div className="panel p-3 mb-4">
          <Container>

            <Row>
              <Col>
                <h4 className="mb-2"> Key </h4>
              </Col>
            </Row>


            <Row className="mb-1">
              <Col md="2" lg="2">
                <Square
                  index={0}
                  value={1}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col md="4" lg="4">
                  Source
              </Col>

              <Col md="2" lg="2">
                <Square
                  index={0}
                  value={2}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col md="4" lg="4">
                  Target
              </Col>
            </Row>




            <Row className="mb-1">
              <Col md="2" lg="2">
                <Square
                  index={0}
                  value={4}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col md="4" lg="4">
                  Path
              </Col>

              <Col md="2" lg="2">
                <Square
                  index={0}
                  value={3}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col md="4" lg="4">
                  Wall
              </Col>
            </Row>


            <Row className="mb-2">
              <Col md="2" lg="2">
                <Square
                  index={0}
                  value={0}
                  onMouseEnter={() => console.log()}
                  onMouseDown={() => console.log()}
                  onMouseUp={() => console.log()}
                />

              </Col>
              <Col md="4" lg="4">
                  Empty
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md="12" lg="12">
                  <p className="text-small"> Click and drag to move source and target squares</p>
                  <p className="text-small"> Click and/or drag to place walls in the grid</p>

              </Col>
            </Row>



          </Container>
        </div>

      </div>

    );
  }
}

export default ControlPanel;
