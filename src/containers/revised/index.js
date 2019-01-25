import React, { Component } from 'react';
import Header from './components/Header';
import './index.css'
import Loader from './components/Loader';
import Network from './components/bridge/Network';
import BridgeForm from './components/bridge/BridgeForm';

import { Spring } from 'react-spring'

class BridgeContainer extends Component {
  state = {
    loading: true,
  };
  
  componentDidMount = () => {
    setTimeout(() => { 
      this.displayBridge();
    }, 500);
  }

  displayBridge = () => {
    this.setState({ loading : false });
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Loader isLoading={loading} display={this.displayBridge}/>
        <Network isLoading={loading} />
        <div className="App">
          <header className="App-header">        
            <Header />  
            <BridgeForm />                    
          </header>   
        </div>
      </div>
    );
  }
}


export default BridgeContainer;
