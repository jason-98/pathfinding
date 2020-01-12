import React from 'react';
import { Row, Col, Button, Select, Slider } from 'antd';
import './ControlPanel.css';

const { Option } = Select;

const marks = {
  0: {
    style: {
      color: '#40A9FF', //'#f50'
    },
    label: <strong>Slower</strong>,
    value: 0
  },
  33: {
    value: 1
  },
  66: {
    value: 2
  },
  100: {
    style: {
      color: '#40A9FF',
    },
    label: <strong>Faster</strong>,
    value: 10
  },
};

function formatter(value) {
  if(value<33){
    return `${"ε = 0"}`;
  } else if(value<66){
    return `${"ε = 1"}`;
  }else if(value<100){
    return `${"ε = 1.5"}`;
  }else {
    return `${"ε = 3"}`;
  }

}


export default class ControlPanel extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        algorithm: "dijkstra",
        epsilon: 1,
      }
    }

  handleAlgorithmChange(value){
    //breadth first search and dijkstra are equivalent on this type of graph, so just use dijkstra
    if(value==="breadth-first"){
      value = "dijkstra"
    }

    this.setState({
      algorithm: value,
      epsilon: this.state.epsilon,
    });
    this.props.onAlgorithmChange(value)
  }

  handleEpsilonChange(position){
    const value = marks[position].value
    this.setState({
      algorithm: this.state.algorithm,
      epsilon: value,
    });
    this.props.onEpsilonChange(value)
  }


  render() {
    return (
      <div>
        <div className="panel p-4">

          <Row>
            <Col span={24}>
              <h4 className="mb-2"> Setup </h4>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={24} lg={16}> Select algorithm: </Col>
            <Col span={24}>
              <Select className="select" defaultValue="dijkstra" onSelect={(value)=>this.handleAlgorithmChange(value)}>
                <Option value="a-star">A*</Option>
                <Option value="dijkstra">Dijkstra</Option>
                <Option value="greedy-best-first">Best-first search</Option>
                <Option value="depth-first">Depth-first search</Option>
                <Option value="breadth-first">Breadth-first search</Option>

              </Select>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col span={24}>
                <p className="text-small text-justify">
                  <b>Dijkstra's </b> algorithm (or Dijkstra's Shortest Path First algorithm, SPF algorithm)[1] is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.[2][3][4]
                </p>
            </Col>
          </Row>

          <Row className={this.state.algorithm!=="a-star" ? 'mb-2 hidden' : ''}>
            <Col md={24} lg={24}> Select heuristic weight ε: </Col>
            <Col className="pl-3 pr-3" span={24}>
              <Slider tipFormatter={formatter} marks={marks} step={null} defaultValue={33} onChange={(position)=>this.handleEpsilonChange(position)}/>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col span={24}>
                <p className="text-small text-justify">
                  <b>Dijkstra's </b> algorithm (or Dijkstra's Shortest Path First algorithm, SPF algorithm)[1] is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.[2][3][4]
                </p>
            </Col>
          </Row>

          <Row className="mt-2 mb-3">
            <Col xs={24} lg={24}>
                <h4> Instructions</h4>
                <p className="text-small"> Click and drag to move source and target squares</p>
                <p className="text-small"> Click and/or drag to place walls in the grid</p>

            </Col>
          </Row>

          <Row gutter={[16, 16]}>
              <Col xs={12} lg={12} >
                  <Button className="btn-run" block type="primary" onClick={()=>this.props.onRunPressed()}>
                      Play
                  </Button>
              </Col>
              <Col  xs={12} lg={12} >
                  <Button className="btn-clear" block type="danger" onClick={()=>this.props.onResetPressed()} >
                    Clear
                  </Button>

              </Col>
          </Row>

        </div>
      </div>

    );
  }
}




/*
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
        <FormSelect className="limit-height" onChange={this.handleAlgorithmChange}>
          <option value="dijkstra">Dijkstra</option>
          <option value="a-star">A*</option>
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

*/


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
