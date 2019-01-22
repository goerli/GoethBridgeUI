import React, { Component } from 'react';
import Header from './components/Header';
import LinkScroll from './components/LinkScroll';
import './index.css'

class BridgeContainer extends Component {
  render() {
    return (
      <div>
        <LinkScroll />  
        <div className="App">
          <header className="App-header">        
            <Header />
            <p>
              <code>Network</code> ropsten          
            </p>
            <div className="inputContainer">
              <input className="txtAmount" placeholder="Exchange amount" />
              <button style={btnExchange}> Exchange </button>   
            </div>
          </header>   
        </div>
        <LinkScroll />  
      </div>
    );
  }
}

const btnExchange = {
  width: '200px',
  height: '100%',
  padding: '24px',
  fontSize: '20px',
  margin: '0 auto',
  flex: 1,
  backgroundColor: '#3eda2b',
};

export default BridgeContainer;
