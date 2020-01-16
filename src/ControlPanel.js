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
              <h4 className="mb-1"> Algorithm </h4>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col className="mb-1" md={24} lg={24}> Select pathfinding algorithm: </Col>
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
                <b> A* </b> ("A-star") works similarly to Dijkstra's Algorithm but uses a <b> heuristic function </b> to close in on the target more quickly. The algorithm works by maintaining two values at each node: 1) the exact distance g(n) from the source to the current node and 2) a heuristic h(n) that estimates the distance from the current node to the target. The algorithm determines which node to visit next by minimising the function <b> f(n) = g(n) + εh(n)</b>, where ε is a weighting factor that is applied to h(n) to observe how the heuristic affects the path that is selected [1].
              </p>

              <Row >
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
                      For the case ε>1, A* is no longer guaranteed to find the shortest path, however this means that the algorithm will likely run faster.
                  </p>
              </div>

              <div className={this.state.epsilon!==10 ? 'mb-2 hidden' : ''}>
                  <p className="text-small text-justify">
                      For the case ε>>1, h(n) becomes large compared to g(n) and A* turns into Greedy Best-First Search.
                  </p>
              </div>

              <p className="text-small text-justify">
                [1] Amit Patel (1997). Introduction to A*. <a href="http://theory.stanford.edu/~amitp/GameProgramming/AStarComparison.html"> [online]</a>
              </p>
          </div>

          <div className={this.state.algorithm!=="dijkstra" ? 'mb-2 hidden' : ''}>
              <Row className="mb-2">
                <Col span={24}>
                    <p className="text-small text-justify">
                    <b> Dijkstra's algorithm </b> is used to find the shortest path between the source node and the target node in a graph. The algorithm works by starting at the source node and examining all its neighbouring nodes. These neighbour nodes have their own neighbour nodes which can be visited in turn. At each step, the algorithm visits the node the closest to the source  that has not yet been visited. The algorithm expands outward in this manner until the target node is reached [1]. Dijkstra's algorithm is <b> guaranteed to find the shortest path </b> between the source and target nodes.
                    </p>


                    <p className="text-small text-justify">
                      [1] cse.unt.edu. (2013). Dijkstra's algorithm. <a href="http://www.cse.unt.edu/~tarau/teaching/AnAlgo/Dijkstra%27s%20algorithm.pdf"> [online] </a>
                    </p>
                </Col>
              </Row>
          </div>

          <div className={this.state.algorithm!=="greedy-best-first" ? 'mb-2 hidden' : ''}>
              <Row className="mb-2">
                <Col span={24}>
                    <p className="text-small text-justify">
                      <b> Greedy Best-First Search </b> works by using an estimate, or heuristic, to determine which node to visit next. The heuristic is often a function of the distance between each node and the target node. Instead of visiting the node closest to the source node at each step, like in Dijkstra's Algorithm, the node closest to the target node is visited next [1]. This does <b>not guarantee to find the shortest path</b>, however, it runs much quicker than Dijkstra’s Algorithm because the path is guided towards the goal very quickly.
                    </p>

                    <p className="text-small text-justify">
                      [1] Amit Patel (1997). Dijkstra and Best-First Search. <a href="http://theory.stanford.edu/~amitp/GameProgramming/AStarComparison.html#dijkstras-algorithm-and-best-first-search"> [online]</a>
                    </p>
                </Col>
              </Row>
          </div>

          <div className={this.state.algorithm!=="depth-first" ? 'mb-2 hidden' : ''}>
              <Row className="mb-2">
                <Col span={24}>
                    <p className="text-small text-justify">
                      <b> Depth-First Search </b> works by starting at the source node and exploring as far as possible along each branch before backtracking. This process continues until the target node is found [1].
                    </p>

                    <p className="text-small text-justify">
                      [1] General Depth First Search (2015). <a href="https://bradfieldcs.com/algos/graphs/depth-first-search/"> [online] </a>
                    </p>
                </Col>
              </Row>
          </div>

          <div className={this.state.algorithm!=="breadth-first" ? 'mb-2 hidden' : ''}>
              <Row className="mb-2">
                <Col span={24}>
                    <p className="text-small text-justify">
                        <b> Breadth-First Search</b> works by starting at the source node and visiting all its immediate neighbours. Once all immediate neighbours have been visited, the algorithm moves down a level and visits all the neighbour's neighbours, and so on. This continues until the target node is found. This process should sound similar to Dijkstra's Algorithm. Breadth-First Search is equivalent to Dijkstra's Algorithm for <b> unweighted </b> graphs. The grid of squares used in this visualisation is an example of an unweighted graph.
                    </p>
                </Col>
              </Row>
          </div>


          <Row className="mt-0">
            <Col xs={24} lg={24}>
                <h4 className="mb-1"> Visualise </h4>
                      <p className="text-small">To visualise how the current pathfinding algorithm finds a path from the source to the target, click 'Play' below:</p>
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
<p className="text-small"> Click and drag mouse to place walls in the grid. Drag source and target squares to change start and end positions. </p>
<p className="text-small">(on mobile touch source or target square, then touch new square to move). </p>
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
