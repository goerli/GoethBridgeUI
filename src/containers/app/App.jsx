import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css'
import { Onboarding, Processing, Results, TxForm } from './components'
import Header from './components/layout/Header';
import Network from './components/Network';
import * as config from '../../assets/config/constants';
import { updateMetaMask, completeDeposit, completeWithdrawal } from '../store/actionCreator'
import { bindActionCreators } from 'redux';

const ethers = require('ethers')

class App extends Component {
  state = {
    isMobile: window.innerWidth < 500,
  }

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

  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    if (window.innerWidth > 500) {
      this.setState({ isMobile: false });
    } else {
      this.setState({ isMobile: true });
    }
  }

  render() {
    if (this.props.metaMaskEnabled) {
      if (!this.props.depositSubmitted) {
        return (
          <div className="App">
            <div className="App-header">
              <Header />
              <TxForm/>       
              <Network />
            </div>
          </div>
        )
      } else if (!this.props.withdrawalEventFound || !this.props.depositEventFound) {
        return (
          <div className="App">
            <div className="App-header">
              <Header />
              <Processing/>
            </div>
          </div>
        )
      } else {
        return (
          <div className="App">
            <div className="App-header">
              <Header />
              <Results/>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className="App">            
          <div className="App-header">
            {
              this.state.isMobile
                ? <p className="textMobile"> 
                    Screen width under 500px detected. Mobile devices cannot access the bridge.
                    If your are not on a mobile devide please increase the screen width to continue.
                  </p>
                : <div> 
                  <Header />
                  <Onboarding/>
                </div>
            }
          </div>
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
