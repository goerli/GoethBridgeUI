import React from 'react';
import './Onboarding.css'

class Onboarding extends React.Component {
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
      </div>
    );
  }
}

export default Onboarding;
