import React, { Component } from 'react';
import 'antd/dist/antd.css'
import './App.css';
import { Layout } from 'antd';
import NavigationHeader from '../navigation/Header';
import ContractForm from '../forms/ContractForm';
import TxSummary from './TxSummary';
import Error from './Error';
import getNetwork from '../../../../scripts/network';
const Web3 = require('web3');

const { Footer, Content } = Layout;

class App extends Component {
  state= {
    amount: 0,
    network: null,
    dataProcessed: false,
    web3: null,
    error: null,
  };

  async componentDidMount() {

    const selectedNetwork = await getNetwork();
    this.setState({ network: selectedNetwork })

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
          const acc = await window.ethereum.enable();
          console.log(acc)
          const f = await window.web3.eth.currentProvider
          console.log(f)
      } catch (error) {
          console.log("oops we caught an error", error)
      }
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        console.log("Legacy")
        console.log(window.web3.eth.accounts)
    }
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  checkProvider = () => {
    if(window.web3 !== 'undefined') {
      return true;
    }
    return false;    
  }

  processRequest = ({amount, network}) => {
    this.setState({ amount, network, dataProcessed: true }, function () {
      console.log(this.state);
    });
  }

  render() {
    const { dataProcessed, error, network } = this.state;
    return (
      <Layout className="layoutContainer">
        <NavigationHeader />
        <Content>
          {
            error !== null 
            ? <div className="errorContainer"> 
                <Error  errorMessage={error} /> 
              </div> 
            : null
          }
          <div className="formDivContainer">
            <ContractForm activeNetwork={network} extractData={this.processRequest}/>
          </div>
          <div>
            {
              dataProcessed === true ? <TxSummary /> : null
            }
          </div>
        </Content>
        <Footer className="footer"> ChainSafe Systems </Footer>
      </Layout>
    );
  }
}

export default App;
