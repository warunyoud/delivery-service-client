import React, {Component} from 'react';
import './App.css';
import Navbar from './Navbar';
import { Main } from './pages';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.setIndex = this.setIndex.bind(this);
  }
  setIndex(event, selectedIndex) {
    event.preventDefault();
    this.setState({ selectedIndex });
  }
  render() {
    return (
      <div className="App">
        <Navbar setIndex={this.setIndex}/>
        <Main selectedIndex={this.state.selectedIndex}/>
      </div>
    );
  }
}

export default App;
