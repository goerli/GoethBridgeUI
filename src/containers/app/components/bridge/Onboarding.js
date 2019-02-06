import React from 'react';
import './Onboarding.css'

class Onboarding extends React.Component {
  render() {
    return (
      <div className="onboardingContainerStyle"> 
        <p className="headerTextStyle">            
            If you’d like to own some Ethereum but don’t have enough money to purchase any or 
            buy a mining rig, you may be interested in using an <b> Ethereum faucet. </b> The <b> G&ouml;rli Bridge </b> allows developers to exchange Ropsten, Kovan, or Rinkeby test net
            ether for G&ouml;eth. Please click the big blue button to open your MetaMask window.
        </p>     
      </div>
    );
  }
}

export default Onboarding;
