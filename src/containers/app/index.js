import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/layout/Header';
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
        if (typeof window.ethereum === 'undefined') {
          alert('Looks like you need a Dapp browser to get started.')
        } else {        
          await window.ethereum.enable()
            .catch((reason) => {
              if (reason === 'User rejected provider access') {
              // The user didn't want to sign in!
              } else {        
                alert('There was an issue signing you in.')
              }
            })
            .then((accounts) => {
              let providerObj = new ethers.providers.Web3Provider(window.web3.currentProvider);            
              this.props.initializeNetwork({ 'selectedNetwork': window.ethereum.networkVersion, providerObj, pubKey: accounts[0] });
              this.displayBridge();        
              if (window.ethereum.networkVersion === '1') {
                alert('This application requires the main network, please switch it in your MetaMask UI.')
              } else if (window.ethereum.networkVersion !== '3' && window.ethereum.networkVersion !== '4' && window.ethereum.networkVersion !== '42') {
                alert('Please select either Ropsten, Kovan, or Rinkeby.')
              }
            })    
        }
      })
    } catch (err) {
      console.log(err);      
    }
  }

  displayBridge = () => {
    this.setState({ loading: false });
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
