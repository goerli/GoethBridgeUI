import React from 'react';
import { connect } from 'react-redux';
import './BridgeForm.css'
import { setAppComponentState } from '../../../store/actionCreator';
import executeDeposit from '../../../../scripts/contract';
import instantiateGoerliContract from '../../../../scripts/goerliContract';

class BridgeForm extends React.Component {
  state = {
    amount: '',
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
  };

  depositEvent = (contract, pubKey) => {
    contract.on("Deposit", (_recipient, _value, _toChain, event) => {      
      const eAddress = _recipient.toLowerCase();
      const cAddress = pubKey.toLowerCase();
      if (eAddress === cAddress) {
        console.log({
          _recipient, _value, _toChain, event
        });
      }
    });
  }

  withdrawlEvent = (goerliContract, pubKey) => {
    goerliContract.on("Withdraw", (_recipient, _value, _fromChain, event) => {
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
        console.log({
          _recipient, _value, _fromChain, responseObject,
        });
      }
    });
  }

  render () {
    const { network } = this.props;
    const isMainnet = network === 'main';
    const { amount } = this.state;
    return (
      <div className="inputContainer">
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
  const { selectedNetwork, providerObj, pubKey } = network;
  return { network: selectedNetwork, provider: providerObj, pubKey};
};

export default connect(mapStateToProps, { setAppComponentState })(BridgeForm);
