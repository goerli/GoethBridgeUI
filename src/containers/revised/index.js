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
            <p className="netowrkStyles">
              selected network:  <code className="networkName"> ropsten </code>
            </p>
            <div className="inputContainer">
              <input className="txtAmount" placeholder="Ex: 1.5 (amount)" />
              <button style={btnExchange} className="btnExchange"> exchange </button>   
            </div>
          </header>   
        </div>
        <LinkScroll />  
      </div>
    );
  }
}

const btnExchange = {
  width: '20vw',
  fontSize: '20px',
  margin: '0 auto',
  alignText: 'center',
  justifyContent: 'center',
  flex: 1,
  backgroundColor: '#3eda2b',
  borderColor: 'black',
};

export default BridgeContainer;
