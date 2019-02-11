import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actionTypes'
import { Onboarding, Processing, Results, TxForm } from './components'
import Header from './components/layout/Header'
import * as config from '../../assets/config/constants';
import { updateMetaMask, completeDeposit, completeWithdrawal } from '../store/actionCreator'
import { bindActionCreators } from 'redux';

const ethers = require('ethers')

class App extends Component {
  constructor(props) {
    super(props)
    window.web3.currentProvider.publicConfigStore.on('update', this.props.updateMetaMask);

    this.foreignProvider = new ethers.providers.Web3Provider(window.web3.currentProvider, parseInt(window.ethereum.networkVersion));
    this.homeProvider = new ethers.providers.JsonRpcProvider(config.GOERLI_HTTPS_ENDPOINT, config.GOERLI_CHAIN_ID)


    this.foreignContract = new ethers.Contract(config.DEPOSIT_CONTRACT_ADDRESS_TESTNET, config.DEPOSIT_CONTRACT_ABI, this.foreignProvider)
    this.homeContract = new ethers.Contract(config.WITHDRAW_CONTRACT_ADDRESS_GOERLI, config.WITHDRAW_CONTRACT_ABI_GOERLI, this.homeProvider)

    this.foreignContract.on('Deposit', (_recipient, _value, _toChain) => {
      console.log(`${new Date()} -- Deposit Event :: Recipient: ${_recipient}, Value: ${_value}, ToChain: ${_toChain}`)
      if(_recipient.toLowerCase() === this.props.address.toLowerCase()) {
        this.props.completeDeposit()
      }
    })

    this.homeContract.on('Withdraw', (_recipient, _value, _fromChain, _txHash) => {
      console.log(`${new Date()} -- Withdraw Event :: Recipient: ${_recipient}, Value: ${_value}, FromChain: ${_fromChain}, TxHash: ${_txHash}`)
      if(_recipient.toLowerCase() === this.props.address.toLowerCase()) {
        this.props.completeWithdrawal(_txHash)
      }
    })
  }

  render() {
    if (this.props.metaMaskEnabled) {
      if (!this.props.depositSubmitted) {
        return (
          <div>
            <Header />
            <TxForm/>
          </div>
        )
      } else if (!this.props.withdrawalEventFound || !this.props.depositEventFound) {
        return (
          <div>
            <Header />
            <Processing/>
          </div>
        )
      } else {
        return (
          <div>
            <Header />
            <Results/>
          </div>
        )
      }
    } else {
      return (
        <div>
          <Header />
          <Onboarding/>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    metaMaskEnabled: state.metaMaskEnabled,
    depositSubmitted: state.depositSubmitted,
    withdrawalEventFound: state.withdrawalEventFound,
    depositEventFound: state.depositEventFound,
    address: state.address,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateMetaMask,
  completeDeposit,
  completeWithdrawal,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(App);
