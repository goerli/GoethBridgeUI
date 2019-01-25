import React from 'react';
import { connect } from 'react-redux';
class TxDisplay extends React.Component {
  getDepositLink = () => {
    const { network, depositEventData } = this.props;
    const tx = depositEventData.event.transactionHash;
    let url;
    if (network === 'ropsten') {
      url = `https://ropsten.etherscan.io/tx/${tx}`;
    } else if (network === 'kovan') {
      url = `https://kovan.etherscan.io/tx/${tx}`;
    } else if (network === 'rinkeby') {
     url = `https://rinkeby.etherscan.io/tx/${tx}`;
    }  
    return url;
  };

  getWithdrawlLink = () => {
    const { network } = this.props;
  };

  render() {
    const { depositEventData, withdrawlEventData } = this.props;
    const doubleCheck = depositEventData !== null || typeof depositEventData !== 'undefined' 
    && withdrawlEventData !== null || typeof withdrawlEventData !== 'undefined';
    return (
      <div>
        {
           doubleCheck 
           ?
           <div>
               <h3> <b> Deposit TX </b> </h3>
               <p> <a href={this.getDepositLink()} target="_blank" rel="noopener noreferrer" style={link}> TX: { depositEventData.event.transactionHash}  </a>  </p> 
               <br />
               <h3> <b> Withdrawl TX </b> </h3>
               <p> <a href={`https://blockscout.com/eth/goerli/tx/${withdrawlEventData.transactionHash}`} target="_blank" rel="noopener noreferrer" style={link}> { withdrawlEventData.transactionHash} </a> </p>
            </div>
        : null
        }
      </div>
    )
  }
}

const link = {
    color: '#8ad9d1',
    textDecoration: 'none',
};

const mapStateToProps = (state) => {    
  const { depositEventData, withdrawlEventData } = state;
  return { depositEventData, withdrawlEventData, network: state.network.selectedNetwork };
};

export default connect(mapStateToProps, null)(TxDisplay);