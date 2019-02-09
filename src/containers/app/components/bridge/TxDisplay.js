import React from 'react';
import { connect } from 'react-redux';

class TxDisplay extends React.Component {
  getDepositLink = () => {
    const { network, depositEventData } = this.props;
    const tx = depositEventData.event.transactionHash;
    let url;
    if (network === '3') {
      url = `https://ropsten.etherscan.io/tx/${tx}`;
    } else if (network === '42') {
      url = `https://kovan.etherscan.io/tx/${tx}`;
    } else if (network === '4') {
      url = `https://rinkeby.etherscan.io/tx/${tx}`;
    }  
    return url;
  };

  render() {
    const { depositEventData, withdrawalEventData } = this.props;
    const doubleCheck = (depositEventData !== null || typeof depositEventData !== 'undefined') 
    && (withdrawalEventData !== null || typeof withdrawalEventData !== 'undefined');
    return (
      <div>
        {
          doubleCheck 
            ?
            <div>
              <h3> <b> Deposit TX </b> </h3>
              <p> <a href={this.getDepositLink()} target="_blank" rel="noopener noreferrer" style={link}> TX: { depositEventData.event.transactionHash}  </a>  </p> 
              <br />
              <h3> <b> Withdrawal TX </b> </h3>
              <p> <a href={`https://blockscout.com/eth/goerli/tx/${withdrawalEventData.transactionHash}`} target="_blank" rel="noopener noreferrer" style={link}> { withdrawalEventData.transactionHash} </a> </p>
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
  const { depositEventData, withdrawalEventData } = state;
  return { depositEventData, withdrawalEventData, network: state.network.selectedNetwork };
};

export default connect(mapStateToProps, null)(TxDisplay);
