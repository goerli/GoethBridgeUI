import React, { Component } from 'react';
import 'antd/dist/antd.css'
import './App.css';
import { Layout } from 'antd';
import NavigationHeader from '../navigation/Header';
import ContractForm from '../forms/ContractForm';
import TxSummary from './TxSummary';
import Error from './Error';
import getNetwork from '../../../../scripts/network';
import executeDeposit from '../../../../scripts/contract';
import provider from '../../../../scripts/provider';

const Web3 = require('web3');
const ethers = require('ethers');
const { Footer, Content } = Layout;

class App extends Component {
  state= {
    amount: 0,
    network: null,
    dataProcessed: false,
    web3: null,
    error: null,
    provider: null,
  };

  async componentDidMount() {
    const selectedNetwork = await getNetwork();
    const providerObj = await provider();
    this.setState({ network: selectedNetwork, provider: providerObj })
  }

  checkProvider = () => {
    if(window.web3 !== 'undefined') {
      return true;
    }
    return false;    
  }

  processRequest = ({amount, network}) => {
    const { provider } = this.state;
    this.setState({ amount, network, dataProcessed: true }, function () {
      console.log(this.state);
    });
    console.log('get contract');
    executeDeposit(provider, amount, network);
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
