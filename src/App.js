import React, { Component } from 'react';
import './App.css';

import SomethingsGrid from './components/SomethingsGrid';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-text">My Somethings</div>
        </header>
        <SomethingsGrid/>
      </div>
    );
  }
}

export default App;
