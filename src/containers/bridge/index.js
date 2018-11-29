import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css'
import NavigationHeader from '../layout/Header';
import SiderMenu from '../layout/SiderMenu';
import { Layout, Menu, Breadcrumb, Icon, Steps, Button } from 'antd';
import ContractForm from './components/ContractForm';
import TxSummary from './components/TxSummary';
import ProgressElement from './components/ProgressElement';
import Error from './components/Error';
import getNetwork from '../../scripts/network';
import executeDeposit from '../../scripts/contract';
import provider from '../../scripts/provider';
import instantiateGoerliContract from '../../scripts/goerliContract';

const { Content } = Layout;
const Step = Steps.Step;

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
    goerliResponse: null,
    desopsitTxHash: null,
    // goerliBlockHash:
  };

  async componentDidMount() {
    const selectedNetwork = await getNetwork();
    const { providerObj, pubKey } = await provider();
    console.log({pubKey});
    this.setState({ network: selectedNetwork, provider: providerObj, pubKey }, () => {
      if (selectedNetwork === 'main') {
        alert('Are you sure you want to burn real ether for GOETH? Please change your MetaMask settings!')
      }
    });
  }

  reset = () => {
    this.setState({
      amount: 0,
      dataProcessed: false,
      error: null,
      eventRecipient: null,
      eventValue: null,
      eventToChain: null,
      eventEvent: null,
      goerliRecipient: null,
      goerliValue: null,
      goerliResponse: null,
      desopsitTxHash: null,
    })
  }

  processRequest = async ({amount}) => {
    const { provider, pubKey, network } = this.state;
    console.log({provider, pubKey, network});
    
    if (network !== 'main') {
      this.setState({ amount, dataProcessed: true }, () => {});
      const { txHash, contract } = await executeDeposit(provider, amount, network, pubKey);
      this.setState({ desopsitTxHash: txHash });
      const goerliContract = await instantiateGoerliContract();

      contract.on("Deposit", (_recipient, _value, _toChain, event) => {
        console.log('in deposit', {_recipient, _value, _toChain, event});
        const eAddress = _recipient.toLowerCase();
        const cAddress = pubKey.toLowerCase();
        if (eAddress === cAddress) {
          this.setState({
            eventRecipient: _recipient,
            eventValue: _value,
            eventToChain: _toChain,
            eventEvent: event,
          });
        }
      });

	    goerliContract.on("Withdraw", (_recipient, _value, _fromChain, event) => {
        console.log('in withdraw', {_recipient, _value, _fromChain, event});
        const gAddress = _recipient.toLowerCase();
        const cAddress = pubKey.toLowerCase();
        if (gAddress === cAddress) {
          const {
            address, blockHash, blockNumber, data, transactionHash,
           } = event;
          const responseObject = {
            address,
            blockHash,
            blockNumber,
            data,
            transactionHash,
            _recipient,
          };
          this.setState({
            goerliRecipient: _recipient,
            goerliValue: _value,
            goerliFromChain: _fromChain,
            goerliResponse: responseObject,
          });
        }
      });
    } else {
      alert('Are you sure you want to send real eth for GOETH??? Please change your MetaMask settings');
    }
  }

  getEventData = () => {
    const { network, eventRecipient, eventValue, eventToChain, eventEvent, goerliRecipient, goerliValue, goerliFromChain, goerliResponse } = this.state;
    return { eventRecipient, eventValue, eventToChain, eventEvent, goerliRecipient, goerliValue, goerliFromChain, network, goerliResponse };
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
        <Layout style={{ padding: '0 24px 24px', height: '100%' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Network</Breadcrumb.Item>
              <Breadcrumb.Item>Bridge</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: '100%' }}>
            {
              dataProcessed && !eventsDisplayed
              ? <div>
                  <p>Event Data Preview </p>
                  <p>Deposit: TxHash: { this.state.desopsitTxHash === null ? 'waiting for user input' : this.state.desopsitTxHash } </p>
                  <p>Withdraw: TxHash (needs event data...)</p>
                  <p>___ Event In Queue ___</p>
                  <p>
                    { !depositEventTriggered ? "deposit" : null }
                  </p>
                  <p>
                    { !withdrawEventTriggered ? "withdraw" : null }
                  </p>
                  <p>___ Recieved Events ___ </p>
                  <p>
                    { depositEventTriggered ? "deposit" : null}
                  </p>
                  <p>
                    { withdrawEventTriggered ? "withdraw" : null}
                  </p>
                </div>
              : null
            }
            {
              dataProcessed
              ? null
              : <Steps direction="vertical" size="small" current={1} style={{padding: '5%'}}>
                  <Step title="Step 1" description="Select MetaMask Test Network you wish to exchange." />
                  <Step title="Step 2" description="Enter ether amount." />
                  <Step title="Step 3" description="Click send to bridge and wait for events to display to verify." />
                </Steps>
            }
            {
              error !== null
              ? <div className="errorContainer">
                  <Error errorMessage={error} />
                </div>
              : null
            }
            {
              !dataProcessed
              ? <div className="formDivContainer">
                  <ContractForm activeNetwork={network} reset={this.resetData} extractData={this.processRequest} eventsComplete={eventsDisplayed}/>
                </div>
              : null
            }
            <div style={{margin:'0 auto', paddingTop: '2.5%' }}>
              <ProgressElement activated={dataProcessed} depositRecieved={depositEventTriggered} withdrawRecieved={withdrawEventTriggered} />           
            </div>
            <div>
              {
                depositEventTriggered && withdrawEventTriggered ? <TxSummary style={{paddingTop: '0.5%'}} txData={this.getEventData()} /> : null
              }
              {
                dataProcessed && eventsDisplayed
                ?
                  <Button
                  onClick={() => this.reset()} 
                  type="danger">Clear Data
                </Button> 
                : null
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
