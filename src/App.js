import React, { Component } from 'react';
import './App.css';
import BodyContainer from './containers/BodyContainer.js';
import "typeface-work-sans";

class App extends Component {

  render() {
    return (
      <div className='app'>
        <BodyContainer />
      </div>
    );
  }
}

export default App;