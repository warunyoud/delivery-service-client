import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import { TableView, GraphView, FormView } from '../components';
import config from './config';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allGraphs: [],
      currentGraphIndex: 0,
      data: config.map((item) => []),
      graphData: null,
      graphInput: ''
    };

    this.handleSelectGraph = this.handleSelectGraph.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGraphInputChange = this.handleGraphInputChange.bind(this);
    this.setOutput = this.setOutput.bind(this);
  }

  setOutput(inputParams, output) {
    const data = Object.assign([], this.state.data);
    let input;
    switch (this.props.selectedIndex) {
      case 0:
        input = `the delivery cost for route ${inputParams.route}`;
        break;
      case 1:
        input = `The number of possible delivery route from ${inputParams.origin} to ${inputParams.endpoint}`;
        if (inputParams.maxStop) {
          input += ` with a maximum stop of ${inputParams.maxStop}`;
        }
        if (inputParams.maxCost) {
          input += ` that delivery cost is less than ${parseInt(inputParams.maxCost) + 1}`
        }
        input += inputParams.noRepeat ? ' without using the same route twice in a delivery route' :
          '. Given that the same route can be used twice in a delivery route';
        break;
      case 2:
        input = `The cost of cheapest delivery route between ${inputParams.origin} to ${inputParams.endpoint}`;
        break;
      default:
        break;
    }
    data[this.props.selectedIndex].push({ input, output});
    this.setState({ data });
  }

  componentDidMount() {
    this.getAllGraphs(() => this.setGraph(0));
  }

  addNodeToGraph(node, seenNodes) {
    if (!(node in seenNodes)) {
      seenNodes[node] = true;
    }
  }

  setGraph(value) {
    const graphData = {};
    const seenNodes = {};
    graphData.links = [];
    this.state.allGraphs[value].graph.split(',').forEach((edge) => {
      graphData.links.push({ source: edge[0], target: edge[1] });
      this.addNodeToGraph(edge[0], seenNodes);
      this.addNodeToGraph(edge[1], seenNodes);
    });
    graphData.nodes = Object.keys(seenNodes).map((node) => ({ id: node }));
    this.setState({ graphData, currentGraphIndex: value, data: config.map((item) => [])});
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/createNewGraph', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        graph: this.state.graphInput,
      })
    }).then(res => res.json()).then(graphId => {
      if (graphId)
      {
        this.getAllGraphs(() => {
          const index = this.state.allGraphs.findIndex((item) => item._id === graphId);
          this.setGraph(index);
          this.setState({ graphInput: '' });
        });
      } else {
        alert("Invalid Graph!!");
      }
    });
  }

  handleGraphInputChange(event) {
    this.setState({ graphInput: event.target.value });
  }

  handleSelectGraph(event) {
    this.setGraph(event.target.value);
  }

  getAllGraphs(callback) {
    fetch('/api/getAllGraphs').then(res => res.json())
      .then(allGraphs => {
        console.log(allGraphs);
        this.setState({ allGraphs }, () => {
          callback();
        });
      });
  }

  render() {
    const currentConfig = config[this.props.selectedIndex];
    const graphId = this.state.currentGraphIndex in this.state.allGraphs ?
      this.state.allGraphs[this.state.currentGraphIndex]._id : '';
    return (
      <div className='main'>
        <div className='main__graph'>
          <GraphView
            data={ this.state.graphData }
            />
        </div>
        <div className='main__form'>
          <FormView
            title={ currentConfig.title }
            description={ currentConfig.description }
            pullURL={ currentConfig.pullURL }
            dimension={ currentConfig.dimension }
            setOutput={ this.setOutput }
            graphId={ graphId }
            />
        </div>
        <div className='main__graph-select'>
          <h3>Select a Graph</h3>
          <select value={this.state.currentGraphIndex} onChange={this.handleSelectGraph}>
            {
              this.state.allGraphs.map((item, index) =>
                <option value={index}>{item.graph}</option>
              )
            }
          </select>
          <form onSubmit={ this.handleSubmit }>
            <h4>or Create One</h4>
            <input value={ this.state.graphInput } onChange={ this.handleGraphInputChange }/>
            <button>Submit</button>
          </form>
        </div>
        <div className='main__table'>
          <TableView data={this.state.data[this.props.selectedIndex]} />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  selectedIndex: PropTypes.number.isRequired
}

export default Main;
