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
  33: { value: 1},
  66: { value: 2},
  100: {
    style: {
      color: '#40A9FF',
    },
    label: <strong>Faster</strong>,
    value: 10
  },
};

/**
 * Converts epsilon slider position into string label.
 *
 * @return {string} Formatted label.
 */
function formatter(value) {
  if(value<33){
    return `${"ε = 0"}`;
  } else if(value<66){
    return `${"ε = 1"}`;
  }else if(value<100){
    return `${"ε = 2"}`;
  }else {
    return `${"ε = 10"}`;
  }

}


/**
 * Class representing control panel which contains all control UI components.
 */
class ControlPanel extends React.Component {

  /**
   * Creates the control panel.
   */
  constructor(props) {
      super(props);

      this.state = {
        algorithm: "dijkstra",
        epsilon: 1,
      }
    }

    /**
     * Handle when current pathfinding algorithm is changed in the UI. Updates
     * state and then bubbles up event.
     *
     * @param {string} algorithm - Name of the new algorithm in use.
     */
  handleAlgorithmChange(value){

    this.setState({
      algorithm: value,
      epsilon: this.state.epsilon,
    });

    //breadth first search and dijkstra are equivalent on this type of graph, so just use dijkstra
    if(value==="breadth-first"){
        this.props.onAlgorithmChange("dijkstra")
    } else{
        this.props.onAlgorithmChange(value)
    }

  }

  /**
   * Handle when epsilon value is changed in the UI. Updates state and then
   * bubbles up event.
   *
   * @param {number} value - New value for epsilon.
   */
  handleEpsilonChange(position){
    const value = marks[position].value
    this.setState({
      algorithm: this.state.algorithm,
      epsilon: value,
    });
    this.props.onEpsilonChange(value)
  }


  /**
   * Renders control panel.
   */
  render() {
    return (
      <div>
        <div className="panel pl-4 pr-4 pb-4 pt-3">

          <Row>
            <Col span={24}>
              <h4 className="mb-2"> Algorithm </h4>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col className="mb-1" md={24} lg={16}> Select pathfinding algorithm: </Col>
            <Col span={24}>
              <Select className="select" defaultValue="dijkstra" onSelect={(value)=>this.handleAlgorithmChange(value)}>
                <Option value="a-star">A*</Option>
                <Option value="dijkstra">Dijkstra</Option>
                <Option value="greedy-best-first">Greedy Best-First Search</Option>
                <Option value="depth-first">Depth-First Search</Option>
                <Option value="breadth-first">Breadth-First Search</Option>

              </Select>
            </Col>
          </Row>

          <div className={this.state.algorithm!=="a-star" ? 'mb-2 hidden' : ''}>

              <p className="text-small text-justify">
                A* ("A-star") works similarly to Dijkstra's Algorithm but uses a heuristic function to close in on the target more quickly. The algorithm works by maintaining two values at each node: 1) the exact distance g(n) from the source to the current node 2) some heuristic h(n) that estimates the distance from the current node to the target. The algorithm determines which node to visit by minimising the function f(n) = g(n) + εh(n), where ε is heuristic weighting factor that is sometimes included.
              </p>

              <Row>
                <Col md={24} lg={24}> Select heuristic weighting factor ε: </Col>
                <Col className="pl-3 pr-3" span={24}>
                  <Slider tipFormatter={formatter} marks={marks} step={null} defaultValue={33} onChange={(position)=>this.handleEpsilonChange(position)}/>
                </Col>
              </Row>


              <div className={this.state.epsilon!==0 ? 'mb-2 hidden' : ''}>
                  <p className="text-small text-justify">
                      For the case ε=0, the heuristic function is removed and A* turns into Dijkstra's Algorithm which is guaranteed to find the shortest path.
                  </p>
              </div>

              <div className={this.state.epsilon!==1 ? 'mb-2 hidden' : ''}>
                  <p className="text-small text-justify">
                      For the case ε=1, A* will only follow the best path and never expand anything else, making it fast while still guaranteeing the shortest path.
                  </p>
              </div>

              <div className={this.state.epsilon!==2 ? 'mb-2 hidden' : ''}>
                  <p className="text-small text-justify">
                      For the case ε>1, A* is no longer guaranteed to find the shortest path, however this means that the algorithm will run faster.
                  </p>
              </div>

              <div className={this.state.epsilon!==10 ? 'mb-2 hidden' : ''}>
                  <p className="text-small text-justify">
                      For the case ε>>1, h(n) becomes large compared to g(n) and A* starts to turn into Greedy Best-First Search.
                  </p>
              </div>
          </div>

          <div className={this.state.algorithm!=="dijkstra" ? 'mb-2 hidden' : ''}>
              <Row className="mb-2">
                <Col span={24}>
                    <p className="text-small text-justify">

                    Dijkstra's shortest path algorithm works by visiting nodes in the graph starting at the source node. It then repeatedly examines the closest node that has not yet been visited, adding that node's vertices to the set of vertices to be examined. The algorithm exapnds outward in this manor until the target node is reached.

                    Dijkstra's algorithm is guaranteed to find the shortest path between the source and target nodes.


                    </p>
                </Col>
              </Row>
          </div>

          <div className={this.state.algorithm!=="greedy-best-first" ? 'mb-2 hidden' : ''}>
              <Row className="mb-2">
                <Col span={24}>
                    <p className="text-small text-justify">
                      The Greedy Best-First Search algorithm works by using an estimate, called a heuristic, of how far from the target any node is. Instead of selecting the node closest to the source node, it selects the node closest to the target node. This does not guarantee to find the shortest path. However, it runs much quicker than Dijkstra’s Algorithm because it uses the heuristic function to guide its way towards the goal very quickly.
                    </p>
                </Col>
              </Row>
          </div>

          <div className={this.state.algorithm!=="depth-first" ? 'mb-2 hidden' : ''}>
              <Row className="mb-2">
                <Col span={24}>
                    <p className="text-small text-justify">
                      The Depth-First Search algorithm works by starting at the source node and exploring as far as possible along each branch before backtracking. This continues until the target nodes is found.
                    </p>
                </Col>
              </Row>
          </div>

          <div className={this.state.algorithm!=="breadth-first" ? 'mb-2 hidden' : ''}>
              <Row className="mb-2">
                <Col span={24}>
                    <p className="text-small text-justify">
                        The Breadth-First Search algorithm works by starting at the source node and visiting all immediate neighbouring, before moving on and visiting nodes that are immediate neighbours of its neighbours, and so on. This continues until the target node is found. This algorithm is guaranteed to find the shortest path between two nodes in an unweighted graph. An unweighted graph is a graph in which the distance/cost between any two adjacent nodes is implicitly 1. Thus, Breadth-First Search can be thought of as a special case of Dijkstra's Algorithm.
                    </p>
                </Col>
              </Row>
          </div>




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

export default ControlPanel;


/*
This algorithm was published by Edsger Dijkstra in 1959.
is used to find the shortest path between between two nodes in a graph.
*/



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
