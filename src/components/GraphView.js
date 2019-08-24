import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Graph } from 'react-d3-graph';

// graph payload (with minimalist structure)
const data = {
    nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
    links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }]
};

const myConfig = {
  directed: true,
  nodeHighlightBehavior: true,
  node: {
      size: 120,
  },
  link: {
      highlightColor: 'lightblue'
  }
};

class GraphView extends Component {
  render() {
    return (
      <Graph
        id='graph-id'
        data={ this.props.data ? this.props.data : data }
        config={myConfig}
        />
    );
  }
}

GraphView.propTypes = {
  data: PropTypes.object.isRequired
}

export default GraphView;
