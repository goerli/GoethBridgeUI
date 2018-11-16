import React, { Component } from 'react';
import 'antd/dist/antd.css'
import './App.css';
import { Layout } from 'antd';
import NavigationHeader from '../navigation/Header';
import ContractForm from '../forms/ContractForm';
import TxSummary from './TxSummary';
import ProgressElement from './ProgressElement';
import Error from './Error';
import getNetwork from '../../../../scripts/network';
import executeDeposit from '../../../../scripts/contract';
import provider from '../../../../scripts/provider';
import instantiateGoerliContract from '../../../../scripts/goerliContract'; 

const { Footer, Content } = Layout;

class App extends Component {
  state= {
    amount: 0,
    network: null,
    dataProcessed: false,
    web3: null,
    error: null,
    provider: null,
    pubKey: null,
    eventRecipient: null,
    eventValue: null,
    eventToChain: null,
    eventEvent: null,
    goerliRecipient: null,
    goerliValue: null,
    goerliFromChain: null,
  };

  async componentDidMount() {
    const selectedNetwork = await getNetwork();
    const { providerObj, pubKey } = await provider();
    this.setState({ network: selectedNetwork, provider: providerObj, pubKey }, ()=> {
      console.log(this.state.network);
    });
  }

  processRequest = async ({amount}) => {
    const { provider, pubKey, network } = this.state;
    this.setState({ amount, dataProcessed: true }, () => {
      console.log({pubKey});
    });
    const contract = await executeDeposit(provider, amount, network, pubKey);
    const goerliContract = await instantiateGoerliContract();
    
    contract.on("Deposit", (_recipient, _value, _toChain, event) => {
      const eAddress = _recipient.toLowerCase();
      const cAddress = pubKey[0].toLowerCase();      
      if (eAddress === cAddress) {
        this.setState({ 
          eventRecipient: _recipient,
          eventValue: _value,
          eventToChain: _toChain,
          eventEvent: event,
        });
      }
    });

    goerliContract.on("Withdraw", (_recipient, _value, _fromChain) => {
      const gAddress = _recipient.toLowerCase();
      const cAddress = pubKey[0].toLowerCase();
      if (gAddress === cAddress) {
        this.setState({ 
          goerliRecipient: _recipient, 
          goerliValue: _value,
          goerliFromChain: _fromChain,
        });
      }
    });
  }

  getEventData = () => {
    const { network, eventRecipient, eventValue, eventToChain, eventEvent, goerliRecipient, goerliValue, goerliFromChain } = this.state;
    const eventObject = { eventRecipient, eventValue, eventToChain, eventEvent, goerliRecipient, goerliValue, goerliFromChain, network };
    return eventObject;
  };

  resetData = () => {
    this.setState({ 
      dataProcessed: false,
      eventRecipient: null, 
      eventValue: null, 
      eventToChain: null, 
      eventEvent: null,
      goerliRecipient: null,
      goerliValue: null,
      goerliFromChain: null,
      amount: 0,
     });
  };

  render() {
    const { dataProcessed, error, network } = this.state;
    const depositEventTriggered = this.state.eventRecipient !== null;
    const withdrawEventTriggered = this.state.goerliRecipient !== null;    
    const eventsDisplayed = depositEventTriggered && withdrawEventTriggered;
    return (
      <Layout className="layoutContainer">
        <NavigationHeader />
        <Content>
          {
            error !== null 
            ? <div className="errorContainer"> 
                <Error errorMessage={error} /> 
              </div> 
            : null
          }
          <div className="formDivContainer">
            <ContractForm activeNetwork={network} reset={this.resetData} extractData={this.processRequest} eventsComplete={eventsDisplayed}/>
          </div>
          <div>
            <ProgressElement activated={dataProcessed} depositRecieved={depositEventTriggered} withdrawRecieved={withdrawEventTriggered} />           
          </div>
          <div>
            {
              depositEventTriggered && withdrawEventTriggered ? <TxSummary txData={this.getEventData()} /> : null
            }
          </div>
        </Content>
        <Footer className="footer"> Goerli </Footer>
      </Layout>
    );
  }
}

export default App;
