import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import './index.css'
import Network from './components/bridge/Network';
import BridgeForm from './components/bridge/BridgeForm';
import { initializeNetwork } from '../store/actionCreator';

const ethers = require('ethers');

class BridgeContainer extends Component {
  state = {
    loading: true,
  };
  
  componentDidMount = async () => {
    try {
      window.addEventListener('load', async () => {
        const { web3 } = window;
        if (typeof web3 !== 'undefined') {
          let pub = await window.ethereum.enable();  
          let providerObj = await new ethers.providers.Web3Provider(window.web3.currentProvider)
          console.log(providerObj);         
          
          this.props.initializeNetwork({ 'selectedNetwork': 'ropsten', providerObj, pubKey: pub[0] });
          this.displayBridge();
          //console.log({ providerObj });     
        } else {
          console.log('No web3? You should consider trying MetaMask!')
          // add fallback
        }
      })
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
