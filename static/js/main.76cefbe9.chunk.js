(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{139:function(e,t,a){},172:function(e,t,a){e.exports=a.p+"static/media/path_icon_white.eeb56e80.png"},177:function(e,t,a){e.exports=a(336)},182:function(e,t,a){},258:function(e,t,a){},259:function(e,t,a){},260:function(e,t,a){},334:function(e,t,a){},336:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),r=a(6),i=a.n(r),o=(a(182),a(17)),l=a(20),h=a(30),c=a(28),u=a(31),d=(a(183),a(184),a(14));a(258),a(259);var m=function(e){var t;return t=1===e.value?"square-start":2===e.value?"square-end":3===e.value?"square-wall":4===e.value?"square-path":5===e.value?"square-visited":"square-default",n.a.createElement("button",{className:"square "+t,onMouseDown:e.onMouseDown,onMouseEnter:e.onMouseEnter,onMouseUp:e.onMouseUp})},g=(a(260),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(h.a)(this,Object(c.a)(t).call(this,e))).state={isMouseDown:!1},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"renderSquare",value:function(e){var t=this;return n.a.createElement(m,{index:e,value:this.props.squares[e],onMouseEnter:function(){return t.handleMouseEnter(e)},onMouseDown:function(){return t.props.onMouseDown(e)},onMouseUp:function(){return t.props.onMouseUp(e)}})}},{key:"renderRow",value:function(e,t){for(var a=[],s=e;s<t;s++)a.push(this.renderSquare(s));return n.a.createElement("div",{className:"board-row"},a)}},{key:"handleMouseEnter",value:function(e){this.state.isMouseDown&&this.props.onMouseEnter(e)}},{key:"render",value:function(){for(var e=this,t=[],a=Math.ceil(Math.sqrt(this.props.squares.length)),s=0;s<this.props.squares.length;s+=a)t.push(this.renderRow(s,Math.min(s+a,this.props.squares.length)));return n.a.createElement("div",{className:"board",onMouseDown:function(){return e.setState({isMouseDown:!0})},onMouseUp:function(){return e.setState({isMouseDown:!1})}},t)}}]),t}(n.a.Component)),p=a(340),f=a(343),v=a(344),x=a(341),E=a(342),b=(a(139),p.a.Option),M={0:{style:{color:"#40A9FF"},label:n.a.createElement("strong",null,"Slower"),value:0},33:{value:1},66:{value:2},100:{style:{color:"#40A9FF"},label:n.a.createElement("strong",null,"Faster"),value:10}};function w(e){return e<33?"\u03b5 = 0":e<66?"\u03b5 = 1":e<100?"\u03b5 = 2":"\u03b5 = 10"}var k=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(h.a)(this,Object(c.a)(t).call(this,e))).state={algorithm:"dijkstra",epsilon:1},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"handleAlgorithmChange",value:function(e){this.setState({algorithm:e,epsilon:this.state.epsilon}),"breadth-first"===e?this.props.onAlgorithmChange("dijkstra"):this.props.onAlgorithmChange(e)}},{key:"handleEpsilonChange",value:function(e){var t=M[e].value;this.setState({algorithm:this.state.algorithm,epsilon:t}),this.props.onEpsilonChange(t)}},{key:"render",value:function(){var e=this;return n.a.createElement("div",null,n.a.createElement("div",{className:"panel pl-4 pr-4 pb-4 pt-3"},n.a.createElement(f.a,null,n.a.createElement(v.a,{span:24},n.a.createElement("h4",{className:"mb-1"}," Algorithm "))),n.a.createElement(f.a,{className:"mb-3"},n.a.createElement(v.a,{className:"mb-1",md:24,lg:24}," Select pathfinding algorithm: "),n.a.createElement(v.a,{span:24},n.a.createElement(p.a,{className:"select",defaultValue:"dijkstra",onSelect:function(t){return e.handleAlgorithmChange(t)}},n.a.createElement(b,{value:"a-star"},"A*"),n.a.createElement(b,{value:"dijkstra"},"Dijkstra"),n.a.createElement(b,{value:"greedy-best-first"},"Greedy Best-First Search"),n.a.createElement(b,{value:"depth-first"},"Depth-First Search"),n.a.createElement(b,{value:"breadth-first"},"Breadth-First Search")))),n.a.createElement("div",{className:"a-star"!==this.state.algorithm?"mb-2 hidden":""},n.a.createElement("p",{className:"text-small text-justify"},n.a.createElement("b",null," A* "),' ("A-star") works similarly to Dijkstra\'s Algorithm but uses a ',n.a.createElement("b",null," heuristic function ")," to close in on the target more quickly. The algorithm works by maintaining two values at each node: 1) the exact distance g(n) from the source to the current node and 2) a heuristic h(n) that estimates the distance from the current node to the target. The algorithm determines which node to visit next by minimising the function ",n.a.createElement("b",null," f(n) = g(n) + \u03b5h(n)"),", where \u03b5 is a weighting factor that is applied to h(n) to observe how the heuristic affects the path that is selected [1]."),n.a.createElement(f.a,null,n.a.createElement(v.a,{md:24,lg:24}," Select heuristic weighting factor \u03b5: "),n.a.createElement(v.a,{className:"pl-3 pr-3",span:24},n.a.createElement(x.a,{tipFormatter:w,marks:M,step:null,defaultValue:33,onChange:function(t){return e.handleEpsilonChange(t)}}))),n.a.createElement("div",{className:0!==this.state.epsilon?"mb-2 hidden":""},n.a.createElement("p",{className:"text-small text-justify"},"For the case \u03b5=0, the heuristic function is removed and A* turns into Dijkstra's Algorithm which is guaranteed to find the shortest path.")),n.a.createElement("div",{className:1!==this.state.epsilon?"mb-2 hidden":""},n.a.createElement("p",{className:"text-small text-justify"},"For the case \u03b5=1, A* will only follow the best path and never expand anything else, making it fast while still guaranteeing the shortest path.")),n.a.createElement("div",{className:2!==this.state.epsilon?"mb-2 hidden":""},n.a.createElement("p",{className:"text-small text-justify"},"For the case \u03b5>1, A* is no longer guaranteed to find the shortest path, however this means that the algorithm will likely run faster.")),n.a.createElement("div",{className:10!==this.state.epsilon?"mb-2 hidden":""},n.a.createElement("p",{className:"text-small text-justify"},"For the case \u03b5>>1, h(n) becomes large compared to g(n) and A* turns into Greedy Best-First Search.")),n.a.createElement("p",{className:"text-small text-justify"},"[1] Amit Patel (1997). Introduction to A*. ",n.a.createElement("a",{href:"http://theory.stanford.edu/~amitp/GameProgramming/AStarComparison.html"}," [online]"))),n.a.createElement("div",{className:"dijkstra"!==this.state.algorithm?"mb-2 hidden":""},n.a.createElement(f.a,{className:"mb-2"},n.a.createElement(v.a,{span:24},n.a.createElement("p",{className:"text-small text-justify"},n.a.createElement("b",null," Dijkstra's algorithm ")," is used to find the shortest path between the source node and the target node in a graph. The algorithm works by starting at the source node and examining all its neighbouring nodes. These neighbour nodes have their own neighbour nodes which can be visited in turn. At each step, the algorithm visits the node the closest to the source  that has not yet been visited. The algorithm expands outward in this manner until the target node is reached [1]. Dijkstra's algorithm is ",n.a.createElement("b",null," guaranteed to find the shortest path ")," between the source and target nodes."),n.a.createElement("p",{className:"text-small text-justify"},"[1] cse.unt.edu. (2013). Dijkstra's algorithm. ",n.a.createElement("a",{href:"http://www.cse.unt.edu/~tarau/teaching/AnAlgo/Dijkstra%27s%20algorithm.pdf"}," [online] "))))),n.a.createElement("div",{className:"greedy-best-first"!==this.state.algorithm?"mb-2 hidden":""},n.a.createElement(f.a,{className:"mb-2"},n.a.createElement(v.a,{span:24},n.a.createElement("p",{className:"text-small text-justify"},n.a.createElement("b",null," Greedy Best-First Search ")," works by using an estimate, or heuristic, to determine which node to visit next. The heuristic is often a function of the distance between each node and the target node. Instead of visiting the node closest to the source node at each step, like in Dijkstra's Algorithm, the node closest to the target node is visited next [1]. This does ",n.a.createElement("b",null,"not guarantee to find the shortest path"),", however, it runs much quicker than Dijkstra\u2019s Algorithm because the path is guided towards the goal very quickly."),n.a.createElement("p",{className:"text-small text-justify"},"[1] Amit Patel (1997). Dijkstra and Best-First Search. ",n.a.createElement("a",{href:"http://theory.stanford.edu/~amitp/GameProgramming/AStarComparison.html#dijkstras-algorithm-and-best-first-search"}," [online]"))))),n.a.createElement("div",{className:"depth-first"!==this.state.algorithm?"mb-2 hidden":""},n.a.createElement(f.a,{className:"mb-2"},n.a.createElement(v.a,{span:24},n.a.createElement("p",{className:"text-small text-justify"},n.a.createElement("b",null," Depth-First Search ")," works by starting at the source node and exploring as far as possible along each branch before backtracking. This process continues until the target node is found [1]."),n.a.createElement("p",{className:"text-small text-justify"},"[1] General Depth First Search (2015). ",n.a.createElement("a",{href:"https://bradfieldcs.com/algos/graphs/depth-first-search/"}," [online] "))))),n.a.createElement("div",{className:"breadth-first"!==this.state.algorithm?"mb-2 hidden":""},n.a.createElement(f.a,{className:"mb-2"},n.a.createElement(v.a,{span:24},n.a.createElement("p",{className:"text-small text-justify"},n.a.createElement("b",null," Breadth-First Search")," works by starting at the source node and visiting all its immediate neighbours. Once all immediate neighbours have been visited, the algorithm moves down a level and visits all the neighbour's neighbours, and so on. This continues until the target node is found. This process should sound similar to Dijkstra's Algorithm. Breadth-First Search is equivalent to Dijkstra's Algorithm for ",n.a.createElement("b",null," unweighted ")," graphs. The grid of squares used in this visualisation is an example of an unweighted graph.")))),n.a.createElement(f.a,{className:"mt-0"},n.a.createElement(v.a,{xs:24,lg:24},n.a.createElement("h4",{className:"mb-1"}," Visualise "),n.a.createElement("p",{className:"text-small"},"To visualise how the current pathfinding algorithm finds a path from the source to the target, click 'Play' below:"))),n.a.createElement(f.a,{gutter:[16,16]},n.a.createElement(v.a,{xs:12,lg:12},n.a.createElement(E.a,{className:"btn-run",block:!0,type:"primary",onClick:function(){return e.props.onRunPressed()}},"Play")),n.a.createElement(v.a,{xs:12,lg:12},n.a.createElement(E.a,{className:"btn-clear",block:!0,type:"danger",onClick:function(){return e.props.onResetPressed()}},"Clear")))))}}]),t}(n.a.Component),y=function(e){function t(){return Object(o.a)(this,t),Object(h.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("div",{className:"p-2 mb-4"},n.a.createElement(f.a,{type:"flex",justify:"left",align:"top"},n.a.createElement(v.a,{className:"mb-1",xs:{span:4,offset:0},sm:3,md:{span:2,offset:2},lg:{span:2,offset:1},xl:{span:2,offset:2}},n.a.createElement(m,{index:0,value:1,onMouseEnter:function(){return console.log()},onMouseDown:function(){return console.log()},onMouseUp:function(){return console.log()}})),n.a.createElement(v.a,{xs:4,sm:3,md:1},"Source"),n.a.createElement(v.a,{className:"mb-1",xs:4,sm:3,md:2},n.a.createElement(m,{index:0,value:2,onMouseEnter:function(){return console.log()},onMouseDown:function(){return console.log()},onMouseUp:function(){return console.log()}})),n.a.createElement(v.a,{xs:4,sm:3,md:1},"Target"),n.a.createElement(v.a,{className:"mb-1",xs:4,sm:3,md:2},n.a.createElement(m,{index:0,value:0,onMouseEnter:function(){return console.log()},onMouseDown:function(){return console.log()},onMouseUp:function(){return console.log()}})),n.a.createElement(v.a,{xs:4,sm:3,md:1},"Empty"),n.a.createElement(v.a,{className:"mb-1",xs:4,sm:3,md:2},n.a.createElement(m,{index:0,value:5,onMouseEnter:function(){return console.log()},onMouseDown:function(){return console.log()},onMouseUp:function(){return console.log()}})),n.a.createElement(v.a,{xs:4,sm:3,md:1},"Visited"),n.a.createElement(v.a,{className:"mb-1",xs:4,sm:3,md:2},n.a.createElement(m,{index:0,value:4,onMouseEnter:function(){return console.log()},onMouseDown:function(){return console.log()},onMouseUp:function(){return console.log()}})),n.a.createElement(v.a,{xs:4,sm:3,md:1},"Path"),n.a.createElement(v.a,{className:"mb-1",xs:4,sm:3,md:2},n.a.createElement(m,{index:0,value:3,onMouseEnter:function(){return console.log()},onMouseDown:function(){return console.log()},onMouseUp:function(){return console.log()}})),n.a.createElement(v.a,{xs:4,sm:3,md:1},"Wall"))))}}]),t}(n.a.Component),I=(a(334),a(172)),S=a.n(I),j=function(e){function t(){return Object(o.a)(this,t),Object(h.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return n.a.createElement(d.f,{className:"custom-navbar",type:"dark",expand:"md"},n.a.createElement("img",{className:"d-inline-block align-top mr-3",src:S.a,width:"30",height:"30",alt:""}),n.a.createElement(d.g,{href:"#"}," Pathfinding Algorithm Visualisation"),n.a.createElement(d.c,{navbar:!0,className:"ml-auto"},n.a.createElement(d.d,null,n.a.createElement(d.e,{active:!0,href:"#"},n.a.createElement("b",{className:"hide-on-sm"}," ",n.a.createElement("u",null," more projects... ")," ")))))}}]),t}(n.a.Component);var N=function(){function e(t,a){Object(o.a)(this,e),this.id=t,this.fcost=null,this.hcost=null,this.prev=null,this.edges=[],this.isVisitable=a}return Object(l.a)(e,[{key:"getTotalCost",value:function(){return null===this.fcost?null:this.fcost+this.hcost}}]),e}(),V=function e(t,a){Object(o.a)(this,e),this.neighbourVertex=t,this.cost=a},A=function(){function e(t,a,s,n){Object(o.a)(this,e),this.size=t,this.sourceIndex=a,this.targetIndex=s,this.algorithm=n,this.wallMask=Array(t).fill(0),this.unprocessedVertices=this.build(this.wallMask,a,s,n),this.unprocessedVertices[a].fcost=0,this.processedVerticies=[],this.finished=!1,this.eplison=1}return Object(l.a)(e,[{key:"build",value:function(e,t,a,s){if(-1===t||-1===a)return[];for(var n=Math.ceil(Math.sqrt(this.size)),r=[],i=0;i<this.size;i++){var o=void 0;o=0===e[i]||i===a,r.push(new N(i,o))}for(var l=0;l<r.length;l++){for(var h=Math.floor(l/n),c=l%n,u=Math.max(h-1,0);u<=Math.min(h+1,n-1);u++)for(var d=Math.max(c-1,0);d<=Math.min(c+1,n-1);d++)if(u!==h||d!==c){var m=u!==h&&d!==c,g=r[u*n+d];g.isVisitable&&r[l].edges.push(new V(g,m?1.414:1))}if("a-star"===s){var p=Math.floor(a/n),f=a%n,v=Math.sqrt(Math.pow(h-p,2)+Math.pow(c-f,2));r[l].hcost=this.eplison*v}else if("greedy-best-first"===s){var x=Math.floor(a/n),E=a%n,b=Math.sqrt(Math.pow(h-x,2)+Math.pow(c-E,2));r[l].hcost=b}}return r}},{key:"processNextVertex",value:function(){if(this.finished)return console.log("All reachable verticies have already been processed"),null;var e=null;if("a-star"===this.algorithm?e=function(e){var t=function(e){for(var t=1e9,a=-1,s=0;s<e.length;s++){var n=e[s].getTotalCost();null!==n&&(n<t&&(t=n,a=s))}return a}(e);if(-1===t)return null;for(var a=e.splice(t,1)[0],s=0;s<a.edges.length;s++){var n=a.edges[s],r=a.fcost+n.cost;(null==n.neighbourVertex.fcost||r<n.neighbourVertex.fcost)&&(n.neighbourVertex.fcost=a.fcost+n.cost,n.neighbourVertex.prev=a)}return a}(this.unprocessedVertices):"depth-first"===this.algorithm?-1!==this.sourceIndex&&-1!==this.targetIndex&&(0===this.processedVerticies.length&&this.processedVerticies.push(this.unprocessedVertices[this.sourceIndex]),e=function(e){if(void 0===e)return null;for(var t=null,a=1;a<e.edges.length+1;a++){var s=a%e.edges.length;if(null===e.edges[s].neighbourVertex.fcost)return(t=e.edges[s].neighbourVertex).fcost=1,t.prev=e,t}for(var n=e.prev;null!==n;){for(a=1;a<n.edges.length+1;a++){s=a%n.edges.length;if(null===n.edges[s].neighbourVertex.fcost)return(t=n.edges[s].neighbourVertex).fcost=1,t.prev=n,t}n=n.prev}return t}(this.processedVerticies[this.processedVerticies.length-1])):e="greedy-best-first"===this.algorithm?function(e){var t=function(e){for(var t=1e9,a=-1,s=0;s<e.length;s++){if(null!==e[s].fcost){var n=e[s].hcost;n<t&&(t=n,a=s)}}return a}(e);if(-1===t)return null;for(var a=e.splice(t,1)[0],s=0;s<a.edges.length;s++){var n=a.edges[s];null===n.neighbourVertex.fcost&&(n.neighbourVertex.fcost=1,n.neighbourVertex.prev=a)}return a}(this.unprocessedVertices):function(e){var t=function(e){for(var t=1e9,a=-1,s=0;s<e.length;s++){var n=e[s].fcost;null!==n&&(n<t&&(t=n,a=s))}return a}(e);if(-1===t)return null;for(var a=e.splice(t,1)[0],s=0;s<a.edges.length;s++){var n=a.edges[s],r=a.fcost+n.cost;(null==n.neighbourVertex.fcost||r<n.neighbourVertex.fcost)&&(n.neighbourVertex.fcost=r,n.neighbourVertex.prev=a)}return a}(this.unprocessedVertices),null===e)return this.finished=!0,void console.log("No path from source to dest");e.id===this.targetIndex&&(this.finished=!0),this.processedVerticies.push(e)}},{key:"processAllVerticies",value:function(){for(;!this.isFinished();)this.processNextVertex()}},{key:"isFinished",value:function(){return this.finished}},{key:"getPath",value:function(){var e=[],t=this.processedVerticies.slice().pop();if(void 0===t)return[];if(t.id!==this.targetIndex)return[];for(;null!==t;)e.unshift(t.id),t=t.prev;return e}},{key:"toGrid",value:function(){for(var e=Array(this.size).fill(0),t=0;t<this.wallMask.length;t++)1===this.wallMask[t]&&(e[t]=3);for(var a=0;a<this.processedVerticies.length;a++){e[this.processedVerticies[a].id]=5}var s=this.getPath();if(null!==s)for(var n=0;n<s.length;n++){e[s[n]]=4}return e[this.sourceIndex]=1,e[this.targetIndex]=2,e}},{key:"reset",value:function(){this.unprocessedVertices=this.build(this.wallMask,this.sourceIndex,this.targetIndex,this.algorithm),0!==this.unprocessedVertices.length&&(this.unprocessedVertices[this.sourceIndex].fcost=0),this.processedVerticies=[],this.finished=!1}},{key:"clear",value:function(){this.wallMask=Array(this.size).fill(0),this.reset()}},{key:"changeAlgorithm",value:function(e){this.algorithm=e,this.reset(),this.processAllVerticies()}},{key:"changeEpsilon",value:function(e){this.eplison=e,this.reset(),this.processAllVerticies()}},{key:"resize",value:function(e){var t=this.size;this.size=e;var a=Math.ceil(Math.sqrt(t)),s=Math.ceil(Math.sqrt(e)),n=this.targetIndex,r=Math.floor(n/a),i=n%a,o=r*s+i,l=Math.floor(o/s),h=o%s;this.targetIndex=r>=s&&i>=s?s*s-1:r>=s?(s-1)*s+h:i>=s?(l-1)*s+(s-1):o;var c=this.sourceIndex,u=Math.floor(c/a),d=c%a,m=u*s+d,g=Math.floor(m/s),p=m%s;this.sourceIndex=u>=s&&d>=s?s*s-1:u>=s?(s-1)*s+p:d>=s?(g-1)*s+(s-1):m,this.sourceIndex===this.targetIndex&&(this.sourceIndex-=1);for(var f=Array(e).fill(0),v=0;v<f.length;v++){var x=Math.floor(v/s),E=v%s;E+1>a?f[v]=0:1===this.wallMask[x*a+E]?f[v]=1:f[v]=0}this.wallMask=f,this.reset()}},{key:"changeSourceIndex",value:function(e){this.sourceIndex=e,this.reset(),this.processAllVerticies()}},{key:"changeTargetIndex",value:function(e){this.targetIndex=e,this.reset(),this.processAllVerticies()}},{key:"placeWall",value:function(e){if(e!==this.sourceIndex&&e!==this.targetIndex){var t=this.wallMask.slice();t[e]=1,this.wallMask=t,this.reset(),this.processAllVerticies()}}},{key:"clearWall",value:function(e){if(e!==this.sourceIndex&&e!==this.targetIndex){var t=this.wallMask.slice();t[e]=0,this.wallMask=t,this.reset(),this.processAllVerticies()}}},{key:"isWall",value:function(e){return 1===this.wallMask.slice()[e]}}]),e}(),T=a(128),D=function(e){function t(e){var a;Object(o.a)(this,t),a=Object(h.a)(this,Object(c.a)(t).call(this,e));var s=new A(625,104,286,"dijkstra");return s.processAllVerticies(),a.state={graph:s,sourceIndex:104,targetIndex:286,isSourceMoving:!1,isTargetMoving:!1},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"animateSteps",value:function(e){var t=this;e.processNextVertex(),this.setState(this.state),e.isFinished()||new Promise((function(e){return setTimeout(e,0)})).then((function(){t.animateSteps(e)}))}},{key:"handleMouseDown",value:function(e){var t=this.state.graph.toGrid();1===t[e]?this.setState({graph:this.state.graph,sourceIndex:this.state.sourceIndex,targetIndex:this.state.targetIndex,isSourceMoving:!0,isTargetMoving:this.state.isTargetMoving}):2===t[e]?this.setState({graph:this.state.graph,sourceIndex:this.state.sourceIndex,targetIndex:this.state.targetIndex,isSourceMoving:this.state.isSourceMoving,isTargetMoving:!0}):(this.state.graph.isWall(e)?this.state.graph.clearWall(e):this.state.graph.placeWall(e),this.setState({graph:this.state.graph,sourceIndex:this.state.sourceIndex,targetIndex:this.state.targetIndex,isSourceMoving:this.state.isSourceMoving,isTargetMoving:this.state.isTargetMoving,placementIsWall:this.state.graph.isWall(e)}))}},{key:"handleMouseEnter",value:function(e){this.state.isSourceMoving?this.state.graph.changeSourceIndex(e):this.state.isTargetMoving?this.state.graph.changeTargetIndex(e):!0===this.state.placementIsWall?this.state.graph.placeWall(e):this.state.graph.clearWall(e),this.setState(this.state)}},{key:"handleMouseUp",value:function(e){this.state.isSourceMoving?this.setState({graph:this.state.graph,sourceIndex:this.state.sourceIndex,targetIndex:this.state.targetIndex,isSourceMoving:!1,isTargetMoving:this.state.isTargetMoving}):this.state.isTargetMoving?this.setState({graph:this.state.graph,sourceIndex:this.state.sourceIndex,targetIndex:this.state.targetIndex,isSourceMoving:this.state.isSourceMoving,isTargetMoving:!1}):this.setState(this.state)}},{key:"handleTouchStart",value:function(e){if(this.state.isSourceMoving)this.state.graph.changeSourceIndex(e),this.setState({graph:this.state.graph,sourceIndex:this.state.sourceIndex,targetIndex:this.state.targetIndex,isSourceMoving:!1,isTargetMoving:this.state.isTargetMoving});else if(this.state.isTargetMoving)this.state.graph.changeTargetIndex(e),this.setState({graph:this.state.graph,sourceIndex:this.state.sourceIndex,targetIndex:this.state.targetIndex,isSourceMoving:this.state.isSourceMoving,isTargetMoving:!1});else{var t=this.state.graph.toGrid();1===t[e]?(this.state.graph.changeSourceIndex(-1),this.setState({graph:this.state.graph,sourceIndex:this.state.sourceIndex,targetIndex:this.state.targetIndex,isSourceMoving:!0,isTargetMoving:this.state.isTargetMoving})):2===t[e]?(this.state.graph.changeTargetIndex(-1),this.setState({graph:this.state.graph,sourceIndex:this.state.sourceIndex,targetIndex:this.state.targetIndex,isSourceMoving:this.state.isSourceMoving,isTargetMoving:!0})):(this.state.graph.isWall(e)?this.state.graph.clearWall(e):this.state.graph.placeWall(e),this.setState({graph:this.state.graph,sourceIndex:this.state.sourceIndex,targetIndex:this.state.targetIndex,isSourceMoving:this.state.isSourceMoving,isTargetMoving:this.state.isTargetMoving,placementIsWall:this.state.graph.isWall(e)}))}}},{key:"handleAlgorithmChange",value:function(e){this.state.graph.changeAlgorithm(e),this.setState(this.state)}},{key:"handleEpsilonChange",value:function(e){this.state.graph.changeEpsilon(e),this.setState(this.state)}},{key:"handleRunPressed",value:function(){this.state.graph.reset(),this.animateSteps(this.state.graph)}},{key:"handleResetPressed",value:function(){var e=this.state.graph;e.clear(),e.processAllVerticies(),this.setState(this.state)}},{key:"handleScreenResize",value:function(){var e;console.log(window.innerWidth),e=window.innerWidth>768?25:22;var t=Math.min(Math.round((window.innerWidth-50)/23),e),a=Math.pow(t,2);this.state.graph.resize(a),this.state.graph.processAllVerticies(),this.setState(this.state)}},{key:"componentDidMount",value:function(){this.handleScreenResize(),window.addEventListener("resize",this.handleScreenResize.bind(this))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleScreenResize.bind(this))}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"App"},n.a.createElement(j,null),n.a.createElement(d.b,{className:"mt-3"},n.a.createElement(d.h,null,n.a.createElement(d.a,{className:"order-1 order-lg-1",md:"12",lg:"4"},n.a.createElement(d.h,{className:"mb-4"},n.a.createElement(d.a,null,n.a.createElement(k,{onRunPressed:function(){return e.handleRunPressed()},onResetPressed:function(){return e.handleResetPressed()},onAlgorithmChange:function(t){return e.handleAlgorithmChange(t)},onEpsilonChange:function(t){return e.handleEpsilonChange(t)}})))),n.a.createElement(d.a,{className:"order-2 order-lg-2",md:"12",lg:"8"},n.a.createElement(d.h,null,n.a.createElement(d.a,null,n.a.createElement(T.BrowserView,null,n.a.createElement(g,{squares:this.state.graph.toGrid(),onMouseDown:function(t){return e.handleMouseDown(t)},onMouseEnter:function(t){return e.handleMouseEnter(t)},onMouseUp:function(t){return e.handleMouseUp(t)}})),n.a.createElement(T.MobileView,null,n.a.createElement(g,{squares:this.state.graph.toGrid(),onMouseDown:function(t){return e.handleTouchStart(t)},onMouseEnter:function(e){return console.log()},onMouseUp:function(e){return console.log()}})))),n.a.createElement(d.h,{className:"mt-2"},n.a.createElement(d.a,null,n.a.createElement(y,null)))))),n.a.createElement(d.f,{className:"custom-footer hide-on-md",type:"dark",expand:"md"},n.a.createElement(d.c,{navbar:!0,fill:!0,className:"custom-footer ml-auto mr-auto",type:"dark"},n.a.createElement(d.d,null,n.a.createElement(d.e,{active:!0,href:"#"},n.a.createElement("b",{className:""}," ",n.a.createElement("u",null," Click here for more projects... ")," "))))))}}]),t}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[177,1,2]]]);
//# sourceMappingURL=main.76cefbe9.chunk.js.map