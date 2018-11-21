import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css'
import NavigationHeader from '../layout/Header';
import SiderMenu from '../layout/SiderMenu';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import ContractForm from './components/ContractForm';
import TxSummary from './components/TxSummary';
import ProgressElement from './components/ProgressElement';
import Error from './components/Error';
import getNetwork from '../../scripts/network';
import executeDeposit from '../../scripts/contract';
import provider from '../../scripts/provider';
import instantiateGoerliContract from '../../scripts/goerliContract'; 

const { Content } = Layout;

class BridgePage extends Component {
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
    this.setState({ network: selectedNetwork, provider: providerObj, pubKey }, () => {
      if (selectedNetwork === 'main') {
        alert('Are you sure you want to burn real ether for GOETH? Please change your MetaMask settings!')
      }
    });
  }

  processRequest = async ({amount}) => {
    const { provider, pubKey, network } = this.state;

    if (network !== 'main') {
      this.setState({ amount, dataProcessed: true }, () => {});
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
    } else {
      alert('Are you sure you want to send real eth for GOETH??? Please change your MetaMask settings');
    }
  }

  getEventData = () => {
    const { network, eventRecipient, eventValue, eventToChain, eventEvent, goerliRecipient, goerliValue, goerliFromChain } = this.state;
    return { eventRecipient, eventValue, eventToChain, eventEvent, goerliRecipient, goerliValue, goerliFromChain, network };
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
      <Layout style={layoutStyle}>
      <NavigationHeader />
      <Layout>
        <SiderMenu />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Network</Breadcrumb.Item>
              <Breadcrumb.Item>Bridge</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: '100%' }}>
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
            <div style={{margin: '0 auto' }}>
              <ProgressElement activated={dataProcessed} depositRecieved={depositEventTriggered} withdrawRecieved={withdrawEventTriggered} />           
            </div>
            <div>
              {
                depositEventTriggered && withdrawEventTriggered ? <TxSummary txData={this.getEventData()} /> : null
              }
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    );
  }
}

const layoutStyle = {
  flex: 1, 
  height: '100vh'
};

export default BridgePage;
