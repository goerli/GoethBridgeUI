import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import './index.css'
import Network from './components/bridge/Network';
import BridgeForm from './components/bridge/BridgeForm';
import provider from '../../scripts/provider';
import getNetwork from '../../scripts/network';
import { initializeNetwork } from '../store/actionCreator';

class BridgeContainer extends Component {
  state = {
    loading: true,
  };
  
  componentDidMount = async () => {
    try {
      const selectedNetwork = await getNetwork();
      const { providerObj, pubKey } = await provider();   
      this.props.initializeNetwork({ selectedNetwork, providerObj, pubKey });
      setTimeout(() => { 
        this.displayBridge();
      }, 1500);
    } catch (err) {
      console.log(err);      
    }
  }

  displayBridge = () => {
    this.setState({ loading : false });
  }

  render() {
    const { loading } = this.state;
    return (
      <div>       
        <div className="App">
          <header className="App-header">        
            <Header />
            <BridgeForm />           
            <Network isLoading={loading} />                  
          </header>   
        </div>
      </div>
    );
  }
}

export default connect(null, { initializeNetwork })(BridgeContainer);
