import React from 'react';
import {
  Container,
  Row,
  Col,
  FormSelect,
  Button,
} from "shards-react";

import './ControlPanel.css';


export default class ControlPanel extends React.Component {

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
        <div className="panel p-3">
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

            <Row className="mb-4">
              <Col>
                <p className="text-small text-justify">
                <b>Dijkstra's </b> algorithm (or Dijkstra's Shortest Path First algorithm, SPF algorithm)[1] is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.[2][3][4]
                </p>
              </Col>

            </Row>




            <Row>
                <Col xs="6" lg="6">
                    <Button className="btn-run" theme="primary" onClick={()=>this.props.onRunPressed()}>
                        Play
                    </Button>
                </Col>
                <Col xs="6" lg="6">
                    <Button className="btn-clear" theme="danger" onClick={()=>this.props.onResetPressed()} >
                      Reset
                    </Button>

                </Col>
            </Row>


          </Container>
        </div>


      </div>

    );
  }
}



/*
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
*/
