import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isValidNetworkID } from './helpers';
import { enableMetaMask } from '../../store/actionCreator';

const style = {
  btnMetaMask: {
    backgroundColor: '#82d5ec',
    width: '22vw',
    fontSize: '12px',
    margin: '0 auto',
    height: '50px',
    alignText: 'center',
    justifyContent: 'center',
    flex: 1,
    borderColor: 'black',
    borderWidth: '2px',
    overflow: 'hidden',
  },
}


class Onboarding extends React.Component {
  enableMetaMask = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('Looks like you need a Dapp browser to get started.')
      } else {
        await window.ethereum.enable()
          .catch((reason) => {
            if (reason === 'User rejected provider access') {
              // The user didn't want to sign in!
            } else {
              //alert('There was an issue signing you in.')
            }
          })
          .then((accounts) => {
            if (window.ethereum.networkVersion === '1') {
              alert('Do you really want to swap mainnet eth for testnet?')
            } else if (!isValidNetworkID(window.ethereum.networkVersion)) {
              alert('Please select either Ropsten, Kovan, or Rinkeby.')
            } else {
              console.log('enabling metamask')
              this.props.enableMetaMask()
            }
          })
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="onboardingContainerStyle">
        <p className="headerTextStyle">
          If you don't have testnet eth you can use a faucet as an alternative.
          The <b> G&ouml;rli Bridge </b> allows developers to exchange Ropsten, Kovan, or Rinkeby test net
          ether for G&ouml;eth. Please click the big blue button to open your MetaMask window.
        </p>
        <p className="headerTextStyle">
          <b> Please select either Ropsten, Rinkeby, or Kovan... :) </b>
        </p>
        <button
          style={ style.btnMetaMask }
          onClick={this.enableMetaMask}
          className="btnMetaMask"
          type="button"
        >
          Enable MetaMask
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  enableMetaMask,
}, dispatch)

export default connect(null, mapDispatchToProps)(Onboarding)
