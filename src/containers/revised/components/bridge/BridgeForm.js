import React from 'react';
import { connect } from 'react-redux';
import './BridgeForm.css'
import {
  setAppComponentState,
  setDepositEventData,
  setWithdrawlEventData,
} from '../../../store/actionCreator';
import executeDeposit from '../../../../scripts/contract';
import instantiateGoerliContract from '../../../../scripts/goerliContract';
import EventDisplay from './EventDisplay';
import TxDisplay from './TxDisplay';

class BridgeForm extends React.Component {
  state = {
    amount: '',
    component: 0,
    deposit: false,
    withdrawl: false,
  };

  handleChange = (e) => {
    this.setState({ amount: e.target.value})
  };

  executeExchange = async () => {
    const { amount } = this.state; // add validation for number
    const { network, provider, pubKey } = this.props;
    if (network !== 'main') {
      const { txHash, contract } = await executeDeposit(provider, amount, network, pubKey);     
      const goerliContract = await instantiateGoerliContract();
      this.depositEvent(contract, pubKey);
      this.withdrawlEvent(goerliContract, pubKey);
    }
    this.setState({ component: 1 });
  };

  depositEvent = (contract, pubKey) => {
    contract.on("Deposit", (_recipient, _value, _toChain, event) => {      
      const eAddress = _recipient.toLowerCase();
      const cAddress = pubKey.toLowerCase();
      if (eAddress === cAddress) {
        const data = { _recipient, _value, _toChain, event };
        this.processEvents('deposit', data);
      }
    });
  }

  withdrawlEvent = (goerliContract, pubKey) => {
    goerliContract.on("Withdraw", (_recipient, _value, _fromChain, event) => {
      const gAddress = _recipient.toLowerCase();
      const cAddress = pubKey.toLowerCase();
      if (gAddress === cAddress) {
        const { address, blockHash, blockNumber, data, transactionHash } = event;
        const res = { address, blockHash, blockNumber, data, transactionHash, _recipient };
        this.processEvents('withdrawl', res);
      }
    });
  }

  processEvents = async (type, data) => {
    const { deposit, withdrawl } = this.state;
    if (type === 'deposit') {
      await this.props.setDepositEventData(data)
      this.setState({ deposit: true }, () => {
        console.log('depo', { data });
        
        if (withdrawl === true) this.setState({ component: 2 });
      });
    } else {
      await this.props.setWithdrawlEventData(data);
      console.log('with', { data });
      this.setState({ withdrawl: true }, () => {
        if (deposit === true) this.setState({ component: 2 });
      });
     
    }
  }

  render () {
    const { network } = this.props;
    const isMainnet = network === 'main';
    const { amount, component } = this.state;
    return (
      <div >
        {
          component === 0
          ? <div className="inputContainer">
              <input 
                className="txtAmount" 
                placeholder="enter testnet ether amount for goeth exchange" 
                disabled={isMainnet}
                onChange={this.handleChange}
                value={amount}
                />
              <button 
                style={ isMainnet ? btnDisabled : btnEnabled } 
                className="btnExchange"
                disabled={isMainnet}
                onClick={this.executeExchange}
                > 
                  exchange 
              </button> 
            </div>
          : null
        }
        {
          component === 1 
          ? <EventDisplay />
          : null
        }
        {
          component === 2
          ? <TxDisplay />
          : null
        }
      </div>
    )
  }
}

const btnEnabled = {
  backgroundColor: '#82d5ec',
  width: '22vw',
  fontSize: '12px',
  margin: '0 auto',
  alignText: 'center',
  justifyContent: 'center',
  flex: 1,
  borderColor: 'black',
  borderWidth: '2px',
  overflow: 'hidden',
}


const btnDisabled = {
  backgroundColor: '#fca19b',
  width: '22vw',
  fontSize: '12px',
  margin: '0 auto',
  alignText: 'center',
  justifyContent: 'center',
  flex: 1,
  borderColor: 'black',
  borderWidth: '2px',
  overflow: 'hidden',
}

const mapStateToProps = ({ network }) => {
  const { selectedNetwork, providerObj, pubKey, depositEventData, withdrawlEventData } = network;
  return { network: selectedNetwork, provider: providerObj, pubKey, depositEventData, withdrawlEventData};
};

export default connect(mapStateToProps, {
  setAppComponentState,
  setDepositEventData,
  setWithdrawlEventData,
})(BridgeForm);
